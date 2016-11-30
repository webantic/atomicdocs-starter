const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

gulp.task('sass', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
})

// Static Server + watching scss/php files
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    proxy: 'http://localhost/CHANGEME',
    open: false
  })

  gulp.watch('scss/**/*.scss', ['sass'])
  gulp.watch(['components/**/*.php', 'components/**/*.html']).on('change', browserSync.reload)
})

gulp.task('default', ['serve'])
