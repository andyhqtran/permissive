/**
 * External dependencies
 */
import babel from 'gulp-babel';
import gulp from 'gulp';
import refresh from 'gulp-refresh';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('babel', () => gulp.src('./src/babel/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015'],
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./assets/js'))
  .pipe(refresh()));

gulp.task('babel:watch', () => {
  refresh.listen();

  gulp.watch('./babel/**/*.js', ['babel']);
});

gulp.task('sass', () => gulp.src('./src/sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./assets/css'))
  .pipe(refresh()));

gulp.task('sass:watch', () => {
  refresh.listen();

  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('watch', () => {
  refresh.listen();

  gulp.watch('./babel/**/*.js', ['babel']);
  gulp.watch('./sass/**/*.scss', ['sass']);
});
