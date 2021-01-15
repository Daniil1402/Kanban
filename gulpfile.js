const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const browserSync = require("browser-sync");
const concat = require("gulp-concat");

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
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/owl.carousel/dist/owl.carousel.min.js",
      // "node_modules/lightbox2/dist/js/lightbox.min.js",
      "app/assets/js/main/**/*.js",
    ])
    .pipe(concat("scripts.js"))
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

gulp.task("default", gulp.parallel("styles", "scripts", "pug", "watch", "browser-sync"));
