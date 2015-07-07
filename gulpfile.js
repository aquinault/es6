// Various helper modules
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

var path = require('path');

// I manage the paths of this project via an object
var paths = {
    es6: ['es6/**/*.js'],
    es5: 'es5',
    // Must be absolute or relative to source map
    sourceRoot: path.join(__dirname, 'es6'),
};

// First task: transpile the ES6 code
gulp.task('babel', function () { // (A)
    return gulp.src(paths.es6)
        .pipe(sourcemaps.init()) // (B)
        .pipe(babel())
        .pipe(sourcemaps.write('.', // (C)
                  { sourceRoot: paths.sourceRoot }))
        .pipe(gulp.dest(paths.es5));
});

// Second task: watch files, transpile if one of them changes
gulp.task('watch', function() { // (D)
    gulp.watch(paths.es6, ['babel']);
});

// The default task is 'watch'
gulp.task('default', ['babel', 'watch']); // (E)


/*
var gulp = require("gulp");
var babel = require("gulp-babel");
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task("compile", function () {
  gulp.src("./imports/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/imports"));

  return gulp.src("*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", function(){
    gulp.watch('*.js', ['default']);
});


gulp.task('default', function() {
    browserify({
    entries: './main.js',
    debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist'));
});
*/