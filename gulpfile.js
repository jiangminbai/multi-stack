let gulp = require('gulp');
let less = require('gulp-less');
let autoprefixer = require('gulp-autoprefixer');
// let { exec } = require('child_process');
// let supervisor = require('supervisor');
let supervisor = require('gulp-supervisor');

gulp.task('less', () => {
  gulp.src('./public/less/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css/'))
})

gulp.task('dev', ['less'], () => {
  gulp.watch(['./public/less/**/*'], ['less']);
  // exec('supervisor --harmony ./bin/www')
  // supervisor.run('supervisor --harmony ./bin/www');
  supervisor('./bin/www');
})