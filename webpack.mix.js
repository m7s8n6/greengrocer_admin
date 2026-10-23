const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').vue();
//.postCss('resources/css/app.css', 'public/css', []
//mix.sass('resources/sass/app.scss', 'public/css/app.css');
mix.sass('resources/sass/app.scss', 'public/css');

// Content-hash the built files (mix() in the blade adds ?id=<hash>) so browsers never keep a stale build.
mix.version();

// Lazy-loaded page chunks get a content hash too, for the same reason.
mix.webpackConfig({ output: { chunkFilename: 'js/[name].js?id=[chunkhash]' } });
