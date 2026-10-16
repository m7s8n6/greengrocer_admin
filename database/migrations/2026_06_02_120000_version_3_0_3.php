<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 1. Create modules table
        if (!Schema::hasTable('modules')) {
            Schema::create('modules', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug');
                $table->string('image')->nullable();
                $table->text('description')->nullable();
                $table->tinyInteger('status')->default(1);
                $table->integer('row_order')->default(0);
                $table->timestamps();
            });
        } else {
            Schema::table('modules', function (Blueprint $table) {
                if (!Schema::hasColumn('modules', 'image')) {
                    $table->string('image')->nullable()->after('name');
                }
                if (!Schema::hasColumn('modules', 'description')) {
                    $table->text('description')->nullable()->after('image');
                }
                if (!Schema::hasColumn('modules', 'row_order')) {
                    $table->integer('row_order')->default(0)->after('status');
                }
                if (!Schema::hasColumn('modules', 'slug')) {
                    $table->string('slug')->nullable()->after('name');
                }
            });
            // Populate slugs for existing modules
            $modules = DB::table('modules')->get();
            foreach ($modules as $m) {
                if (empty($m->slug)) {
                    DB::table('modules')->where('id', $m->id)->update([
                        'slug' => \Illuminate\Support\Str::slug($m->name)
                    ]);
                }
            }
            // Alter column to be not nullable (required)
            Schema::table('modules', function (Blueprint $table) {
                $table->string('slug')->nullable(false)->change();
            });
        }

        if (!Schema::hasTable('module_translations')) {
            Schema::create('module_translations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('module_id')->constrained('modules')->onDelete('cascade');
                $table->foreignId('language_id')->constrained('languages')->onDelete('cascade');
                $table->string('name');
                $table->text('description')->nullable();
                $table->timestamps();
            });
        }

        // 2. Insert default modules
        $existsGrocery = DB::table('modules')->where('id', 1)->exists();
        if (!$existsGrocery) {
            DB::table('modules')->insert([
                'id' => 1,
                'name' => 'Grocery',
                'slug' => 'grocery',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $existsPharmacy = DB::table('modules')->where('id', 2)->exists();
        if (!$existsPharmacy) {
            DB::table('modules')->insert([
                'id' => 2,
                'name' => 'Pharmacy',
                'slug' => 'pharmacy',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 3. Add module_id to tables
        $tables = [
            'orders',
            'categories',
            'products',
            'sliders',
            'offers',
            'promo_codes',
            'pickup_locations',
            'blogs',
            'units',
            'brands',
            'taxes',
            'sellers',
            'favorites',
            'product_ratings',
            'user_product_requests',
            'sections'
        ];

        foreach ($tables as $tableName) {
            if (Schema::hasTable($tableName)) {
                Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                    if (!Schema::hasColumn($tableName, 'module_id')) {
                        $table->unsignedBigInteger('module_id')->default(1)->after('id');
                        $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
                    }
                    if ($tableName === 'products' && !Schema::hasColumn('products', 'require_prescription')) {
                        $table->boolean('require_prescription')->default(0)->after('module_id');
                    }
                    if ($tableName === 'orders' && !Schema::hasColumn('orders', 'prescription_images')) {
                        $table->text('prescription_images')->nullable()->after('module_id');
                    }
                });
            }
        }

        // 4. Add background colors to specific tables
        $bgTables = ['categories', 'brands', 'countries'];
        foreach ($bgTables as $tableName) {
            if (Schema::hasTable($tableName)) {
                Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                    if (!Schema::hasColumn($tableName, 'background_color_for_light_theme')) {
                        $table->string('background_color_for_light_theme')->nullable();
                    }
                    if (!Schema::hasColumn($tableName, 'background_color_for_dark_theme')) {
                        $table->string('background_color_for_dark_theme')->nullable();
                    }
                });
            }
        }

        // 5. Add background color mode settings for Category, Brand, Country
        if (!DB::table('settings')->where('variable', 'category_background_color_mode')->exists()) {
            DB::table('settings')->insert([
                'variable' => 'category_background_color_mode',
                'value' => 'global'
            ]);
        }
        if (!DB::table('settings')->where('variable', 'brand_background_color_mode')->exists()) {
            DB::table('settings')->insert([
                'variable' => 'brand_background_color_mode',
                'value' => 'global'
            ]);
        }
        if (!DB::table('settings')->where('variable', 'country_background_color_mode')->exists()) {
            DB::table('settings')->insert([
                'variable' => 'country_background_color_mode',
                'value' => 'global'
            ]);
        }

        if (!Schema::hasTable('order_prescriptions')) {
            Schema::create('order_prescriptions', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('order_id');
                $table->string('image');
                $table->timestamps();
                $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            });
        }

        if (!Schema::hasTable('order_prescription_items')) {
            Schema::create('order_prescription_items', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('order_prescription_id');
                $table->unsignedBigInteger('order_item_id');
                $table->timestamps();
                $table->foreign('order_prescription_id')->references('id')->on('order_prescriptions')->onDelete('cascade');
                $table->foreign('order_item_id')->references('id')->on('order_items')->onDelete('cascade');
            });
        }

        // Add performance indexes
        try {
            Schema::table('orders', function (Blueprint $table) {
                $table->index('user_id');
                $table->index('delivery_boy_id');
                $table->index('order_type');
                $table->index('active_status');
                $table->index('created_at');
                $table->index('deleted_at');
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('order_items', function (Blueprint $table) {
                $table->index('order_id');
                $table->index('product_variant_id');
                $table->index('seller_id');
                $table->index('created_at');
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('product_variants', function (Blueprint $table) {
                $table->index('product_id');
                $table->index('stock_unit_id');
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('products', function (Blueprint $table) {
                $table->index('seller_id');
            });
        } catch (\Exception $e) {}
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        try {
            Schema::table('orders', function (Blueprint $table) {
                $table->dropIndex(['user_id']);
                $table->dropIndex(['delivery_boy_id']);
                $table->dropIndex(['order_type']);
                $table->dropIndex(['active_status']);
                $table->dropIndex(['created_at']);
                $table->dropIndex(['deleted_at']);
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('order_items', function (Blueprint $table) {
                $table->dropIndex(['order_id']);
                $table->dropIndex(['product_variant_id']);
                $table->dropIndex(['seller_id']);
                $table->dropIndex(['created_at']);
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('product_variants', function (Blueprint $table) {
                $table->dropIndex(['product_id']);
                $table->dropIndex(['stock_unit_id']);
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('products', function (Blueprint $table) {
                $table->dropIndex(['seller_id']);
            });
        } catch (\Exception $e) {}

        Schema::dropIfExists('order_prescription_items');
        Schema::dropIfExists('order_prescriptions');

        $tables = [
            'orders',
            'categories',
            'products',
            'sliders',
            'offers',
            'promo_codes',
            'pickup_locations',
            'blogs',
            'units',
            'brands',
            'taxes',
            'sellers',
            'favorites',
            'product_ratings',
            'user_product_requests',
            'sections'
        ];

        foreach ($tables as $tableName) {
            if (Schema::hasTable($tableName)) {
                Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                    if (Schema::hasColumn($tableName, 'module_id')) {
                        $table->dropForeign(['module_id']);
                        $table->dropColumn('module_id');
                    }
                    if ($tableName === 'products' && Schema::hasColumn('products', 'require_prescription')) {
                        $table->dropColumn('require_prescription');
                    }
                    if ($tableName === 'orders' && Schema::hasColumn('orders', 'prescription_images')) {
                        $table->dropColumn('prescription_images');
                    }
                });
            }
        }

        $bgTables = ['categories', 'brands', 'countries'];
        foreach ($bgTables as $tableName) {
            if (Schema::hasTable($tableName)) {
                Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                    if (Schema::hasColumn($tableName, 'background_color_for_light_theme')) {
                        $table->dropColumn('background_color_for_light_theme');
                    }
                    if (Schema::hasColumn($tableName, 'background_color_for_dark_theme')) {
                        $table->dropColumn('background_color_for_dark_theme');
                    }
                });
            }
        }

        DB::table('settings')->whereIn('variable', [
            'category_background_color_mode',
            'brand_background_color_mode',
            'country_background_color_mode'
        ])->delete();

        Schema::dropIfExists('module_translations');

        if (Schema::hasTable('modules')) {
            Schema::table('modules', function (Blueprint $table) {
                if (Schema::hasColumn('modules', 'slug')) {
                    $table->dropColumn('slug');
                }
            });
        }

        Schema::dropIfExists('modules');
    }
};
