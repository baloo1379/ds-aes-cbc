// eslint-disable-next-line import/no-extraneous-dependencies
const mix = require('laravel-mix');

mix
  .options({
    processCssUrls: false,
  })
  .sourceMaps(false, 'source-map')
  .sass('src/scss/app.scss', 'dist/css')
  .js('src/js/app.js', 'app.js')
  .js('src/js/client.js', 'dist/js/app.js')
  .js('src/js/server.js', 'server.js')
  .copyDirectory('src/assets', 'dist/assets')
  .copy('src/index.html', 'dist/index.html')
  .disableSuccessNotifications()
  .webpackConfig({
    target: 'node',
  });
