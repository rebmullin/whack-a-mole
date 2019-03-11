var gulp = require("gulp");
var uglify = require("gulp-uglify");
var csso = require("gulp-csso");

// Gulp task to minify JavaScript files
gulp.task("scripts", function() {
  return gulp
    .src("./src/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist"));
});

gulp.task("styles", function() {
  return gulp
    .src("./src/styles.css")
    .pipe(csso())
    .pipe(gulp.dest("./dist"));
});

// TODO: optizmize images.
gulp.task("copy-images", function() {
  return gulp.src(["src/*.{gif,jpg,png,svg}"]).pipe(gulp.dest("./dist"));
});

gulp.task("copy-html", function() {
  return gulp.src(["src/*.html"]).pipe(gulp.dest("./dist"));
});

gulp.task(
  "build",
  gulp.series("copy-html", "styles", "scripts", "copy-images"),
);
