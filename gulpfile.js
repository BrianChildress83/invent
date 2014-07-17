// Gulp objects
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    csslint = plugins.csslint; // alias for csslinting reports

// Source paths
var scssSrc = 'scss/invent.scss',
    jsSrc = 'scripts/',
    imgSrc = 'images/',
    fontSrc = 'fonts/**/**',
    cssDest = 'dist/css/',
    jsDest = 'dist/js/',
    imgDest = 'dist/images/',
    fontDest = 'dist/fonts/';

// Javascript files to be concatenated    
var jsSources = [
	jsSrc + 'vendor/fastclick.js',
  jsSrc + 'bootstrap/transition.js',
  jsSrc + 'bootstrap/alert.js',
  jsSrc + 'bootstrap/button.js',
  jsSrc + 'bootstrap/carousel.js',
  jsSrc + 'bootstrap/collapse.js',
  jsSrc + 'bootstrap/dropdown.js',
  jsSrc + 'bootstrap/modal.js',
  jsSrc + 'bootstrap/tooltip.js',
  jsSrc + 'bootstrap/popover.js',
  jsSrc + 'bootstrap/scrollspy.js',
  jsSrc + 'bootstrap/tab.js',
  jsSrc + 'bootstrap/affix.js',
  jsSrc + 'custom/fileinput.js',
  jsSrc + 'custom/inputmask.js',
  jsSrc + 'custom/offcanvas.js',
  jsSrc + 'custom/responsive-tables.js'
];

// Custom reporters
var cssLintReporter = function(file) {
  plugins.util.log(plugins.util.colors.cyan(file.csslint.errorCount)+' errors in '+ plugins.util.colors.magenta(file.path));
  file.csslint.results.forEach(function(result) {
    plugins.util.log(result.error.message+' on line '+result.error.line);
  });
};

// CSS Distribution Task
gulp.task('css', function() {
  return gulp.src(scssSrc)
    .pipe(plugins.sass())
    .pipe(plugins.csscomb('scss/.csscomb.json')) // needs custom file thing :: maybe send pull request?
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(plugins.csslint('scss/.csslintrc'))
    .pipe(plugins.csslint.reporter(cssLintReporter))
    .pipe(gulp.dest(cssDest))
    .pipe(plugins.size({showFiles : 'true', title : 'Unminified CSS file size: '}))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.cssmin())
    .pipe(gulp.dest(cssDest))
    .pipe(plugins.size({gzip : 'true', title : 'Minified CSS file size: '}))
    .pipe(plugins.notify({ message: 'CSS task complete'}));
});

gulp.task('csslint', function() {
  return gulp.src('dist/css/invent.css')
    .pipe(csslint('scss/.csslintrc'))
    .pipe(csslint.reporter(cssLintReporter))
});

// Javascript Distribution Task :: NEED TO TEST
gulp.task('js', function() {
    return gulp.src(jsSources)
    //.pipe(plugins.jshint(jsSrc + '.jshintrc'))
    //.pipe(plugins.jshint.reporter('default')) // need to work on this one -- bootstrap is very much NOT JS lint friendly
    //.pipe(plugins.jscs('scripts/.jscsrc')) -- trying this. think i might break these out into separate tasks
    .pipe(plugins.concat('invent.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(plugins.size({showFiles : 'true', title : 'Unminified JS file size: '}))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(jsDest))
    .pipe(plugins.size({gzip : 'true', title : 'Minified JS file size: '}))
    .pipe(plugins.notify({ message: 'Scripts task complete' }));
});

// Images Minification Task :: NEED TO TEST
gulp.task('imagemin', function() {
  return gulp.src(imgSrc + '/**/*')
    .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest(imgDest))
    .pipe(plugins.notify({ message: 'Image minification task complete' }));
});

// HTML Validation test needed
// here for docs in this space

// Clean Tasks
gulp.task('clean', function() {
  return gulp.src(['css', 'js', 'imagemin'], {read: false})
    .pipe(plugins.clean());
});
// clean distribution folder only
gulp.task('clean-dist', function() {
  return gulp.src('dist/', {read: false})
    .pipe(plugins.clean());
});

// Watch Task :: NEED TO TEST
gulp.task('watch', function() {
  var server = plugins.livereload();
  gulp.watch(['scss/**/*.scss']).on('change', function(file) {
    gulp.start('css');
    server.changed(file.path);
  });
});

// Font Task :: just a simple copy and paste
gulp.task('copyFonts', function() {
  gulp.src(fontSrc)
    .pipe(gulp.dest(fontDest));
});

gulp.task('copy-css', ['css'], function() {
  gulp.src('dist/css/invent.css')
    .pipe(gulp.dest('docs/dist/css'));
});

// Full Distribution Task
gulp.task('dist', ['clean-dist'], function() {
  gulp.start('css', 'js', 'copyFonts');
});

// Default Task
// gulp.task('default', ['clean'], function() {
//   gulp.start('css', 'copy-css');
// });
gulp.task('default', function() {
  gulp.start('css', 'copy-css', 'js');
});