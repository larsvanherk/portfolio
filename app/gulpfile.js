var gulp = require("gulp");
var merge = require('merge-stream');
var rename = require("gulp-rename");

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

// Development build tasks

gulp.task('buildDevCSS', function () {
    var maincss = gulp.src('css/modules/*.scss')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bundle.css'))
		.pipe(gulp.dest('css'));
    
	return merge(maincss);
});

gulp.task('buildDevJS', function () {
    var mainjs = gulp.src('js/modules/*.js')
        .pipe(concat('bundle.js'))
		.pipe(gulp.dest('js'));
    
	return merge(mainjs);
});

gulp.task('dev', ['buildDevCSS', 'buildDevJS']);

// Production build tasks

gulp.task('build', function() {
    var index = gulp.src('index.html')
        .pipe(rename(function (path) {
            path.extname = ".php"
        }))
        .pipe(gulp.dest("dist"));
    
    var contact = gulp.src('contact.php')
        .pipe(gulp.dest("dist"));
    
    var errdocs = gulp.src("errdocs/*.html")
        .pipe(gulp.dest("dist/errdocs"));
    
    var ijmfisio_html = gulp.src('projects/ijmfisio/*.html')
        .pipe(gulp.dest("dist/projects/ijmfisio"));
    
    var ijmfisio_php = gulp.src('projects/ijmfisio/*.php')
        .pipe(gulp.dest("dist/projects/ijmfisio"));
    
    return merge(index, contact, errdocs);
});

gulp.task('buildCSS', function () {
    var maincss = gulp.src('css/modules/*.scss')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(csso())
		.pipe(gulp.dest('dist/css'));
    
    var errdocs = gulp.src('errdocs/css/*.css')
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(csso())
		.pipe(gulp.dest('dist/errdocs/css'));
    
    var ijmfisio = gulp.src('projects/ijmfisio/*.css')
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(csso())
		.pipe(gulp.dest('dist/projects/ijmfisio'));
    
	return merge(maincss, errdocs, ijmfisio);
});

gulp.task('buildJS', function () {
    var mainjs = gulp.src('js/modules/*.js')
        .pipe(concat('bundle.js'))
        .pipe(uglify())
		.pipe(gulp.dest('dist/js'));
    
	return merge(mainjs);
});

gulp.task('resource', function() {
    var main = gulp.src('resource/**/*')
        .pipe(gulp.dest('dist/resource'));
    
    var ijmfisio = gulp.src('projects/ijmfisio/resource/**/*')
        .pipe(gulp.dest('dist/projects/ijmfisio/resource'));
    
    var errdocs = gulp.src('errdocs/resource/**/*')
        .pipe(gulp.dest('dist/errdocs/resource'));
    
    return merge(main, ijmfisio, errdocs);
});

gulp.task('deps', function() {
    var jquery = gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/bower_components/jquery/dist'));
    
    return merge(jquery);
});

gulp.task('prod', ['build', 'buildCSS', 'buildJS', 'resource', 'deps']);

// Default main task (same as production build)

gulp.task('default', ['build', 'buildCSS', 'buildJS', 'resource', 'deps']);
