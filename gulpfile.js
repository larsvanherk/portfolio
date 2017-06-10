var gulp         = require('gulp');
var execSync     = require('child_process').execSync;
var confirm      = require('confirm-cli');
var argv         = require('yargs').argv;
var jeditor      = require("gulp-json-editor");
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
      var versionTypes = ['major', 'minor', 'patch'];

      if(versionTypes.indexOf(releaseType) === -1) {
        throw Error('Release version type not recognized: ' + releaseType);
      }

      var tag = json.version.split('.');

      var tagIndex = versionTypes.indexOf(releaseType);
      tag[tagIndex] = parseInt(tag[tagIndex]) + 1;

      json.version = tag.join('.');

      console.log('Tagging ' + releaseType + ' version release v' + json.version);

      return json;
    }))
    .pipe(gulp.dest('./', {overwrite: true}));

});

gulp.task('release', ['release-version'], function() {
  var version = require('./package.json').version;

  console.log('Releasing PORTFOLIO version ' + version + '!');

  confirm('Would you like to continue?', function() {

    execShell('git status');
    execShell('git add ./');
    execShell('git commit -m "PORTFOLIO release commit for version v' + version + '"');
    execShell('git tag -a ' + version + ' -m "Release v' + version + ' for PORTFOLIO."');
    execShell('git push origin master --tags');

  }, function() {

    execShell('git checkout HEAD -- package.json');
    console.log("Aborted...");

  });
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
