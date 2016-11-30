const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

gulp.task('sass', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(browserSync.stream())
})

gulp.task('scripts', function () {
  return gulp.src('./js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js/min'))
    .pipe(browserSync.stream())
})

// Static Server + watching scss/php files
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    proxy: 'http://localhost/CHANGEME',
    open: false
  })

  gulp.watch('js/*.js', ['scripts'])
  gulp.watch('scss/**/*.scss', ['sass'])
  gulp.watch(['components/**/*.php', 'components/**/*.html']).on('change', browserSync.reload)
})

gulp.task('default', ['serve'])
