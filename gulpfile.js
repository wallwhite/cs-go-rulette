'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
  //  cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
    var uncss = require('gulp-uncss');
    var plumber = require('gulp-plumber');
    var notify = require( 'gulp-notify' );
    var csscomb = require('gulp-csscomb');
    var gcmq = require('gulp-group-css-media-queries');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/**/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/sass/main.scss',
        script: 'src/js/script.js',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*',
        css: 'src/css/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        script: 'src/js/script.js',
        style: 'src/sass/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        css: 'src/css/**/*.css'
    },
    clean: './build'
};
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})) //И перезагрузим сервер
});
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(plumber())
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass().on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "Sass Error!"
      } ) )) //Скомпилируем
        .pipe(gcmq())
        .pipe(csscomb())
     //   .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}))
        .pipe( notify( 'SASS - хорошая работа!' ) );;
});
gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
       /* .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))*/
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('css:build', function() {
    gulp.src(path.src.css)
        .pipe(gulp.dest(path.build.css))
});
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'css:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });

    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});
gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('contact', function () {
    return gulp.src(path.src.style)
        .pipe(sass())
        .pipe(uncss({
            html: ['src/contacts.html']
        }))
        .pipe(gulp.dest('./out'));
});


/* очистить папку билд */
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});
gulp.task('default', ['build', 'webserver', 'watch']);