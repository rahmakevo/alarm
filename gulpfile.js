var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var buildProduction = utilities.env.production;

var lib = require('bower-files')({'overrides':{'bootstrap':{'main':['less/bootstrap.less','dist/css/bootstrap.css','dist/js/bootstrap.js']}}});

var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// define task 'gulp jshint'
gulp.task('jshint', function() {return gulp.src(['js/*.js']).pipe(jshint()).pipe(jshint.reporter('default'));});

// define task concatInterface
gulp.task('concatInterface', function() {return gulp.src(['js/*.js']).pipe(concat('allConcat.js')).pipe(gulp.dest('./tmp'));});

// make files ready for browser
gulp.task('jsBrowserify', ['concatInterface'], function() {return browserify({ entries: ['./tmp/allConcat.js'] }).bundle().pipe(source('app.js')).pipe(gulp.dest('./build/js'));});

// compress scripts to make them faster for machines to parse
gulp.task('minifyScripts', ['jsBrowserify'], function() {return gulp.src('./build/js/app.js').pipe(uglify()).pipe(gulp.dest('./build/js'));});

// get all js files that bower downloaded, concat, uglify then place them in the build/js
gulp.task('jsBower', function() {return gulp.src(lib.ext('js').files).pipe(concat('vendor.min.js')).pipe(gulp.dest('./build/js'));});

//do the same as above with css
gulp.task('cssBower', function() {return gulp.src(lib.ext('css').files).pipe(concat('vendor.css')).pipe(gulp.dest('./build/css'));});

//do the same in the above two lines in one line
gulp.task('bower', ['jsBower', 'cssBower']);

//clean up any temporary files to avoid stubborn bugs
gulp.task('clean', function() {return del(['build', 'tmp']);});

//helps dependent tasks return
gulp.task('build', ['clean'], function() {if(buildProduction){gulp.start('minifyScripts');} else {gulp.start('jsBrowserify');}gulp.start('bower');gulp.start('cssBuild');});

//serve server
gulp.task('serve', ['build'], function() {browserSync.init({server: {baseDir: './',index: 'index.html'}});});

//gulp watch for changes in our dirs & a way to run automatically
gulp.watch(['js/*.js'], ['jsBuild']);gulp.watch(['bower.json'], ['bowerBuild']);gulp.watch(['*.html'], ['htmlBuild']);gulp.watch(['scss/*.scss'], ['cssBuild']);

//next are sublines of the watch tasks above
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function() {browserSync.reload();});
gulp.task('bowerBuild', ['bower'], function() {browserSync.reload();});
gulp.task('htmlBuild', function() {browserSync.reload();});

//If you are not using sass you will not need this
gulp.task('cssBuild', function() {return gulp.src('scss/*.scss').pipe(sourcemaps.init()).pipe(sass()).pipe(sourcemaps.write()).pipe(gulp.dest('./build/css')).pipe(browserSync.stream());});
