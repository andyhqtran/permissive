/**
 * External dependencies
 */
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('sass', () => {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
