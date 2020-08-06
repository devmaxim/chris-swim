var gulp            = require('gulp');
var sass            = require('gulp-sass');
var notify          = require('gulp-notify');
var autoprefixer    = require('gulp-autoprefixer');
var plumber         = require('gulp-plumber');
var sourcemaps      = require('gulp-sourcemaps');
var htmlPartial     = require('gulp-html-partial');

var browserSync     = require('browser-sync').create();

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

/**
 * Browsersync
 *******************************************************************************************************/
var site = 'wp.dev.local'; // CHANGE IT FOR EVERY SITE

var browserSyncWatchFiles = [
  './styles/css/*.css',
  './js/custom.js',
  './build/*.html',
];

// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
  logPrefix: site.toUpperCase(),
  proxy:     "http://" + site,
  host:      site,
  open:      false,
  notify:    false,
  ghost:     false,
  ui:        false,
  injectChanges: true
};


/**
 * Define Base Paths
 *******************************************************************************************************/
var basePaths = {
  scss    : './styles/scss/',
  css     : './styles/css/',
  source  : './source/',
  build   : './build/'
};

// Add vendor prefixes to child styles
var dev_styles = [
  { src : basePaths.scss + 'base/_general.scss', dest : basePaths.scss + 'base/' },
  { src : basePaths.scss + 'layout/**.scss', dest : basePaths.scss + 'layout/' },
  { src : basePaths.scss + 'pages/**.scss', dest : basePaths.scss + 'pages/' },
  { src : basePaths.scss + 'templates/**.scss', dest : basePaths.scss + 'templates/' },
  { src : basePaths.scss + 'sitewide-sections/**.scss', dest : basePaths.scss + 'sitewide-sections/' }
];

gulp.task('autoprefixes', function(cb) {
  dev_styles.map(function(file) {
    return gulp.src(file.src)
        .pipe(plumber().on('error', handleErrors))
        .pipe(autoprefixer({ cascade: false }).on('error', handleErrors))
        .pipe( gulp.dest(file.dest) )
  });
  cb();
});

gulp.task('html', function () {
  return gulp.src(basePaths.source + '*.html')
      .pipe(htmlPartial({
        basePath: basePaths.source
      }))
      .pipe(gulp.dest(basePaths.build));
});


gulp.task('sass', function () {
  return gulp.src(basePaths.scss + 'main-style.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
      .pipe(sass().on('error', handleErrors))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(basePaths.css))
      .pipe(browserSync.stream({ match: '**/*.css' }));
});


gulp.task('watch', function () {
  browserSync.init(browserSyncWatchFiles, browserSyncOptions);
  gulp.watch(basePaths.scss + '**/*.scss', gulp.series('sass')); // watch SCSS changes
  gulp.watch(basePaths.source + '**/*.html', gulp.series('html')); // watch HTML changes
});

gulp.task('default', gulp.series('watch'));