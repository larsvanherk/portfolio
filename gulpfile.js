var gulp         = require('gulp');
var argv         = require('yargs').argv;
var jeditor      = require("gulp-json-editor");
var execSync     = require('child_process').execSync;
var del          = require('del');
var browserSync  = require('browser-sync');
var autoprefixer = require('autoprefixer');
var cssnano      = require('cssnano');
var git          = require('gulp-git');
var concat       = require('gulp-concat');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var imagemin     = require('gulp-imagemin');
var htmlmin      = require('gulp-htmlmin');

var version = require('./package.json').version;

var releaseType = argv.release;

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

gulp.task('release-version', function() {
  return gulp.src('./package.json')
        .pipe(jeditor(function (json) {
          if(!['major', 'minor', 'patch'].contains(releaseType)) {
            throw Error('Release version type not recognized: ')
          }

          var version = json.version;

          switch(releaseType) {
            case 'major':
              var ver_parts = version.split('.');
              ver_parts[0] = parseInt(ver_parts[0]) + 1;

              version = ver_parts.join('.');
              break;

            case 'minor':
              var ver_parts = version.split('.');
              ver_parts[1] = parseInt(ver_parts[1]) + 1;

              version = ver_parts.join('.');
              break;

            case 'patch':
              var ver_parts = version.split('.');
              ver_parts[2] = parseInt(ver_parts[2]) + 1;

              version = ver_parts.join('.');
              break;
          }

          json.version = version;

          return json;
        }))
        .pipe(gulp.dest('./package.json'));
  
});

gulp.task('release', ['release-version'], function() {
  return gulp.src('./')
        .pipe(git.checkout('master'))
        .pipe(git.add())
        .pipe(git.commit('PORTFOLIO release commit for version v' + version))
        .pipe(git.tag(version, 'Release v' + version + ' for PORTFOLIO.'))
        .pipe(git.push('origin', 'master', {args: ' --tags'}));
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