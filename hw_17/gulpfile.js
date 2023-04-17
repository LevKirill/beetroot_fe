const project_folder = "dist";
const source_folder = "src";
const path = {
    build: {
      css: project_folder + "/css/",
    },
    src: {
      css: [source_folder + "/scss/*.scss", "!" + source_folder + "/_*.scss"],
    },
    watch: {
      css: source_folder + "/scss/**/*.scss",
    },
  },

  {src, dest} = require("gulp"),
  gulp = require("gulp"),
  scss = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  group_media = require("gulp-group-css-media-queries"),
  clean_css = require("gulp-clean-css"),
  rename = require("gulp-rename");

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserList: ["last 5 versions"],
        cascade: true
      })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css))
}

function watchFiles(params) {
  gulp.watch([path.watch.css], css);
}

let build = gulp.series(gulp.parallel(css));
let watch = gulp.parallel(build, watchFiles);

exports.css = css;
exports.default = watch;