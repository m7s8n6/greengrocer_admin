<?php

namespace App\Console\Commands;

use App\Models\Setting;
use Illuminate\Console\Command;

class UpdatePopupStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'popup:update-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enable or disable popup offer based on start and end dates';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $startDate = Setting::get_value('popup_start_date');
        $endDate = Setting::get_value('popup_end_date');

        if ($startDate && $endDate) {
            $now = now()->toDateString();
            $enabled = ($now >= $startDate && $now <= $endDate) ? 1 : 0;

            $setting = Setting::where('variable', 'popup_enabled')->first();
            if ($setting) {
                $setting->value = $enabled;
                $setting->save();
            }
            $this->info("Popup status updated to: " . ($enabled ? 'ON' : 'OFF'));
        }
        return 0;
    }
}
