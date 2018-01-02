var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	htmlMin = require('gulp-htmlmin'),
	browserSync = require('browser-sync').create();


// vars to handle SCSS/CSS pathing
// var SCSS_SRC = 'scss/**/*.scss',
// 	SCSS_DEST = 'dist/css';





// Browser-sync for live reloads
// ---
// Set up a test server and open in browser. proxy to be used instead when using MAMP(is this needed?) 

gulp.task('serve', function(){
	browserSync.init({
		// proxy: "http://localhost:8888"
		server: './docs'
	});
});


// Styles task
// ---
// Compiles Sass and generates sourcemaps, minifies outputted css files before sending 
// them to desired destination folder 
// 
// [1] - styles task for build -> dist
// [2] - styles task for src/docs -> docs

// [1]
gulp.task('st-build', function(){
	
	return gulp.src('./src/build/**/*.scss')
		.pipe(gulp.dest('./dist/spyder-3.0/'))
		.pipe(browserSync.stream());
});

// [2] 
gulp.task('styles', function(){
	
	return gulp.src('./src/docs/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./docs/css'))
		.pipe(browserSync.stream());

});


// Scripts task
// ---
// Minifies src js files and sends them to desired destination folder 

gulp.task('scripts', function(){

	return gulp.src('./src/docs/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(gulp.dest('./docs/js'))
		.pipe(browserSync.stream());

});


// Html move task (should minify for final build, currently just clones to ./docs/)
// ---
// watches directory for changes of desired files

gulp.task('html', function() {
  return gulp.src('./src/docs/*.html')
    // .pipe(htmlMin({
    // 	collapseWhitespace: true
    // }))
    .pipe(gulp.dest('./docs/'))
    .pipe(browserSync.stream());
});


// Watch task
// ---
// watches directory for changes of desired files

gulp.task('watch', function(){

	gulp.watch('./src/**/*.scss', ['st-build']);
	gulp.watch('./src/**/*.scss', ['styles']);
	gulp.watch('./src/**/*.js', ['scripts']);
	gulp.watch('./src/docs/*.html', ['html']).on('change', browserSync.reload);

});


// Run task (default)
// ---
// run default gulp task with desired tasks

gulp.task('default', ['serve', 'watch']);

