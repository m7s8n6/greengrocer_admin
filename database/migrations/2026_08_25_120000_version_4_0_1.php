<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Moves the Add/Edit Product "Product Type" (indicator) and "FSSAI Lic. No." (fssai_lic_no)
 * fields off their own products columns and onto the generic module=product Custom Fields
 * system (same mechanism version_4_0_0 used for the legacy seller/delivery_boy fields).
 *
 * "Product Type" is only seeded for modules other than Pharmacy (module_id 2), mirroring the
 * old forced-0-for-Pharmacy behaviour: with no CustomField row to write to, Product's indicator
 * accessor always resolves to 0 there. "FSSAI Lic. No." is seeded for every module.
 *
 * Every existing product's indicator/fssai_lic_no value is copied into custom_field_values
 * (keyed by the new custom_field id) before the columns are dropped, so no data is lost.
 *
 * Also adds the Food Delivery module row (mirrors the Grocery/Pharmacy/Ecommerce insert
 * pattern from version_3_0_3/version_4_0_0) - module registration only, no cart/addon behaviour.
 *
 * Every step is guarded so this file can be re-run safely.
 */
return new class extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('products') || !Schema::hasTable('custom_fields') || !Schema::hasTable('modules')) {
            return;
        }

        $this->seedProductCustomFields();

        // 2. Copy every existing product's indicator/fssai_lic_no into custom_field_values.
        $this->migrateProductLegacyFieldsToCustomFields();

        // 4. Food Delivery module (mirrors Grocery/Pharmacy/Ecommerce insert pattern from
        //    version_3_0_3/version_4_0_0). Only registers the module row itself - cart/addon
        //    behaviour for it is handled separately.
        $existsFoodDelivery = DB::table('modules')->where('id', 4)->exists();
        if (!$existsFoodDelivery) {
            DB::table('modules')->insert([
                'id' => 4,
                'name' => 'Food Delivery',
                'slug' => 'food_delivery',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 3. Columns are now fully superseded by module=product custom_fields (step 2 above
        //    already copied every existing product's value into custom_field_values, and
        //    Product::getIndicatorAttribute/getFssaiLicNoAttribute now read from there), so the
        //    raw columns can be dropped without losing data or breaking any reader.
        Schema::table('products', function (Blueprint $table) {
            if (Schema::hasColumn('products', 'indicator')) {
                $table->dropColumn('indicator');
            }
            if (Schema::hasColumn('products', 'fssai_lic_no')) {
                $table->dropColumn('fssai_lic_no');
            }
        });

        // 5. Addon system (Phase 1 - schema + permission only, no cart/order wiring yet).
        //    Customization options like "Extra Cheese"/"Spice Level" for Food Delivery module
        //    products. addon_groups.seller_id nullable: NULL = admin-created and global
        //    (every seller can use it), set = private to that seller - lets sellers manage
        //    their own addons instead of funnelling every request through admin.
        $this->createAddonTables();

        // 6. Addon system (Phase 2 - cart wiring). A cart row now optionally carries which
        //    addon options were picked (selected_addon_ids, JSON array of addon_options.id) and
        //    their combined per-unit price (addon_price). Both nullable/default-0 so every
        //    existing cart row and every read path that doesn't know about addons is unaffected.
        if (Schema::hasTable('carts')) {
            Schema::table('carts', function (Blueprint $table) {
                if (!Schema::hasColumn('carts', 'selected_addon_ids')) {
                    $table->json('selected_addon_ids')->nullable()->after('product_variant_id');
                }
                if (!Schema::hasColumn('carts', 'addon_price')) {
                    $table->decimal('addon_price', 10, 2)->default(0)->after('selected_addon_ids');
                }
            });
        }

        // 7. Addon system (Phase 4 - POS wiring). Mirrors the carts.selected_addon_ids/addon_price
        //    columns from step 6, but for POS order line items (pos_order_items) since POS keeps
        //    its own separate cart/order tables rather than reusing the customer carts table.
        if (Schema::hasTable('pos_order_items')) {
            Schema::table('pos_order_items', function (Blueprint $table) {
                if (!Schema::hasColumn('pos_order_items', 'selected_addon_ids')) {
                    $table->json('selected_addon_ids')->nullable()->after('product_variant_id');
                }
                if (!Schema::hasColumn('pos_order_items', 'addon_price')) {
                    $table->decimal('addon_price', 10, 2)->default(0)->after('selected_addon_ids');
                }
            });
        }

        // 7b. Addon system (Phase 5 - order wiring). Same selected_addon_ids/addon_price columns
        //     as carts/pos_order_items above, but on order_items - without these, an order placed
        //     from a cart line with add-ons silently lost that selection at checkout.
        if (Schema::hasTable('order_items')) {
            Schema::table('order_items', function (Blueprint $table) {
                if (!Schema::hasColumn('order_items', 'selected_addon_ids')) {
                    $table->json('selected_addon_ids')->nullable()->after('product_variant_id');
                }
                if (!Schema::hasColumn('order_items', 'addon_price')) {
                    $table->decimal('addon_price', 10, 2)->default(0)->after('selected_addon_ids');
                }
                // Snapshots the product/variant image path at order time, same as product_name/
                // variant_name already do - without it, deleting the variant later (its image
                // only ever lived behind a live join) left the order history with no image at all.
                if (!Schema::hasColumn('order_items', 'image')) {
                    $table->string('image')->nullable()->after('variant_name');
                }
            });
        }

        // 7c. Addon system (Phase 6 - translations). addon_groups.name / addon_options.name were
        //     plain single-language columns - adds addon_group_translations /
        //     addon_option_translations, same shape as attribute_translations, so addon names
        //     support per-language content like every other translatable entity.
        if (Schema::hasTable('addon_groups') && !Schema::hasTable('addon_group_translations')) {
            Schema::create('addon_group_translations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('addon_group_id')->constrained('addon_groups')->onDelete('cascade');
                $table->foreignId('language_id')->constrained('languages')->onDelete('cascade');
                $table->string('name')->nullable();
                $table->string('sub_title')->nullable();
                $table->timestamps();

                $table->unique(['addon_group_id', 'language_id'], 'addon_group_trans_group_lang_unique');
            });
        }

        if (Schema::hasTable('addon_group_translations') && !Schema::hasColumn('addon_group_translations', 'sub_title')) {
            Schema::table('addon_group_translations', function (Blueprint $table) {
                $table->string('sub_title')->nullable()->after('name');
            });
        }

        if (Schema::hasTable('addon_options') && !Schema::hasTable('addon_option_translations')) {
            Schema::create('addon_option_translations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('addon_option_id')->constrained('addon_options')->onDelete('cascade');
                $table->foreignId('language_id')->constrained('languages')->onDelete('cascade');
                $table->string('name')->nullable();
                $table->timestamps();

                $table->unique(['addon_option_id', 'language_id'], 'addon_option_trans_option_lang_unique');
            });
        }

        //    (no_of_users still enforced) without touching any existing row.
        if (Schema::hasTable('promo_codes')) {
            Schema::table('promo_codes', function (Blueprint $table) {
                if (!Schema::hasColumn('promo_codes', 'user_limit_type')) {
                    $table->enum('user_limit_type', ['limited', 'unlimited'])->default('limited')->after('no_of_users');
                }
            });
        }

        // 9. Attribute ownership. Same seller_id pattern as addon_groups above: NULL =
        //    admin-created and global (every seller can see/use it, only admin can edit/delete
        //    it), set = private to that seller. Nullable + no backfill: every existing attribute
        //    row keeps seller_id = NULL, so nothing already in use by any seller's product/
        //    category is reassigned, hidden, or otherwise changed.
        if (Schema::hasTable('attributes') && !Schema::hasColumn('attributes', 'seller_id')) {
            Schema::table('attributes', function (Blueprint $table) {
                $table->unsignedBigInteger('seller_id')->nullable()->index()->after('module_id');
            });

            if (Schema::hasTable('sellers')) {
                Schema::table('attributes', function (Blueprint $table) {
                    $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
                });
            }
        }

        // 10b. Store Setting gains Dark Theme Logo and Invoice Logo fields alongside the
        //      existing (light) Logo - default empty string, filled in by admin later.
        if (Schema::hasTable('settings')) {
            if (!DB::table('settings')->where('variable', 'dark_logo')->exists()) {
                DB::table('settings')->insert([
                    'variable' => 'dark_logo',
                    'value' => ''
                ]);
            }
            if (!DB::table('settings')->where('variable', 'invoice_logo')->exists()) {
                DB::table('settings')->insert([
                    'variable' => 'invoice_logo',
                    'value' => ''
                ]);
            }
        }

        // 10. Custom field ownership. Same seller_id pattern as attributes/addon_groups above,
        //     but only ever set for module=product rows - NULL = admin-created and global
        //     (visible/usable by every seller), set = private to that seller (only usable on
        //     that seller's own products, only editable/deletable by that seller). Nullable +
        //     no backfill: every existing custom_fields row keeps seller_id = NULL, so nothing
        //     already in use by any product changes ownership or visibility.
        if (Schema::hasTable('custom_fields') && !Schema::hasColumn('custom_fields', 'seller_id')) {
            Schema::table('custom_fields', function (Blueprint $table) {
                $table->unsignedBigInteger('seller_id')->nullable()->index()->after('module_id');
            });

            if (Schema::hasTable('sellers')) {
                Schema::table('custom_fields', function (Blueprint $table) {
                    $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
                });
            }
        }
            // Add quick delivery 
       
        if (Schema::hasTable('time_slots')) {
            Schema::table('time_slots', function (Blueprint $table) {
                if (!Schema::hasColumn('time_slots', 'slot_type')) {
                    $table->string('slot_type')->default('fixed')->after('title');
                }
                if (!Schema::hasColumn('time_slots', 'duration_minutes')) {
                    $table->unsignedInteger('duration_minutes')->nullable()->after('last_order_time');
                }
            });

            Schema::table('time_slots', function (Blueprint $table) {
                $table->time('from_time')->nullable()->change();
                $table->time('to_time')->nullable()->change();
                $table->time('last_order_time')->nullable()->change();
            });

            // Time slots were global (one shared list across every module) - unlike
            // addon_groups/attributes/custom_fields which are already module-scoped. Default 1
            // (existing module) so current rows keep behaving exactly as before this column existed.
            if (!Schema::hasColumn('time_slots', 'module_id')) {
                Schema::table('time_slots', function (Blueprint $table) {
                    $table->unsignedBigInteger('module_id')->default(1)->index()->after('id');
                });
            }
        }

        // Blog categories were global across modules; existing rows stay in module 1.
        if (Schema::hasTable('blog_categories') && !Schema::hasColumn('blog_categories', 'module_id')) {
            Schema::table('blog_categories', function (Blueprint $table) {
                $table->unsignedBigInteger('module_id')->default(1)->index()->after('id');
            });
        }

        if (Schema::hasTable('social_media')) {
            Schema::table('social_media', function (Blueprint $table) {
                if (!Schema::hasColumn('social_media', 'name')) {
                    $table->string('name')->nullable()->after('id');
                }
                if (!Schema::hasColumn('social_media', 'image')) {
                    $table->string('image')->nullable()->after('icon');
                }
            });

            Schema::table('social_media', function (Blueprint $table) {
                $table->text('icon')->nullable()->change();
            });
        }
           //Add default check box 
        if (Schema::hasTable('modules')) {
            if (!Schema::hasColumn('modules', 'is_default')) {
                Schema::table('modules', function (Blueprint $table) {
                    $table->boolean('is_default')->default(false)->after('status');
                });
            }

            if (!DB::table('modules')->where('is_default', 1)->exists()) {
                $defaultModuleId = DB::table('modules')->where('id', 1)->where('status', 1)->value('id')
                    ?? DB::table('modules')->where('status', 1)->orderBy('row_order')->value('id')
                    ?? DB::table('                                                      modules')->orderBy('id')->value('id');

                if ($defaultModuleId) {
                    DB::table('modules')->where('id', $defaultModuleId)->update(['is_default' => 1]);
                }
            }
        }
    }

    private function seedProductCustomFields(): void
    {
        $now = now();
        $moduleIds = DB::table('modules')->pluck('id')->all();

        foreach ($moduleIds as $moduleId) {
            // "Product Type" is skipped for Pharmacy (module_id 2) - it was always forced to 0
            // there, and with no field definition it stays hidden/unavailable, same as before.
            // Also skipped for Food Delivery (module_id 4) - veg/non-veg labeling and FSSAI
            // licensing don't apply to the addon-driven food menu model.
            if ((int) $moduleId !== 2 && (int) $moduleId !== 4) {
                $exists = DB::table('custom_fields')
                    ->where('module', 'product')
                    ->where('module_id', $moduleId)
                    ->where('name', 'Product Type')
                    ->exists();

                if (!$exists) {
                    DB::table('custom_fields')->insert([
                        'module_id' => $moduleId,
                        'module' => 'product',
                        'name' => 'Product Type',
                        'type' => 'dropdown',
                        'options' => json_encode(['Veg', 'Non-veg']),
                        'is_required' => false,
                        'status' => true,
                        'sort_order' => 0,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            }

            if ((int) $moduleId === 4) {
                continue;
            }

            $existsFssai = DB::table('custom_fields')
                ->where('module', 'product')
                ->where('module_id', $moduleId)
                ->where('name', 'FSSAI Lic. No.')
                ->exists();

            if (!$existsFssai) {
                DB::table('custom_fields')->insert([
                    'module_id' => $moduleId,
                    'module' => 'product',
                    'name' => 'FSSAI Lic. No.',
                    'type' => 'text',
                    'options' => null,
                    'is_required' => false,
                    'status' => true,
                    'sort_order' => 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }

    private function migrateProductLegacyFieldsToCustomFields(): void
    {
        if (!Schema::hasColumn('products', 'indicator') && !Schema::hasColumn('products', 'fssai_lic_no')) {
            return;
        }

        $customFieldIdsByModule = DB::table('custom_fields')
            ->where('module', 'product')
            ->whereIn('name', ['Product Type', 'FSSAI Lic. No.'])
            ->get(['id', 'module_id', 'name'])
            ->groupBy('module_id');

        $select = ['id', 'module_id', 'custom_field_values'];
        if (Schema::hasColumn('products', 'indicator')) {
            $select[] = 'indicator';
        }
        if (Schema::hasColumn('products', 'fssai_lic_no')) {
            $select[] = 'fssai_lic_no';
        }

        DB::table('products')->select($select)->orderBy('id')->chunkById(500, function ($products) use ($customFieldIdsByModule) {
            foreach ($products as $product) {
                $fieldsForModule = $customFieldIdsByModule->get($product->module_id, collect());
                if ($fieldsForModule->isEmpty()) {
                    continue;
                }

                $productTypeFieldId = optional($fieldsForModule->firstWhere('name', 'Product Type'))->id;
                $fssaiFieldId = optional($fieldsForModule->firstWhere('name', 'FSSAI Lic. No.'))->id;

                $values = json_decode($product->custom_field_values ?? '', true) ?: [];
                $changed = false;

                if ($productTypeFieldId && isset($product->indicator) && !array_key_exists((string) $productTypeFieldId, $values)) {
                    $label = ((int) $product->indicator === 1) ? 'Veg' : (((int) $product->indicator === 2) ? 'Non-veg' : null);
                    if ($label) {
                        $values[(string) $productTypeFieldId] = $label;
                        $changed = true;
                    }
                }

                if ($fssaiFieldId && isset($product->fssai_lic_no) && !array_key_exists((string) $fssaiFieldId, $values)) {
                    if ($product->fssai_lic_no !== null && $product->fssai_lic_no !== '') {
                        $values[(string) $fssaiFieldId] = $product->fssai_lic_no;
                        $changed = true;
                    }
                }

                if ($changed) {
                    DB::table('products')->where('id', $product->id)->update([
                        'custom_field_values' => json_encode($values),
                    ]);
                }
            }
        });
    }

    private function createAddonTables(): void
    {
        if (!Schema::hasTable('addon_groups')) {
            Schema::create('addon_groups', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('module_id')->default(1)->index();
                $table->unsignedBigInteger('seller_id')->nullable()->index();
                $table->string('name');
                $table->string('sub_title')->nullable();
                $table->enum('type', ['free', 'paid'])->default('free');
                $table->enum('selection_type', ['single', 'multiple'])->default('single');
                $table->boolean('is_required')->default(false);
                $table->unsignedInteger('max_select')->default(0);
                $table->tinyInteger('status')->default(1);
                $table->integer('row_order')->default(0);
                $table->timestamps();

                $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
                $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
            });
        }

        // min_select was dropped from addon_groups (Selection Limit is max_select-only now) -
        // the create block above already omits it for a fresh install; this covers an install
        // where the table was already created with the column.
        if (Schema::hasTable('addon_groups') && Schema::hasColumn('addon_groups', 'min_select')) {
            Schema::table('addon_groups', function (Blueprint $table) {
                $table->dropColumn('min_select');
            });
        }

        // max_select ("Selection Limit") default changed from 1 to 0 = unlimited - the create
        // block above already defaults fresh installs to 0; this covers an install where the
        // column already exists with the old default(1).
        if (Schema::hasTable('addon_groups') && Schema::hasColumn('addon_groups', 'max_select')) {
            Schema::table('addon_groups', function (Blueprint $table) {
                $table->unsignedInteger('max_select')->default(0)->change();
            });
        }

        // Free/Paid moves from a per-option concept (derived client-side from price > 0) to a
        // single group-level field - one radio for the whole section, matching the reference UI
        // where every option in a "Free" section has no price field at all. Existing groups are
        // backfilled: 'paid' if any of their options already has a price > 0, else 'free'.
        if (Schema::hasTable('addon_groups') && !Schema::hasColumn('addon_groups', 'type')) {
            Schema::table('addon_groups', function (Blueprint $table) {
                $table->enum('type', ['free', 'paid'])->default('free')->after('name');
            });

            if (Schema::hasTable('addon_options')) {
                DB::table('addon_groups')
                    ->whereIn('id', function ($query) {
                        $query->select('addon_group_id')
                            ->from('addon_options')
                            ->where('price', '>', 0)
                            ->distinct();
                    })
                    ->update(['type' => 'paid']);
            }
        }

        if (Schema::hasTable('addon_groups') && !Schema::hasColumn('addon_groups', 'sub_title')) {
            Schema::table('addon_groups', function (Blueprint $table) {
                $table->string('sub_title')->nullable()->after('name');
            });
        }

        if (!Schema::hasTable('addon_options')) {
            Schema::create('addon_options', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('addon_group_id')->index();
                $table->string('name');
                $table->decimal('price', 10, 2)->default(0);
                $table->decimal('discounted_price', 10, 2)->nullable();
                $table->tinyInteger('status')->default(1);
                $table->integer('row_order')->default(0);
                $table->timestamps();

                $table->foreign('addon_group_id')->references('id')->on('addon_groups')->onDelete('cascade');
            });
        }

        if (Schema::hasTable('addon_options') && !Schema::hasColumn('addon_options', 'discounted_price')) {
            Schema::table('addon_options', function (Blueprint $table) {
                $table->decimal('discounted_price', 10, 2)->nullable()->after('price');
            });
        }

        if (!Schema::hasTable('product_addon_groups')) {
            Schema::create('product_addon_groups', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('product_id');
                $table->unsignedBigInteger('addon_group_id');
                $table->timestamps();

                $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
                $table->foreign('addon_group_id')->references('id')->on('addon_groups')->onDelete('cascade');
                $table->unique(['product_id', 'addon_group_id']);
            });
        }

        // Register the "addons" permission (product category) and grant it to the same default
        // roles "brands"/"attributes" already have, so it shows in Role management immediately.
        if (Schema::hasTable('permissions') && Schema::hasTable('permission_categories')) {
            $exists = DB::table('permissions')->where('name', 'addons')->exists();
            $categoryId = DB::table('permission_categories')->where('name', 'product')->value('id');
            // On a fresh install this migration runs before PermissionCategoriesSeeder, so the
            // "product" category doesn't exist yet - category_id is NOT NULL, so inserting here
            // would fail. Skip; the seeder path (run after migrations during install) creates
            // permissions with their categories together instead.
            if (!$exists && $categoryId) {
                $permissionId = DB::table('permissions')->insertGetId([
                    'name' => 'addons',
                    'guard_name' => 'web',
                    'category_id' => $categoryId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                if (Schema::hasTable('role_has_permissions')) {
                    $brandsPermissionId = DB::table('permissions')->where('name', 'brands')->value('id');
                    $roleIds = $brandsPermissionId
                        ? DB::table('role_has_permissions')->where('permission_id', $brandsPermissionId)->pluck('role_id')
                        : collect();

                    foreach ($roleIds as $roleId) {
                        DB::table('role_has_permissions')->insert([
                            'permission_id' => $permissionId,
                            'role_id' => $roleId,
                        ]);
                    }
                }
            }
        }
    }

    public function down()
    {
        if (Schema::hasTable('modules') && Schema::hasColumn('modules', 'is_default')) {
            Schema::table('modules', function (Blueprint $table) {
                $table->dropColumn('is_default');
            });
        }

        if (Schema::hasTable('social_media')) {
            Schema::table('social_media', function (Blueprint $table) {
                if (Schema::hasColumn('social_media', 'name')) {
                    $table->dropColumn('name');
                }
                if (Schema::hasColumn('social_media', 'image')) {
                    $table->dropColumn('image');
                }
            });
        }

        if (Schema::hasTable('time_slots')) {
            Schema::table('time_slots', function (Blueprint $table) {
                if (Schema::hasColumn('time_slots', 'slot_type')) {
                    $table->dropColumn('slot_type');
                }
                if (Schema::hasColumn('time_slots', 'duration_minutes')) {
                    $table->dropColumn('duration_minutes');
                }
                if (Schema::hasColumn('time_slots', 'module_id')) {
                    $table->dropColumn('module_id');
                }
            });
        }

        if (Schema::hasTable('custom_fields') && Schema::hasColumn('custom_fields', 'seller_id')) {
            Schema::table('custom_fields', function (Blueprint $table) {
                $table->dropForeign(['seller_id']);
                $table->dropColumn('seller_id');
            });
        }

        if (Schema::hasTable('attributes') && Schema::hasColumn('attributes', 'seller_id')) {
            Schema::table('attributes', function (Blueprint $table) {
                $table->dropForeign(['seller_id']);
                $table->dropColumn('seller_id');
            });
        }

        if (Schema::hasTable('products')) {
            Schema::table('products', function (Blueprint $table) {
                if (!Schema::hasColumn('products', 'indicator')) {
                    $table->tinyInteger('indicator')->nullable()->comment("0 - none | 1 - veg | 2 - non-veg");
                }
                if (!Schema::hasColumn('products', 'fssai_lic_no')) {
                    $table->string('fssai_lic_no')->nullable();
                }
            });
        }

        // Structure only - values stay in custom_field_values, they are not copied back.
        if (Schema::hasTable('custom_fields')) {
            DB::table('custom_fields')->where('module', 'product')->whereIn('name', ['Product Type', 'FSSAI Lic. No.'])->delete();
        }

        if (Schema::hasTable('modules')) {
            DB::table('modules')->where('id', 4)->where('slug', 'food_delivery')->delete();
        }

        if (Schema::hasTable('settings')) {
            DB::table('settings')->whereIn('variable', ['dark_logo', 'invoice_logo'])->delete();
        }

        if (Schema::hasTable('carts')) {
            Schema::table('carts', function (Blueprint $table) {
                if (Schema::hasColumn('carts', 'addon_price')) {
                    $table->dropColumn('addon_price');
                }
                if (Schema::hasColumn('carts', 'selected_addon_ids')) {
                    $table->dropColumn('selected_addon_ids');
                }
            });
        }

        if (Schema::hasTable('pos_order_items')) {
            Schema::table('pos_order_items', function (Blueprint $table) {
                if (Schema::hasColumn('pos_order_items', 'addon_price')) {
                    $table->dropColumn('addon_price');
                }
                if (Schema::hasColumn('pos_order_items', 'selected_addon_ids')) {
                    $table->dropColumn('selected_addon_ids');
                }
            });
        }

        Schema::dropIfExists('addon_option_translations');
        Schema::dropIfExists('addon_group_translations');

        if (Schema::hasTable('order_items')) {
            Schema::table('order_items', function (Blueprint $table) {
                if (Schema::hasColumn('order_items', 'addon_price')) {
                    $table->dropColumn('addon_price');
                }
                if (Schema::hasColumn('order_items', 'selected_addon_ids')) {
                    $table->dropColumn('selected_addon_ids');
                }
                if (Schema::hasColumn('order_items', 'image')) {
                    $table->dropColumn('image');
                }
            });
        }

        Schema::dropIfExists('product_addon_groups');
        Schema::dropIfExists('addon_options');
        Schema::dropIfExists('addon_groups');

        if (Schema::hasTable('promo_codes')) {
            Schema::table('promo_codes', function (Blueprint $table) {
                if (Schema::hasColumn('promo_codes', 'user_limit_type')) {
                    $table->dropColumn('user_limit_type');
                }
            });
        }

        if (Schema::hasTable('permissions')) {
            $permissionId = DB::table('permissions')->where('name', 'addons')->value('id');
            if ($permissionId) {
                if (Schema::hasTable('role_has_permissions')) {
                    DB::table('role_has_permissions')->where('permission_id', $permissionId)->delete();
                }
                DB::table('permissions')->where('id', $permissionId)->delete();
            }
        }
    }
};
