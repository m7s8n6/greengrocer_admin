<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Auto-Assign Delivery Boy (see docs/auto-assign-delivery-boy-plan.md) + Realtime
 * broadcasting settings (Pusher/Reverb, used to push order-offer alerts to drivers).
 *
 * Every addition here is additive and defaults to today's exact behaviour:
 * - `module_delivery_settings.auto_assign_enabled` defaults 0 - auto-assign never runs
 *   for any module until an admin explicitly turns it on.
 * - `sellers.delivery_boy_source` defaults 'shared' - no seller is scoped to their own
 *   fleet until an admin explicitly sets them to 'own' (at registration or via Edit
 *   Seller). This column was originally paired with a module-level
 *   `allow_seller_owned_fleet` gate, later dropped as redundant once the admin already
 *   has full per-seller control here directly.
 * - `delivery_boys.seller_id`/`is_online`/etc. are nullable/default-false additions -
 *   every existing delivery boy row is unaffected.
 * - Realtime settings default to empty/'pusher' (matching the existing unused pusher
 *   config stub) - nothing changes about how broadcasting works until an admin fills in
 *   real credentials and saves.
 *
 * Every step is guarded so this file can be re-run safely.
 */
return new class extends Migration
{
    public function up()
    {
        // 1. delivery_boys: on-duty state + live position + optional seller ownership.
        if (Schema::hasTable('delivery_boys')) {
            Schema::table('delivery_boys', function (Blueprint $table) {
                if (!Schema::hasColumn('delivery_boys', 'seller_id')) {
                    $table->unsignedBigInteger('seller_id')->nullable()->index()->after('admin_id');
                }
                if (!Schema::hasColumn('delivery_boys', 'is_online')) {
                    $table->boolean('is_online')->default(false)->after('status');
                }
                if (!Schema::hasColumn('delivery_boys', 'current_latitude')) {
                    $table->string('current_latitude')->nullable()->after('is_online');
                }
                if (!Schema::hasColumn('delivery_boys', 'current_longitude')) {
                    $table->string('current_longitude')->nullable()->after('current_latitude');
                }
                if (!Schema::hasColumn('delivery_boys', 'location_updated_at')) {
                    $table->timestamp('location_updated_at')->nullable()->after('current_longitude');
                }
            });

            if (Schema::hasTable('sellers') && Schema::hasColumn('delivery_boys', 'seller_id')) {
                $fkExists = collect(DB::select(
                    "SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS
                     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'delivery_boys'
                     AND CONSTRAINT_NAME = 'delivery_boys_seller_id_foreign'"
                ))->isNotEmpty();
                if (!$fkExists) {
                    Schema::table('delivery_boys', function (Blueprint $table) {
                        $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('set null');
                    });
                }
            }
        }

        // 2. sellers: which pool auto-assign draws from for this seller's single-seller
        //    orders (§2b) - admin-set directly, no separate module-level gate.
        if (Schema::hasTable('sellers') && !Schema::hasColumn('sellers', 'delivery_boy_source')) {
            Schema::table('sellers', function (Blueprint $table) {
                $table->enum('delivery_boy_source', ['shared', 'own'])->default('shared')->after('assign_delivery_boy');
            });
        }

        // 3. module_delivery_settings - one row per module, auto-assign tuning.
        //    auto_assign_enabled defaults 0 (manual-only, unchanged) for every module,
        //    including ones seeded below.
        if (!Schema::hasTable('module_delivery_settings')) {
            Schema::create('module_delivery_settings', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('module_id')->unique();
                $table->boolean('auto_assign_enabled')->default(false);
                $table->unsignedInteger('response_timeout_seconds')->default(60);
                $table->unsignedInteger('max_rounds')->default(4);
                $table->unsignedInteger('max_distance_km')->default(5);
                $table->unsignedInteger('total_wait_cap_seconds')->default(300);
                $table->unsignedInteger('max_concurrent_orders')->default(2);
                $table->unsignedInteger('location_staleness_minutes')->default(10);
                $table->timestamps();

                if (Schema::hasTable('modules')) {
                    $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
                }
            });

            if (Schema::hasTable('modules')) {
                $now = now();
                $moduleIds = DB::table('modules')->pluck('id');
                foreach ($moduleIds as $moduleId) {
                    DB::table('module_delivery_settings')->insert([
                        'module_id' => $moduleId,
                        'auto_assign_enabled' => false,
                        'response_timeout_seconds' => 60,
                        'max_rounds' => 4,
                        'max_distance_km' => 5,
                        'total_wait_cap_seconds' => 300,
                        'max_concurrent_orders' => 2,
                        'location_staleness_minutes' => 10,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            }
        }

       
        if (Schema::hasTable('module_delivery_settings')) {
            Schema::table('module_delivery_settings', function (Blueprint $table) {
                if (Schema::hasColumn('module_delivery_settings', 'broadcast_size')) {
                    $table->dropColumn('broadcast_size');
                }
                if (Schema::hasColumn('module_delivery_settings', 'auto_assign_trigger_status')) {
                    $table->dropColumn('auto_assign_trigger_status');
                }
                if (Schema::hasColumn('module_delivery_settings', 'allow_seller_owned_fleet')) {
                    $table->dropColumn('allow_seller_owned_fleet');
                }
            });
        }

        // Auto-assign delivery boy feature disabled - delivery_assignment_attempts table not created
        // // 4. delivery_assignment_attempts - pure audit + in-flight state for the broadcast
        // //    rounds. No existing table/FK touched.
        // if (!Schema::hasTable('delivery_assignment_attempts')) {
        //     Schema::create('delivery_assignment_attempts', function (Blueprint $table) {
        //         $table->id();
        //         $table->unsignedBigInteger('order_id')->index();
        //         $table->unsignedBigInteger('delivery_boy_id')->index();
        //         $table->unsignedInteger('round_number')->default(1);
        //         $table->enum('status', ['offered', 'accepted', 'rejected', 'timeout', 'withdrawn', 'manual_override'])->default('offered');
        //         $table->decimal('distance_km', 8, 2)->nullable();
        //         $table->timestamp('offered_at')->nullable();
        //         $table->timestamp('responded_at')->nullable();
        //         $table->timestamps();

        //         if (Schema::hasTable('orders')) {
        //             $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        //         }
        //         if (Schema::hasTable('delivery_boys')) {
        //             $table->foreign('delivery_boy_id')->references('id')->on('delivery_boys')->onDelete('cascade');
        //         }
        //     });
        // }

        // 5. Realtime broadcasting settings (Pusher / Reverb) - admin-configurable instead
        //    of .env-only, same key/value Setting pattern as every other settings page
        //    (mirrors dark_logo/invoice_logo seeding in version_4_0_1). Empty by default -
        //    EventServiceProvider only overrides Laravel's broadcasting config once an
        //    admin has actually filled these in and saved (see EventServiceProvider::boot()).
        if (Schema::hasTable('settings')) {
            $realtimeDefaults = [
                'broadcast_driver' => 'pusher',
                'pusher_app_id' => '',
                'pusher_app_key' => '',
                'pusher_app_secret' => '',
                'pusher_app_cluster' => '',
                'reverb_app_id' => '',
                'reverb_app_key' => '',
                'reverb_app_secret' => '',
                'reverb_host' => '127.0.0.1',
                'reverb_port' => '8080',
                'reverb_scheme' => 'http',
            ];

            foreach ($realtimeDefaults as $variable => $value) {
                if (!DB::table('settings')->where('variable', $variable)->exists()) {
                    DB::table('settings')->insert([
                        'variable' => $variable,
                        'value' => $value,
                    ]);
                }
            }
        }

        // 6. Map provider (OpenStreetMap free vs Google Maps paid) - defaults to 'google'
        //    since every existing install already has Google Maps configured and working;
        //    nothing changes about map behaviour anywhere until an admin explicitly
        //    switches this to 'osm' on the Third Party API Credentials settings page.
        if (Schema::hasTable('settings') && !DB::table('settings')->where('variable', 'map_provider')->exists()) {
            DB::table('settings')->insert([
                'variable' => 'map_provider',
                'value' => 'google',
            ]);
        }

        // 7. blog_categories: scope by module (were global across modules). Existing rows stay in module 1.
        if (Schema::hasTable('blog_categories') && !Schema::hasColumn('blog_categories', 'module_id')) {
            Schema::table('blog_categories', function (Blueprint $table) {
                $table->unsignedBigInteger('module_id')->default(1)->index()->after('id');
            });
        }

        // 8. user_addresses.landmark/area were NOT NULL, so an address saved without them failed
        //    on insert (empty strings arrive as null). Many addresses have no landmark.
        if (Schema::hasTable('user_addresses')) {
            Schema::table('user_addresses', function (Blueprint $table) {
                if (Schema::hasColumn('user_addresses', 'landmark')) {
                    $table->text('landmark')->nullable()->change();
                }
                if (Schema::hasColumn('user_addresses', 'area')) {
                    $table->string('area')->nullable()->change();
                }
            });
        }

        // 9. A delivery boy can now serve several cities (seller-owned drivers pick them from the
        //    seller's own cities). delivery_boys.city_id stays as the primary/first city so every
        //    existing reader keeps working; this table holds the full set. Backfilled from city_id.
        if (Schema::hasTable('delivery_boys') && !Schema::hasTable('delivery_boy_cities')) {
            Schema::create('delivery_boy_cities', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('delivery_boy_id');
                $table->unsignedBigInteger('city_id');
                $table->unique(['delivery_boy_id', 'city_id']);
                $table->index('city_id');
                $table->foreign('delivery_boy_id')->references('id')->on('delivery_boys')->onDelete('cascade');
            });

            $rows = DB::table('delivery_boys')->whereNotNull('city_id')->where('city_id', '>', 0)
                ->get(['id', 'city_id'])
                ->map(fn ($r) => ['delivery_boy_id' => $r->id, 'city_id' => $r->city_id])
                ->all();
            foreach (array_chunk($rows, 500) as $chunk) {
                DB::table('delivery_boy_cities')->insert($chunk);
            }
        }

        // 5. wallet_transactions.transaction_date was created with `default(now())`, which froze
        //    the migration-time datetime as a constant default - every row inserted without an
        //    explicit date got that same value. Give the column a real CURRENT_TIMESTAMP default
        //    (existing rows are not repaired).
        if (Schema::hasTable('wallet_transactions') && Schema::hasColumn('wallet_transactions', 'transaction_date')) {
            $frozen = DB::table('information_schema.COLUMNS')
                ->where('TABLE_SCHEMA', DB::raw('DATABASE()'))
                ->where('TABLE_NAME', 'wallet_transactions')
                ->where('COLUMN_NAME', 'transaction_date')
                ->value('COLUMN_DEFAULT');

            if ($frozen && !str_contains(strtolower($frozen), 'current_timestamp')) {
                // Future rows only: existing rows are left as they are (no repair of old dates).
                // New wallet transactions already get a real date from the WalletTransaction model;
                // this just gives the column a real default too. Best-effort - old databases can
                // hold zero dates that strict MySQL refuses to re-validate, which must not stop
                // the rest of this migration.
                try {
                    DB::statement('ALTER TABLE wallet_transactions MODIFY transaction_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP');
                } catch (\Throwable $e) {
                    \Illuminate\Support\Facades\Log::warning('4.0.2 wallet_transactions.transaction_date default not changed: ' . $e->getMessage());
                }
            }
        }

        if (Schema::hasTable('orders') && !Schema::hasColumn('orders', 'slot_type')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->string('slot_type', 20)->nullable()->after('delivery_time');
            });
        }

        // 7. orders money columns were created as double(8,2) (max 999,999.99), so an order total of
        //    1,000,000 or more failed with "Out of range value for column 'total'". Widen them to a
        //    plain DOUBLE, keeping each column's NULL / default exactly as it was. Only columns still
        //    on the narrow type are touched, so re-running is harmless.
        $this->widenOrderMoneyColumns();

        // 8. user_addresses.house_no - house / flat number, optional.
        if (Schema::hasTable('user_addresses') && !Schema::hasColumn('user_addresses', 'house_no')) {
            Schema::table('user_addresses', function (Blueprint $table) {
                $table->string('house_no')->nullable()->after('alternate_mobile');
            });
        }

    }
    

    private function widenOrderMoneyColumns(): void
    {
        if (!Schema::hasTable('orders')) {
            return;
        }

        foreach (['total', 'delivery_charge', 'tax_amount', 'wallet_balance', 'promo_discount', 'final_total', 'remaining_total'] as $column) {
            $info = DB::table('information_schema.columns')
                ->where('table_schema', DB::raw('DATABASE()'))
                ->where('table_name', 'orders')
                ->where('column_name', $column)
                ->first(['column_type as column_type', 'is_nullable as is_nullable', 'column_default as column_default']);

            // Missing column, or already wide enough (plain double / decimal): nothing to do.
            if (!$info || !preg_match('/^(double|float)\\(\\d+,\\d+\\)/i', $info->column_type)) {
                continue;
            }

            // MODIFY replaces the whole definition, so re-state NULL-ability and default exactly as
            // they are now - only the size changes.
            $nullable = strtoupper($info->is_nullable) === 'YES';
            $default = $info->column_default;
            $hasDefault = $default !== null && strtoupper((string) $default) !== 'NULL';

            $definition = $nullable ? 'NULL' : 'NOT NULL';
            if ($hasDefault) {
                $definition .= ' DEFAULT ' . DB::getPdo()->quote((string) $default);
            } elseif ($nullable) {
                $definition .= ' DEFAULT NULL';
            }

            DB::statement("ALTER TABLE `orders` MODIFY `{$column}` DOUBLE {$definition}");
        }
        
    }

    public function down()
    {
        Schema::dropIfExists('delivery_boy_cities');

        if (Schema::hasTable('user_addresses') && Schema::hasColumn('user_addresses', 'house_no')) {
            Schema::table('user_addresses', function (Blueprint $table) {
                $table->dropColumn('house_no');
            });
        }

        if (Schema::hasTable('blog_categories') && Schema::hasColumn('blog_categories', 'module_id')) {
            Schema::table('blog_categories', function (Blueprint $table) {
                $table->dropColumn('module_id');
            });
        }

        if (Schema::hasTable('settings')) {
            DB::table('settings')->whereIn('variable', [
                'broadcast_driver',
                'pusher_app_id',
                'pusher_app_key',
                'pusher_app_secret',
                'pusher_app_cluster',
                'reverb_app_id',
                'reverb_app_key',
                'reverb_app_secret',
                'reverb_host',
                'reverb_port',
                'reverb_scheme',
                'map_provider',
            ])->delete();
        }

        // Schema::dropIfExists('delivery_assignment_attempts');
        Schema::dropIfExists('module_delivery_settings');

        if (Schema::hasTable('sellers') && Schema::hasColumn('sellers', 'delivery_boy_source')) {
            Schema::table('sellers', function (Blueprint $table) {
                $table->dropColumn('delivery_boy_source');
            });
        }

        if (Schema::hasTable('delivery_boys')) {
            if (Schema::hasColumn('delivery_boys', 'seller_id')) {
                Schema::table('delivery_boys', function (Blueprint $table) {
                    $table->dropForeign(['seller_id']);
                    $table->dropColumn('seller_id');
                });
            }
            Schema::table('delivery_boys', function (Blueprint $table) {
                foreach (['is_online', 'current_latitude', 'current_longitude', 'location_updated_at'] as $column) {
                    if (Schema::hasColumn('delivery_boys', $column)) {
                        $table->dropColumn($column);
                    }
                }
            });
        }
    }
};
