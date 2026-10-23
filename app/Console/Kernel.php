<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Console\Commands\SendCartNotificationCommand;
class Kernel extends ConsoleKernel
{
    protected $commands = [
        SendCartNotificationCommand::class,
    ];
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('cart:notification')->everyMinute();
        $schedule->command('queue:work --stop-when-empty --max-time=55')->everyMinute()->withoutOverlapping();
        $schedule->command('popup:update-status')->everyMinute();
        // Auto-assign delivery boy feature disabled
        // $schedule->command('auto-assign:sweep-timeouts')->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
