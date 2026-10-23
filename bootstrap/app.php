<?php

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

// Package-discovery caches (packages.php / services.php) built by an older install - e.g. a client
// updating from Laravel 8/9 to 12 - make the new app fail to boot. Rebuild them ONCE whenever the vendor
// install changes, not on every request: a marker stores the fingerprint of vendor/composer/installed.php
// (size + modified time). First request after an update (or on a new install) sees no / a different marker,
// writes the new one and drops the old caches, which Laravel then rebuilds. After that nothing is deleted,
// so concurrent requests never find the cache missing in the middle of booting.
$packageInstalledFile = dirname(__DIR__) . '/vendor/composer/installed.php';
if (is_file($packageInstalledFile)) {
    $packageFingerprintFile = __DIR__ . '/cache/.vendor-fingerprint';
    $packageFingerprint = @filesize($packageInstalledFile) . '-' . @filemtime($packageInstalledFile);
    if ((string) @file_get_contents($packageFingerprintFile) !== $packageFingerprint) {
        // marker first, so a concurrent request does not purge a second time
        @file_put_contents($packageFingerprintFile, $packageFingerprint, LOCK_EX);
        foreach (['packages.php', 'services.php'] as $packageCacheFile) {
            @unlink(__DIR__ . '/cache/' . $packageCacheFile);
        }
    }
}


$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
|
*/

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/


return $app;
