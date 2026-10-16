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


        // Insert the row into settings table so Setting::get_value() works
        $exists = DB::table('settings')
            ->where('variable', 'is_delivery_charge_refundable')
            ->exists();

        if (!$exists) {
            DB::table('settings')->insert([
                'variable' => 'is_delivery_charge_refundable',
                'value'    => '1' // Default to 1 (Refundable) as per your requirement
            ]);
        }

        //  Add delivery boy bonus columns to return_requests table
        if (Schema::hasTable('return_requests')) {
            Schema::table('return_requests', function (Blueprint $table) {
                if (!Schema::hasColumn('return_requests', 'delivery_boy_bonus_amount')) {
                    $table->decimal('delivery_boy_bonus_amount', 15, 2)->default(0)->after('status');
                }
                if (!Schema::hasColumn('return_requests', 'delivery_boy_bonus_details')) {
                    $table->text('delivery_boy_bonus_details')->nullable()->after('delivery_boy_bonus_amount');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {


        DB::table('settings')->where('variable', 'is_delivery_charge_refundable')->delete();

        if (Schema::hasTable('return_requests')) {
            Schema::table('return_requests', function (Blueprint $table) {
                if (Schema::hasColumn('return_requests', 'delivery_boy_bonus_amount')) {
                    $table->dropColumn('delivery_boy_bonus_amount');
                }
                if (Schema::hasColumn('return_requests', 'delivery_boy_bonus_details')) {
                    $table->dropColumn('delivery_boy_bonus_details');
                }
            });
        }
    }
};
