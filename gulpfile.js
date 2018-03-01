var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	htmlMin = require('gulp-htmlmin'),
	browserSync = require('browser-sync').create();


// vars to handle SCSS/CSS pathing
var 

	// src_scss = './src/scss/**/*.scss',

	proj_src_scss = './src/build/**/*.scss',
	proj_dist_scss = './dist/spyder-1.0/',

	docs_src_scss = './src/docs/scss/**/*.scss',
	docs_dist_css = './docs/css/',
	docs_src_js = './src/docs/js/**/*.js',
	docs_dist_js = './docs/js/',
	docs_src_html = './src/docs/*.html',
	docs_dist_html = './docs/';

	// docs_src_js = './src/docs/js/**/*.js',
	// docs_dist_js = './docs/js',
	// docs_src_html = './src/docs/*.html',
	// docs_dist_html = './docs/',
// 	all_html = './src/**/*.html';





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
gulp.task('proj-build', function(){
	
	return gulp.src( proj_src_scss )
		.pipe(gulp.dest( proj_dist_scss ))
		.pipe(browserSync.stream());
});

// [2] 
gulp.task('docs-styles', function(){
	
	return gulp.src( docs_src_scss )
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest( docs_dist_css ))
		.pipe(browserSync.stream());

});


// Scripts task
// ---
// Minifies src js files and sends them to desired destination folder 

gulp.task('docs-scripts', function(){

	return gulp.src( docs_src_js )
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(gulp.dest( docs_dist_js ))
		.pipe(browserSync.stream());

});


// Html move task (should minify for final build, currently just clones to ./docs/)
// ---
// watches directory for changes of desired files

gulp.task('docs-html', function() {
  return gulp.src( docs_src_html )
    // .pipe(htmlMin({
    // 	collapseWhitespace: true
    // }))
    .pipe(gulp.dest( docs_dist_html ))
    .pipe(browserSync.stream());
});


// Watch task
// ---
// watches directory for changes of desired files

gulp.task('watch', function(){

	gulp.watch( proj_src_scss, ['proj-build']);

	gulp.watch( docs_src_scss, ['docs-styles']);
	gulp.watch( docs_src_js, ['docs-scripts']);
	gulp.watch( docs_src_html, ['docs-html']).on('change', browserSync.reload);

});


// Run task (default)
// ---
// run default gulp task with desired tasks

gulp.task('default', ['serve', 'watch']);

