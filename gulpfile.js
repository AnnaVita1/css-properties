import fs from 'fs';
import gulp from 'gulp';
import postcss from "gulp-postcss";
import csso from "postcss-csso";
import twig  from 'gulp-twig';
import htmlmin from 'gulp-htmlmin';
import browser from 'browser-sync';
import {deleteAsync} from 'del';

const properties = JSON.parse(fs.readFileSync('./site/data/properties.json'));
const publicPath = './build';

// Создание HTML-страниц
const pages = () => {
  return gulp.src('./site/index.twig')
    .pipe(twig({
      data: {
        data: properties
      }
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(publicPath));
}

// Создание стилей
const styles = () => {
  return gulp.src('./site/style.css')
    .pipe(postcss([
      csso()
    ]))
    .pipe(gulp.dest(publicPath))
    .pipe(browser.stream());
}

// Копирование всех фавиконок
const copyFavicons = () => {
  return gulp.src(['./site/favicon.ico', './site/favicons/*', './site/manifest.webmanifest'],{
    base: 'site'
  })
    .pipe(gulp.dest(publicPath));
}


// Удаление папки build
const clean = () => deleteAsync(publicPath);

// Сервер
const server = (done) => {
  browser.init({
    server: {
      baseDir: publicPath
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Перезагрузка сервера
const reload = (done) => {
  browser.reload();
  done();
}

// Слежение за файлами
const watcher = () => {
  gulp.watch('./site/index.twig', gulp.series(pages, reload));
  gulp.watch('./site/style.css', gulp.series(styles, pages, reload));
}

// Таски
export const build = gulp.series(
  clean,
  copyFavicons,
  styles,
  pages
);

export default gulp.series(
  gulp.parallel(build),
  server,
  watcher
)
