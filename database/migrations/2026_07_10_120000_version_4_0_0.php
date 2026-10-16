<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Product Attributes.
 *
 * Adds the attributes system and moves product variants off the measurement + unit pair onto it.
 *
 * Each unit becomes an attribute with the SAME id, so a variant's stock_unit_id keeps resolving
 * against the units table. measurement / stock_unit_id / type stay on product_variants as a
 * compatibility mirror (cart stock math, order history and the reports still read them); they are
 * simply derived from the chosen attribute value on save instead of being typed by the admin.
 *
 * Every step is guarded so this file can be re-run safely.
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 1. Product attributes (e.g. "Size", "Color", "Kilogram")
        //    type controls how EVERY value under this attribute is captured/displayed:
        //    text (plain value + short code), color (a swatch per value), image (a photo per value).
        if (!Schema::hasTable('attributes')) {
            Schema::create('attributes', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('module_id')->default(1)->index();
                $table->string('name');
                $table->string('type')->default('text');
                $table->string('status')->default(1);
                $table->timestamps();
                $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            });
        } else {
            Schema::table('attributes', function (Blueprint $table) {
                if (!Schema::hasColumn('attributes', 'type')) {
                    $table->string('type')->default('text')->after('name');
                }
            });
        }

        if (!Schema::hasTable('attribute_translations')) {
            Schema::create('attribute_translations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('attribute_id')->constrained('attributes')->onDelete('cascade');
                $table->foreignId('language_id')->constrained('languages')->onDelete('cascade');
                $table->string('name')->nullable();
                $table->timestamps();
                $table->unique(['attribute_id', 'language_id'], 'attr_trans_attr_lang_unique');
            });
        }

        // 2. Attribute values (e.g. "S", "M", "L" / "500") - not translatable.
        //    value replaces the variant measurement, short_code replaces the variant unit.
        //    color_code / image are only populated when the parent attribute's type is
        //    'color' / 'image' respectively; both stay null for plain 'text' attributes.
        if (!Schema::hasTable('attribute_values')) {
            Schema::create('attribute_values', function (Blueprint $table) {
                $table->id();
                $table->foreignId('attribute_id')->constrained('attributes')->onDelete('cascade');
                $table->string('value');
                $table->string('short_code')->nullable();
                $table->string('color_code')->nullable();
                $table->string('image')->nullable();
                $table->integer('sequence')->default(0);
                $table->timestamps();
            });
        } else {
            Schema::table('attribute_values', function (Blueprint $table) {
                if (!Schema::hasColumn('attribute_values', 'short_code')) {
                    $table->string('short_code')->nullable()->after('value');
                }
                if (!Schema::hasColumn('attribute_values', 'color_code')) {
                    $table->string('color_code')->nullable()->after('short_code');
                }
                if (!Schema::hasColumn('attribute_values', 'image')) {
                    $table->string('image')->nullable()->after('color_code');
                }
            });
        }

        // 3. Attributes that apply to a category (optional, many-to-many)
        if (!Schema::hasTable('attribute_category')) {
            Schema::create('attribute_category', function (Blueprint $table) {
                $table->id();
                $table->foreignId('attribute_id')->constrained('attributes')->onDelete('cascade');
                $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
                $table->timestamps();
                $table->unique(['attribute_id', 'category_id'], 'attr_category_unique');
            });
        }

        // 4. Link a variant to the attribute value that replaces its measurement + unit.
        //    RESTRICT, never CASCADE: order_items point at product_variants and ProductVariant has
        //    no SoftDeletes, so a cascade would hard-delete rows referenced by order history.
        if (Schema::hasTable('product_variants') && !Schema::hasColumn('product_variants', 'attribute_value_id')) {
            Schema::table('product_variants', function (Blueprint $table) {
                $table->unsignedBigInteger('attribute_value_id')->nullable()->after('product_id')->index();
                $table->foreign('attribute_value_id')->references('id')->on('attribute_values')->onDelete('restrict');
            });
        }

        // 4b. product_id had no index - every join on product_variants.product_id (product
        //     listing, price range, variant lookups) forced a full table scan.
        if (Schema::hasTable('product_variants')) {
            $indexExists = DB::select("SHOW INDEX FROM product_variants WHERE Key_name = 'product_variants_product_id_index'");
            if (empty($indexExists)) {
                Schema::table('product_variants', function (Blueprint $table) {
                    $table->index('product_id', 'product_variants_product_id_index');
                });
            }
        }

        // 5. Extra attribute values beyond a variant's primary one (e.g. Length alongside a
        //    Size-driven variant), for multi-attribute combo variants. Purely descriptive combo
        //    labeling - measurement/stock_unit_id/type are always still derived from the single
        //    primary attribute_value_id above, so cart/order/report math is untouched.
        if (!Schema::hasTable('product_variant_attribute_values')) {
            Schema::create('product_variant_attribute_values', function (Blueprint $table) {
                $table->id();
                $table->foreignId('product_variant_id')->constrained('product_variants')->onDelete('cascade');
                $table->foreignId('attribute_value_id')->constrained('attribute_values')->onDelete('restrict');
                $table->timestamps();
                $table->unique(['product_variant_id', 'attribute_value_id'], 'variant_attr_value_unique');
            });
        }

        // 6. Transfer the existing units into attributes and back-fill the variants.
        $this->migrateUnitsToAttributes();

        // 7. Back-fill product_variant_attribute_values for every variant that already has a
        //    primary attribute_value_id but no pivot row yet (variants saved before this pivot
        //    existed, or saved through a code path that didn't sync it). Keeps attribute_values[]
        //    in the API response always a superset of attribute_value{} without needing every
        //    product to be manually re-saved from the admin panel.
        $this->backfillVariantComboPivot();

        // 8. units is now fully superseded by attributes (step 6 above already mirrored every
        //    unit into an attribute with the SAME id, and step 7 / the backfill in step 6 already
        //    linked every existing variant to its attribute_value). stock_unit_id has no foreign
        //    key constraint to units - it's always been a plain indexed integer column - so
        //    dropping units cannot orphan or cascade-delete any variant, order, or cart row.
        //    unit_translations has a cascading FK to units, so it must go first.
        Schema::dropIfExists('unit_translations');
        Schema::dropIfExists('units');

        // 9. Custom Fields: admin-defined extra registration fields per module (seller / delivery_boy).
        //    Submitted values are stored as JSON directly on the sellers / delivery_boys tables
        //    (keyed by custom_field_id) rather than a separate EAV values table.
        if (!Schema::hasTable('custom_fields')) {
            Schema::create('custom_fields', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('module_id')->default(1);
                $table->string('module');
                $table->string('name');
                $table->string('type');
                $table->json('options')->nullable();
                $table->boolean('is_required')->default(false);
                $table->boolean('status')->default(true);
                $table->integer('sort_order')->default(0);
                $table->timestamps();
                $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            });
        } else {
            Schema::table('custom_fields', function (Blueprint $table) {
                if (!Schema::hasColumn('custom_fields', 'module_id')) {
                    $table->unsignedBigInteger('module_id')->default(1)->after('id');
                    $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
                }
            });
        }

        if (Schema::hasTable('sellers') && !Schema::hasColumn('sellers', 'custom_field_values')) {
            Schema::table('sellers', function (Blueprint $table) {
                $table->json('custom_field_values')->nullable();
            });
        }

        if (Schema::hasTable('delivery_boys') && !Schema::hasColumn('delivery_boys', 'custom_field_values')) {
            Schema::table('delivery_boys', function (Blueprint $table) {
                $table->json('custom_field_values')->nullable();
            });
        }

        // 9b. Custom Fields also extended to the customer (users) and product modules. module stays
        //     a plain string column (no DB enum), so customer/product are just additional values
        //     validated at the controller layer - no schema change needed for custom_fields itself.
        if (Schema::hasTable('users') && !Schema::hasColumn('users', 'custom_field_values')) {
            Schema::table('users', function (Blueprint $table) {
                $table->json('custom_field_values')->nullable();
            });
        }

        if (Schema::hasTable('products') && !Schema::hasColumn('products', 'custom_field_values')) {
            Schema::table('products', function (Blueprint $table) {
                $table->json('custom_field_values')->nullable();
            });
        }

        // 9c. The 8 legacy hardcoded seller fields (tax/PAN/bank/id-proof) become module=seller
        //     custom_fields rows, and every existing seller's column values are copied into
        //     custom_field_values keyed by the new custom_field id. Columns themselves are left
        //     in place (still read/written by SellerApiController) - this only makes the data
        //     available through the generic custom-fields path so the admin/vendor forms can be
        //     switched over without losing existing client data.
        $this->migrateSellerDynamicFieldsToCustomFields();

        // 9d. Same for delivery_boys: driving_license, national_identity_card, bank_name,
        //     bank_account_number, bank_ifsc_code (ifsc_code column), account_name, address and
        //     other_payment_information become module=delivery_boy custom_fields rows. address /
        //     other_payment_information were translatable (delivery_boy_translations); only the
        //     default-language value survives into the single flat custom_field_values JSON, so
        //     any other-language translation rows for those two columns are intentionally dropped
        //     - a deliberate trade-off (no per-language custom field values exist in this system).
        $this->migrateDeliveryBoyDynamicFieldsToCustomFields();

        // 9f. 9c above only ever created module=seller custom_fields with module_id=1 (Grocery)
        //     and wrote every seller's legacy column values - Grocery AND Pharmacy alike - into
        //     custom_field_values keyed by those module_id=1 field ids. Since custom_fields reads
        //     are module-scoped (HasModuleContext), Pharmacy admins never saw the field
        //     definitions, so Pharmacy sellers' data was invisible even though it was preserved in
        //     the JSON. This mirrors the same field definitions under module_id=2 and copies each
        //     Pharmacy seller's values from the module_id=1 keys to the new module_id=2 keys.
        $this->migratePharmacySellerCustomFields();

        // 9e. Fallback for environments where 9d already ran (successfully or not) on an earlier
        //     pass and the legacy delivery_boys columns it reads from (driving_license, address,
        //     bank_name, etc) are already gone - 9d's hasColumn() checks then all fail and it
        //     silently creates nothing. This restores the field *definitions* only; if the legacy
        //     columns were already dropped before their values were ever copied into
        //     custom_field_values (e.g. custom_fields.id was missing AUTO_INCREMENT during the
        //     original run, so 9d's insertGetId calls failed, but a later run still dropped the
        //     columns in step 15), any existing delivery boy's old values are unrecoverable - this
        //     only prevents new/edited delivery boys from being blocked by a missing definition.
        if (Schema::hasTable('custom_fields')) {
            $fallbackDeliveryBoyFields = [
                ['name' => 'Driving License', 'type' => 'file', 'sort_order' => 0],
                ['name' => 'National ID Card', 'type' => 'file', 'sort_order' => 1],
                ['name' => 'Bank Name', 'type' => 'text', 'sort_order' => 2],
                ['name' => 'Bank A/C No.', 'type' => 'text', 'sort_order' => 3],
                ['name' => 'Bank IFSC Code', 'type' => 'text', 'sort_order' => 4],
                ['name' => 'A/C Name', 'type' => 'text', 'sort_order' => 5],
                ['name' => 'Address', 'type' => 'textarea', 'sort_order' => 6],
                ['name' => 'Other Payment Info', 'type' => 'textarea', 'sort_order' => 7],
            ];
            foreach ($fallbackDeliveryBoyFields as $field) {
                $exists = DB::table('custom_fields')
                    ->where('module', 'delivery_boy')
                    ->where('name', $field['name'])
                    ->exists();
                if (!$exists) {
                    DB::table('custom_fields')->insert([
                        'module_id' => 1,
                        'module' => 'delivery_boy',
                        'name' => $field['name'],
                        'type' => $field['type'],
                        'options' => null,
                        'is_required' => 0,
                        'status' => 1,
                        'sort_order' => $field['sort_order'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        // 10. Custom field translations: label (name) and dropdown options per language,
        //     following the same pattern as attribute_translations. Base custom_fields.name /
        //     options columns stay the default-language source of truth (and the fallback when
        //     a translation row is missing/empty), same as Attribute vs AttributeTranslation.
        if (!Schema::hasTable('custom_field_translations')) {
            Schema::create('custom_field_translations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('custom_field_id')->constrained('custom_fields')->onDelete('cascade');
                $table->foreignId('language_id')->constrained('languages')->onDelete('cascade');
                $table->string('name')->nullable();
                $table->json('options')->nullable();
                $table->timestamps();
                $table->unique(['custom_field_id', 'language_id'], 'custom_field_trans_field_lang_unique');
            });
        }

        // 11. Ecommerce module (mirrors Grocery/Pharmacy insert pattern from version_3_0_3).
        $existsEcommerce = DB::table('modules')->where('id', 3)->exists();
        if (!$existsEcommerce) {
            DB::table('modules')->insert([
                'id' => 3,
                'name' => 'Ecommerce',
                'slug' => 'ecommerce',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 12. Snapshot each product's return/cancel policy onto the order item at order-place
        //     time. Every read path today (OrderApiController, ReturnRequestsApiController,
        //     CommonHelper::isOrderItemCancelled) joins the LIVE products table, so editing a
        //     product's policy retroactively changes eligibility for orders placed under the
        //     old policy. These columns are nullable: existing rows stay null and callers fall
        //     back to the live products join for them; only newly placed orders get a snapshot.
        if (Schema::hasTable('order_items') && !Schema::hasColumn('order_items', 'return_status')) {
            Schema::table('order_items', function (Blueprint $table) {
                $table->tinyInteger('return_status')->nullable()->after('active_status');
                $table->integer('return_days')->nullable()->after('return_status');
                $table->tinyInteger('cancelable_status')->nullable()->after('return_days');
                $table->string('till_status')->nullable()->after('cancelable_status');
            });
        }

        // 12b. order_items never had its own product_id column - every read (admin order view,
        //      self pickup order view, invoice) displays item.product_id straight from this row,
        //      but it was always null because nothing ever wrote it. Add the column and backfill
        //      existing rows via product_variants (order_items.product_variant_id -> product_id).
        if (Schema::hasTable('order_items') && !Schema::hasColumn('order_items', 'product_id')) {
            Schema::table('order_items', function (Blueprint $table) {
                $table->unsignedBigInteger('product_id')->nullable()->after('product_variant_id');
            });

            DB::statement(
                'UPDATE order_items oi
                 JOIN product_variants pv ON pv.id = oi.product_variant_id
                 SET oi.product_id = pv.product_id
                 WHERE oi.product_id IS NULL'
            );
        }

        // 13. Drop unused countries. Every client/install seeds or adds its own set of countries and
        //     only ever references one via products.made_in (Product::made_in belongsTo Country) -
        //     there's no other FK into countries.id (users.country_code, pickup_locations.country and
        //     user_addresses.country are all free-text, not FKs). So "unused" is computed per-install
        //     from the live made_in values instead of hardcoding any country id/name.
        //     country_translations cascades on delete, so it's cleaned up automatically.
        $this->deleteUnusedCountries();

        // 14. The 8 legacy seller columns are now fully superseded by module=seller custom_fields
        //     (step 9c above already copied every existing seller's value into custom_field_values,
        //     and Seller::getTaxNameAttribute/getTaxNumberAttribute/getPanNumberAttribute/
        //     getNationalIdentityCardUrlAttribute/getAddressProofUrlAttribute now read from there),
        //     so the raw columns can be dropped without losing data or breaking any reader.
        if (Schema::hasTable('sellers')) {
            Schema::table('sellers', function (Blueprint $table) {
                foreach (['tax_name', 'tax_number', 'pan_number', 'national_identity_card', 'address_proof', 'bank_name', 'account_number', 'bank_ifsc_code', 'account_name'] as $column) {
                    if (Schema::hasColumn('sellers', $column)) {
                        $table->dropColumn($column);
                    }
                }
            });
        }

        // 15. Same drop for delivery_boys, now superseded by module=delivery_boy custom_fields
        //     (step 9d above). address/other_payment_information stop being real columns, so also
        //     drop them from delivery_boy_translations - DeliveryBoy::$translatable no longer
        //     lists them (see app/Models/DeliveryBoy.php), only 'name' stays translatable there.
        if (Schema::hasTable('delivery_boys')) {
            Schema::table('delivery_boys', function (Blueprint $table) {
                foreach (['driving_license', 'national_identity_card', 'bank_name', 'bank_account_number', 'ifsc_code', 'account_name', 'address', 'other_payment_information'] as $column) {
                    if (Schema::hasColumn('delivery_boys', $column)) {
                        $table->dropColumn($column);
                    }
                }
            });
        }

        if (Schema::hasTable('delivery_boy_translations')) {
            Schema::table('delivery_boy_translations', function (Blueprint $table) {
                foreach (['address', 'other_payment_information'] as $column) {
                    if (Schema::hasColumn('delivery_boy_translations', $column)) {
                        $table->dropColumn($column);
                    }
                }
            });
        }
    }

    private function deleteUnusedCountries(): void
    {
        if (!Schema::hasTable('countries') || !Schema::hasTable('products')) {
            return;
        }

        $usedCountryIds = DB::table('products')
            ->whereNotNull('made_in')
            ->where('made_in', '!=', '')
            ->pluck('made_in')
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->filter()
            ->values()
            ->all();

        DB::table('countries')->whereNotIn('id', $usedCountryIds)->delete();
    }

    private function backfillVariantComboPivot(): void
    {
        if (!Schema::hasTable('product_variants') || !Schema::hasTable('product_variant_attribute_values')) {
            return;
        }

        $now = now();

        $variants = DB::table('product_variants')
            ->select('id', 'attribute_value_id')
            ->whereNotNull('attribute_value_id')
            ->get();

        foreach ($variants->chunk(500) as $chunk) {
            $rows = $chunk->map(fn ($variant) => [
                'product_variant_id' => $variant->id,
                'attribute_value_id' => $variant->attribute_value_id,
                'created_at' => $now,
                'updated_at' => $now,
            ])->all();

            if (!empty($rows)) {
                DB::table('product_variant_attribute_values')->insertOrIgnore($rows);
            }
        }
    }

    /**
     * Transfer the existing units into the attributes table preserving their ids, and point every
     * existing product variant at the attribute value matching its measurement + unit.
     */
    private function migrateUnitsToAttributes(): void
    {
        if (!Schema::hasTable('units') || !Schema::hasTable('attributes')) {
            return;
        }

        $units = DB::table('units')->orderBy('id')->get();
        if ($units->isEmpty()) {
            return;
        }

        $unitIds = $units->pluck('id')->all();
        $now = now();

        // Skip the transfer if the units already have their matching attribute rows.
        $alreadyTransferred = DB::table('attributes')->whereIn('id', $unitIds)->count() === count($unitIds);

        if (!$alreadyTransferred) {
            // Free the unit ids: drop any attribute currently occupying one of them.
            // (attribute_translations, attribute_values and attribute_category all cascade.)
            DB::table('attributes')->whereIn('id', $unitIds)->delete();

            $defaultLanguageId = DB::table('languages')->where('is_default', 1)->value('id');

            foreach ($units as $unit) {
                DB::table('attributes')->insert([
                    'id' => $unit->id,
                    'module_id' => 1,
                    'name' => $unit->name,
                    'status' => 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);

                if ($defaultLanguageId) {
                    DB::table('attribute_translations')->insert([
                        'attribute_id' => $unit->id,
                        'language_id' => $defaultLanguageId,
                        'name' => $unit->name,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            }

            // A new attribute must never be given an id that belongs to a unit.
            DB::statement('ALTER TABLE attributes AUTO_INCREMENT = ' . (max($unitIds) + 1));
        }

        // Every distinct (measurement, unit) pair in use becomes an attribute value.
        $pairs = DB::table('product_variants')
            ->select('measurement', 'stock_unit_id')
            ->whereIn('stock_unit_id', $unitIds)
            ->groupBy('measurement', 'stock_unit_id')
            ->orderBy('stock_unit_id')
            ->orderBy('measurement')
            ->get();

        $shortCodes = $units->pluck('short_code', 'id');
        $sequence = [];

        foreach ($pairs as $pair) {
            $attributeId = $pair->stock_unit_id;
            $value = $this->formatMeasurement($pair->measurement);
            $sequence[$attributeId] = ($sequence[$attributeId] ?? -1) + 1;

            $exists = DB::table('attribute_values')
                ->where('attribute_id', $attributeId)
                ->where('value', $value)
                ->exists();

            if ($exists) {
                continue;
            }

            DB::table('attribute_values')->insert([
                'attribute_id' => $attributeId,
                'value' => $value,
                'short_code' => $shortCodes[$attributeId] ?? null,
                'sequence' => $sequence[$attributeId],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Point every existing variant at its attribute value.
        $values = DB::table('attribute_values')->whereIn('attribute_id', $unitIds)->get();

        foreach ($values as $value) {
            DB::table('product_variants')
                ->whereNull('attribute_value_id')
                ->where('stock_unit_id', $value->attribute_id)
                ->whereRaw('CAST(measurement AS DECIMAL(20,4)) = CAST(? AS DECIMAL(20,4))', [$value->value])
                ->update(['attribute_value_id' => $value->id]);
        }
    }

    /**
     * Seed the legacy hardcoded seller fields as module=seller custom_fields rows (name-matched,
     * so a re-run never duplicates them), then back-fill every existing seller's column values
     * into custom_field_values keyed by the resolved custom_field id, skipping any key already
     * present (never overwrites a value a client may have already saved through custom fields).
     */
    private function migrateSellerDynamicFieldsToCustomFields(): void
    {
        if (!Schema::hasTable('custom_fields') || !Schema::hasTable('sellers') || !Schema::hasColumn('sellers', 'custom_field_values')) {
            return;
        }

        $now = now();
        $fields = [
            ['name' => 'Tax Name', 'type' => 'text', 'column' => 'tax_name'],
            ['name' => 'Tax Number', 'type' => 'text', 'column' => 'tax_number'],
            ['name' => 'PAN Number', 'type' => 'text', 'column' => 'pan_number'],
            ['name' => 'NID (National ID)', 'type' => 'file', 'column' => 'national_identity_card'],
            ['name' => 'Address Proof', 'type' => 'file', 'column' => 'address_proof'],
            ['name' => 'Bank Name', 'type' => 'text', 'column' => 'bank_name'],
            ['name' => 'Bank A/C No.', 'type' => 'text', 'column' => 'account_number'],
            ['name' => 'Bank IFSC', 'type' => 'text', 'column' => 'bank_ifsc_code'],
            ['name' => 'A/C Name', 'type' => 'text', 'column' => 'account_name'],
        ];

        $sortOrder = 0;
        $customFieldIdByColumn = [];

        foreach ($fields as $field) {
            if (!Schema::hasColumn('sellers', $field['column'])) {
                continue;
            }

            $customFieldId = DB::table('custom_fields')
                ->where('module', 'seller')
                ->where('name', $field['name'])
                ->value('id');

            if (!$customFieldId) {
                $customFieldId = DB::table('custom_fields')->insertGetId([
                    'module_id' => 1,
                    'module' => 'seller',
                    'name' => $field['name'],
                    'type' => $field['type'],
                    'options' => null,
                    'is_required' => false,
                    'status' => true,
                    'sort_order' => $sortOrder,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }

            $customFieldIdByColumn[$field['column']] = $customFieldId;
            $sortOrder++;
        }

        if (empty($customFieldIdByColumn)) {
            return;
        }

        $sellers = DB::table('sellers')
            ->select(array_merge(['id', 'custom_field_values'], array_keys($customFieldIdByColumn)))
            ->get();

        foreach ($sellers as $seller) {
            $values = json_decode($seller->custom_field_values ?? '', true) ?: [];
            $changed = false;

            foreach ($customFieldIdByColumn as $column => $customFieldId) {
                $key = (string) $customFieldId;
                if (array_key_exists($key, $values)) {
                    continue;
                }

                $columnValue = $seller->$column ?? null;
                if ($columnValue === null || $columnValue === '') {
                    continue;
                }

                $values[$key] = $columnValue;
                $changed = true;
            }

            if ($changed) {
                DB::table('sellers')->where('id', $seller->id)->update([
                    'custom_field_values' => json_encode($values),
                ]);
            }
        }
    }

    /**
     * Mirrors module=seller custom_fields under module_id=2 (Pharmacy) and remaps every
     * Pharmacy seller's values from the module_id=1 (Grocery) field ids that
     * migrateSellerDynamicFieldsToCustomFields() wrote them under to the new module_id=2 field
     * ids, so they become visible under the Pharmacy module's Custom Fields screen.
     */
    private function migratePharmacySellerCustomFields(): void
    {
        if (!Schema::hasTable('custom_fields') || !Schema::hasTable('sellers') || !Schema::hasColumn('sellers', 'custom_field_values') || !Schema::hasColumn('sellers', 'module_id')) {
            return;
        }

        $groceryFields = DB::table('custom_fields')
            ->where('module', 'seller')
            ->where('module_id', 1)
            ->get(['id', 'name', 'type', 'is_required', 'status', 'sort_order']);

        if ($groceryFields->isEmpty()) {
            return;
        }

        $now = now();
        $pharmacyFieldIdByGroceryFieldId = [];

        foreach ($groceryFields as $field) {
            $pharmacyFieldId = DB::table('custom_fields')
                ->where('module', 'seller')
                ->where('module_id', 2)
                ->where('name', $field->name)
                ->value('id');

            if (!$pharmacyFieldId) {
                $pharmacyFieldId = DB::table('custom_fields')->insertGetId([
                    'module_id' => 2,
                    'module' => 'seller',
                    'name' => $field->name,
                    'type' => $field->type,
                    'options' => null,
                    'is_required' => $field->is_required,
                    'status' => $field->status,
                    'sort_order' => $field->sort_order,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }

            $pharmacyFieldIdByGroceryFieldId[(string) $field->id] = (string) $pharmacyFieldId;
        }

        $pharmacySellers = DB::table('sellers')
            ->where('module_id', 2)
            ->whereNotNull('custom_field_values')
            ->get(['id', 'custom_field_values']);

        foreach ($pharmacySellers as $seller) {
            $values = json_decode($seller->custom_field_values ?? '', true) ?: [];
            $changed = false;

            foreach ($pharmacyFieldIdByGroceryFieldId as $groceryKey => $pharmacyKey) {
                if (!array_key_exists($groceryKey, $values) || array_key_exists($pharmacyKey, $values)) {
                    continue;
                }

                $values[$pharmacyKey] = $values[$groceryKey];
                $changed = true;
            }

            if ($changed) {
                DB::table('sellers')->where('id', $seller->id)->update([
                    'custom_field_values' => json_encode($values),
                ]);
            }
        }
    }

    /**
     * Same as migrateSellerDynamicFieldsToCustomFields() above, for delivery_boys. address and
     * other_payment_information were translatable (delivery_boy_translations); only the base
     * (default-language) column value is copied in - per-language values are not preserved.
     */
    private function migrateDeliveryBoyDynamicFieldsToCustomFields(): void
    {
        if (!Schema::hasTable('custom_fields') || !Schema::hasTable('delivery_boys') || !Schema::hasColumn('delivery_boys', 'custom_field_values')) {
            return;
        }

        $now = now();
        $fields = [
            ['name' => 'Driving License', 'type' => 'file', 'column' => 'driving_license'],
            ['name' => 'National ID Card', 'type' => 'file', 'column' => 'national_identity_card'],
            ['name' => 'Bank Name', 'type' => 'text', 'column' => 'bank_name'],
            ['name' => 'Bank A/C No.', 'type' => 'text', 'column' => 'bank_account_number'],
            ['name' => 'Bank IFSC Code', 'type' => 'text', 'column' => 'ifsc_code'],
            ['name' => 'A/C Name', 'type' => 'text', 'column' => 'account_name'],
            ['name' => 'Address', 'type' => 'textarea', 'column' => 'address'],
            ['name' => 'Other Payment Info', 'type' => 'textarea', 'column' => 'other_payment_information'],
        ];

        $sortOrder = 0;
        $customFieldIdByColumn = [];

        foreach ($fields as $field) {
            if (!Schema::hasColumn('delivery_boys', $field['column'])) {
                continue;
            }

            $customFieldId = DB::table('custom_fields')
                ->where('module', 'delivery_boy')
                ->where('name', $field['name'])
                ->value('id');

            if (!$customFieldId) {
                $customFieldId = DB::table('custom_fields')->insertGetId([
                    'module_id' => 1,
                    'module' => 'delivery_boy',
                    'name' => $field['name'],
                    'type' => $field['type'],
                    'options' => null,
                    'is_required' => false,
                    'status' => true,
                    'sort_order' => $sortOrder,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }

            $customFieldIdByColumn[$field['column']] = $customFieldId;
            $sortOrder++;
        }

        if (empty($customFieldIdByColumn)) {
            return;
        }

        $deliveryBoys = DB::table('delivery_boys')
            ->select(array_merge(['id', 'custom_field_values'], array_keys($customFieldIdByColumn)))
            ->get();

        foreach ($deliveryBoys as $deliveryBoy) {
            $values = json_decode($deliveryBoy->custom_field_values ?? '', true) ?: [];
            $changed = false;

            foreach ($customFieldIdByColumn as $column => $customFieldId) {
                $key = (string) $customFieldId;
                if (array_key_exists($key, $values)) {
                    continue;
                }

                $columnValue = $deliveryBoy->$column ?? null;
                if ($columnValue === null || $columnValue === '') {
                    continue;
                }

                $values[$key] = $columnValue;
                $changed = true;
            }

            if ($changed) {
                DB::table('delivery_boys')->where('id', $deliveryBoy->id)->update([
                    'custom_field_values' => json_encode($values),
                ]);
            }
        }
    }

    /**
     * measurement is a float, an attribute value is a string: 1.0 -> "1", 0.5 -> "0.5".
     */
    private function formatMeasurement($measurement): string
    {
        $formatted = rtrim(rtrim(sprintf('%.4F', (float) $measurement), '0'), '.');

        return $formatted === '' ? '0' : $formatted;
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Step 13 (deleteUnusedCountries) is not reversible - deleted country rows are gone.

        // Step 14: restore the columns (structure only - values stay in custom_field_values,
        // they are not copied back).
        if (Schema::hasTable('sellers') && !Schema::hasColumn('sellers', 'tax_name')) {
            Schema::table('sellers', function (Blueprint $table) {
                $table->text('tax_name')->nullable();
                $table->text('tax_number')->nullable();
                $table->text('pan_number')->nullable();
                $table->text('national_identity_card')->nullable();
                $table->text('address_proof')->nullable();
                $table->text('bank_name')->nullable();
                $table->text('account_number')->nullable();
                $table->text('bank_ifsc_code')->nullable();
                $table->text('account_name')->nullable();
            });
        }

        // Step 15: same restore for delivery_boys (+ delivery_boy_translations columns).
        if (Schema::hasTable('delivery_boys') && !Schema::hasColumn('delivery_boys', 'driving_license')) {
            Schema::table('delivery_boys', function (Blueprint $table) {
                $table->text('driving_license')->nullable();
                $table->text('national_identity_card')->nullable();
                $table->text('bank_account_number')->nullable();
                $table->text('bank_name')->nullable();
                $table->text('account_name')->nullable();
                $table->text('ifsc_code')->nullable();
                $table->text('other_payment_information')->nullable();
                $table->text('address')->nullable();
            });
        }

        if (Schema::hasTable('delivery_boy_translations') && !Schema::hasColumn('delivery_boy_translations', 'address')) {
            Schema::table('delivery_boy_translations', function (Blueprint $table) {
                $table->text('address')->nullable();
                $table->text('other_payment_information')->nullable();
            });
        }

        if (Schema::hasTable('order_items') && Schema::hasColumn('order_items', 'return_status')) {
            Schema::table('order_items', function (Blueprint $table) {
                $table->dropColumn(['return_status', 'return_days', 'cancelable_status', 'till_status']);
            });
        }

        DB::table('modules')->where('id', 3)->delete();

        if (Schema::hasTable('sellers') && Schema::hasColumn('sellers', 'custom_field_values')) {
            Schema::table('sellers', function (Blueprint $table) {
                $table->dropColumn('custom_field_values');
            });
        }

        if (Schema::hasTable('delivery_boys') && Schema::hasColumn('delivery_boys', 'custom_field_values')) {
            Schema::table('delivery_boys', function (Blueprint $table) {
                $table->dropColumn('custom_field_values');
            });
        }

        if (Schema::hasTable('users') && Schema::hasColumn('users', 'custom_field_values')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('custom_field_values');
            });
        }

        if (Schema::hasTable('products') && Schema::hasColumn('products', 'custom_field_values')) {
            Schema::table('products', function (Blueprint $table) {
                $table->dropColumn('custom_field_values');
            });
        }

        Schema::dropIfExists('custom_field_translations');
        Schema::dropIfExists('custom_fields');

        if (Schema::hasTable('product_variants') && Schema::hasColumn('product_variants', 'attribute_value_id')) {
            Schema::table('product_variants', function (Blueprint $table) {
                $table->dropForeign(['attribute_value_id']);
                $table->dropColumn('attribute_value_id');
            });
        }

        Schema::dropIfExists('product_variant_attribute_values');
        Schema::dropIfExists('attribute_category');
        Schema::dropIfExists('attribute_values');
        Schema::dropIfExists('attribute_translations');
        Schema::dropIfExists('attributes');
    }
};
