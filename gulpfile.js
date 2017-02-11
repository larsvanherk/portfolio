var gulp         = require('gulp');
var execSync     = require('child_process').execSync;
var del          = require('del');
var browserSync  = require('browser-sync');
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');
var concat       = require('gulp-concat');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var imagemin     = require('gulp-imagemin');
var htmlmin      = require('gulp-htmlmin');

gulp.task('default', ['build']);

gulp.task('build', ['html', 'sass', 'images', 'robots']);

gulp.task('html', function() {
  return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('html-watch', ['html'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('sass', function() {
  return gulp.src('src/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(postcss([
          autoprefixer({ browsers: ['last 4 versions'] }),
          cssnano()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
  del(['dist/images']);
  return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('images-watch', ['images'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('robots', function() {
  return gulp.src('src/robots.txt')
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: "./dist",
    port: "7000"
  });

  gulp.watch("src/sass/**/*.scss", ['sass']);
  gulp.watch("src/images/**/*", ['images-watch']);
  gulp.watch("src/index.html", ['html-watch']);
});

gulp.task('dist', ['build'], function() {
  execShell('docker build -t registry.gitlab.com/work-portfolio/portfolio .');
  execShell('docker push registry.gitlab.com/work-portfolio/portfolio');
});

gulp.task('clean', function() {
  del([
    'dist/'
  ]);
});

//// HELPER FUNCTIONS ////

function execShell(cmd) {
  execSync(cmd, {stdio:[0,1,2]});
}