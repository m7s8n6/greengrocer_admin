<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

function beforeUpdate(): bool
{
    Artisan::call('backup::db');
    return true;
}

/**
 * Runs right after the updater has written every file of the release.
 *
 * The updater executes this inside the SAME PHP process that started the update, and that process
 * still has the OLD framework loaded while vendor/ on disk is already the new one. Calling
 * Artisan::call('migrate') here makes the new framework code run on top of the old loaded helpers
 * and dies with "Call to undefined function Illuminate\Support\array_first()" (a fatal Error that
 * the updater does not catch), so the migration never ran. Run it in a fresh PHP process instead.
 *
 * Every step is logged as "LaraUpdater upgrade.php - ..." so a failure is visible in laravel.log.
 * If the migration cannot be started here, the panel still sends the browser to /migration
 * afterwards, which runs on the fully updated code.
 */
function main(): bool
{
    Log::info('LaraUpdater upgrade.php - main() started');

    try {
        $disabled = array_map('trim', explode(',', (string) ini_get('disable_functions')));
        if (!function_exists('exec') || in_array('exec', $disabled, true)) {
            Log::warning('LaraUpdater upgrade.php - exec() is disabled; migration will run through /migration instead');
            return true;
        }

        $cmd = 'cd ' . escapeshellarg(base_path()) . ' && php artisan migrate --force --no-interaction 2>&1';
        $output = [];
        $code = 0;
        exec($cmd, $output, $code);

        Log::info('LaraUpdater upgrade.php - migrate finished, exit code ' . $code . "\n" . implode("\n", $output));

        if ($code !== 0) {
            Log::error('LaraUpdater upgrade.php - migrate FAILED (exit code ' . $code . '); it will be retried through /migration');
        }
    } catch (\Throwable $e) {
        Log::error('LaraUpdater upgrade.php - ' . $e->getMessage() . ' at ' . $e->getFile() . ':' . $e->getLine());
    }

    return true;
}
