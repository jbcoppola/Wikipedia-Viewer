/// <binding BeforeBuild='sass-compile' ProjectOpened='watch-sass' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass-compile', function () {
    gulp.src('./Content/style.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./Content/'));
});

gulp.task('watch-sass', function () {
    gulp.watch('./Content/*.scss', ['sass-compile']);
});