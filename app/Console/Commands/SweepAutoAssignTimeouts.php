<?php

namespace App\Console\Commands;

use App\Services\AutoAssignDeliveryBoyService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

/**
 * Expires unanswered auto-assign offers and backfills/advances rounds.
 * See docs/auto-assign-delivery-boy-plan.md §6 blocking-prerequisite note: this runs
 * once a minute via the same cron pattern as every other scheduled command in this app
 * (app/Console/Kernel.php) - there is no persistent queue worker, so
 * response_timeout_seconds defaults to 60s+ (module_delivery_settings) to realistically
 * match this cadence rather than pretending a 20-40s SLA is achievable today.
 */
class SweepAutoAssignTimeouts extends Command
{
    protected $signature = 'auto-assign:sweep-timeouts';
    protected $description = 'Expire unanswered auto-assign delivery boy offers and advance/backfill rounds';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        try {
            AutoAssignDeliveryBoyService::sweepExpiredOffers();
            $this->info('Auto-assign timeout sweep completed.');
        } catch (\Throwable $e) {
            Log::error('[AutoAssign] sweep-timeouts command failed: ' . $e->getMessage());
            $this->error('Auto-assign timeout sweep failed: ' . $e->getMessage());
        }
        return 0;
    }
}
