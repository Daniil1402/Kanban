const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
// const concat = require("gulp-concat");

gulp.task("pug", () => {
  return gulp
    .src("app/pug/*.pug")
    .pipe(
      pug({
        pretty: true,
      }),
    )
    .pipe(gulp.dest("app/"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("styles", function () {
  return gulp
    .src("app/assets/sass/styles.sass")
    .pipe(sass())
    .pipe(gulp.dest("app/assets/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("scripts", function () {
  return gulp
    .src(["app/assets/js/main/**/*.js"])
    .pipe(gulp.dest("app/assets/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      }),
    );
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    open: true,
    notify: false,
  });
});

gulp.task("watch", function () {
  gulp.watch("app/assets/sass/**/*.sass", gulp.parallel("styles"));
  gulp.watch("app/assets/js/main/**/*.js", gulp.parallel("scripts"));
  gulp.watch("app/pug/**/*.pug", gulp.parallel("pug"));
});

gulp.task("build", async function () {
  gulp.src("app/assets/css/*.css").pipe(sass({ outputStyle: "compressed" })).pipe(gulp.dest("build/assets/css"));
  gulp.src("app/assets/js/**/*.js").pipe(gulp.dest("build/assets/js"));
  gulp.src("app/assets/img/**/*.*").pipe(gulp.dest("build/assets/img/"));
  gulp.src("app/assets/fonts/**/*.*").pipe(gulp.dest("build/assets/fonts/"));
  gulp.src("app/*.html").pipe(gulp.dest("build/"));
});

gulp.task("default", gulp.parallel("styles", "scripts", "pug", "watch", "browser-sync"));
