'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var del = require('del');
 
gulp.task('sass', function (done) {
	gulp.src('./src/sass/**/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest('./www/css'), done);
});

gulp.task('js', function (done) {
	var jsfiles = [
		'./src/lib/jquery/dist/jquery.min.js',
		'./src/lib/bootstrap-sass/assets/javascripts/bootstrap.min.js',
		'./src/lib/angular/angular.min.js',
		'./src/lib/ng-file-upload/ng-file-upload.min.js',
		'./src/lib/angular-ui-router/release/angular-ui-router.min.js',
		'./src/lib/moment/min/moment.min.js',
		'./src/lib/lodash/dist/lodash.min.js',
		'./src/js/app.js',
		'./src/js/modules/**/*.js',
		'./src/js/directives/**/*.js',
		'./src/js/services/*.js'
	];

	gulp.src(jsfiles)
      	.pipe(concat('app.min.js'))
      	.pipe(gulp.dest('./www/js'), done);
});

gulp.task('clean', function (done) {
	return del('www/**/*');
});

gulp.task('copy', function (done) {
	gulp.src(['./src/*.html', './src/js/**/*.html'])
		.pipe(gulp.dest('./www'));
	gulp.src(['./src/fonts/*', './src/lib/font-awesome/fonts/*'])
		.pipe(gulp.dest('./www/fonts'));
	gulp.src('./src/img/*')
		.pipe(gulp.dest('./www/img'), done)
});
 
gulp.task('watch', function () {
	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch('./src/js/**/*.js', ['js']);
	gulp.watch(['./src/*.html', './src/js/**/*.html', './src/fonts/*', './src/img/*'], ['copy']);
});

gulp.task('default', ['clean', 'sass', 'js', 'copy']);