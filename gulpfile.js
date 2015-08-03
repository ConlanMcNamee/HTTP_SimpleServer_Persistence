var gulp = require('gulp');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');

gulp.task('build', function()  {
	return gulp.src('./*.js')
				 		 .pipe(babel())
				 		 .pipe(gulp.dest('built'));
});

gulp.task('test', function() {
	return gulp.src('./test/*.js')
						 .pipe(mocha());
});