const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

const csso = require("gulp-csso");
const rename = require("gulp-rename");
const del = require("del");
const uglify = require("gulp-uglify-es").default;
const pipeline = require("readable-stream").pipeline;
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// HTML

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(plumber())
    .pipe(htmlmin({
      minifyURLs: true,
      collapseWhitespace: true,
      removeComments: true,
      sortAttributes: true,
    }))
    .pipe(gulp.dest("build"));
};

exports.html = html;

// JS

const compress = () => {
  return pipeline(
    gulp.src("source/js/**/*.js"),
    concat("script.js"),
    sourcemap.init(),
    uglify(),
    rename("script.min.js"),
    sourcemap.write("."),
    gulp.dest("build/js")
  );
}

exports.compress = compress;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    browser: "google chrome",
    cors: true,
    notify: false,
    ui: false
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
  gulp.watch("source/js/*.js", gulp.series("compress")).on("change", sync.reload);
};

// Images

const images = () => {
  return gulp
    .src("source/img/**/*.{jpg,png,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ progressive: true }),
        imagemin.svgo({
          plugins: [
            { cleanupNumericValues: { floatPrecision: 1 } }
          ]
        })
      ])
    )
    .pipe(gulp.dest("build/img"));
};

exports.images = images;

const webpConvert = () => {
  return gulp.src("source/img/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img/"));
};

exports.webpConvert = webpConvert;

// Sprite

const sprite = () => {
  return gulp
    .src("source/img/icons/*.svg")
    .pipe(
      imagemin([
        imagemin.svgo()
      ])
    )
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/icons"));
};

exports.sprite = sprite;

// Copy

const copy = () => {
  return gulp
    .src(["source/fonts/**/*.{woff,woff2}",
      "source/*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

const build = gulp.series(
  clean,
  copy,
  styles,
  images,
  webpConvert,
  sprite,
  html,
  compress);

exports.build = build;

exports.default = gulp.series(
  build,
  server,
  watcher);
