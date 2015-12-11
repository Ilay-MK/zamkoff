'use strict';

var
    browserSync     = require('browser-sync'),
    googlecdn       = require('gulp-google-cdn'),
    imagemin        = require('gulp-imagemin'),
    gulp            = require('gulp'),
    gulpif          = require('gulp-if'),
    notify          = require('gulp-notify'),
    minifyCss       = require('gulp-minify-css'),
    minifyHTML      = require('gulp-minify-html'),
    pngquant        = require('imagemin-pngquant'),
    prefixer        = require('gulp-autoprefixer'),
    reload          = browserSync.reload,
    rigger          = require('gulp-rigger'),
    rimraf          = require('rimraf'),
    sass            = require('gulp-sass'),
    sftp            = require('gulp-sftp'),
    sourcemaps      = require('gulp-sourcemaps'),
    uglify          = require('gulp-uglify'),
    uncss           = require('gulp-uncss'),
    useref          = require('gulp-useref'),
    watch           = require('gulp-watch'),
    wiredep         = require('wiredep').stream;

/* ------------------- */
var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        img_prettyPhoto: 'build/img/prettyPhoto',
        fonts: 'build/fonts/',
        files: 'build/files/',
        libs: 'build/libs/'
    },
    src: {
        html: 'src/*.html',
        htmlBase: './src/template/base/*.html',
        htmlToBase: './src/template/base/',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        img_prettyPhoto: './bower_components/jquery-prettyPhoto/images/prettyPhoto/**/*.*',
        fonts: 'src/fonts/**/*.*',
        files: 'src/files/**/*.*',
        libs: 'src/libs/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        img_prettyPhoto: './bower_components/jquery-prettyPhoto/images/prettyPhoto/**/*.*',
        fonts: 'src/fonts/**/*.*',
        files: 'src/files/**/*.*',
        libs: 'src/libs/**/*.*'
    },
    fontAwesomeDir: './bower_components/font-awesome/',
    fontAwesomeCSS: './bower_components/font-awesome/css/font-awesome.css',
    fontAwesomeCSSmin: './bower_components/font-awesome/css/font-awesome.min.css',
    fontAwesomeSCSS: './bower_components/font-awesome/scss/font-awesome.scss',
    fontAwesomeFonts: './bower_components/font-awesome/fonts/**/*.*',
    clean: './build',
    dist: './build/**/*',
    bowerComponents: './bower_components',
    bowerConfig: './bower.json'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "zamkoff"
};

/* ------------------- */

var crossBrousersCompatibility = {
    brousers: [
        'last 20 versions',
        '> 0%',
        'ie 6',
        'ie 7',
        'ie 8',
        'ie 9',
        'Firefox ESR',
        'Opera 12.1'
    ],
    cascade: false
};

/* ------------------- */

var hosting = {
    host: 'vh51.hoster.by',
    user: 'zaeboxby',
    pass: 'ea7DoSie',
    remotePath: './lp/ilya/orders/zamkoff'
};


/* ------------------------------------------- */

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('build:html', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}))
        .pipe(notify('build:html Done!'));
});

gulp.task('build:js', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}))
        .pipe(notify('build:js Done!'));
});

gulp.task('build:style', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                'src/style/'
            ],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: crossBrousersCompatibility.brousers,
            cascade: crossBrousersCompatibility.cascade
        }))
        .pipe(minifyCss())
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}))
        .pipe(notify('build:style Done!'));
});

gulp.task('build:image_prettyPhoto', function () {
    gulp.src(path.src.img_prettyPhoto)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img_prettyPhoto))
        .pipe(reload({stream: true}))
        .pipe(notify('build:image_prettyPhoto Done!'));
});

gulp.task('build:image', ['build:image_prettyPhoto'], function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}))
        .pipe(notify('build:image Done!'));
});

gulp.task('build:fonts-awesome', function () {
    gulp.src(path.fontAwesomeFonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(notify('build:fonts-awesome Done!'));
});

gulp.task('build:fonts', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(notify('build:fonts Done!'));
});

gulp.task('build:files', function () {
    gulp.src(path.src.files)
        .pipe(gulp.dest(path.build.files))
        .pipe(notify('build:files Done!'));
});

gulp.task('build:libs', function () {
    gulp.src(path.src.libs)
        .pipe(gulp.dest(path.build.libs))
        .pipe(notify('build:libs Done!'));
});

gulp.task('build', [
    'build:html',
    'build:js',
    'build:style',
    'build:fonts',
    'build:files',
    'build:libs',
    'build:image'
]);


gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('build:html');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('build:style');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('build:js');
    });
    watch([path.watch.img_prettyPhoto], function (event, cb) {
        gulp.start('build:image_prettyPhoto');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('build:image');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('build:fonts');
    });
    watch([path.watch.files], function (event, cb) {
        gulp.start('build:files');
    });
    watch([path.watch.libs], function (event, cb) {
        gulp.start('build:libs');
    });
});
// Watch Wiredep
gulp.task('watch-native', function () {
    gulp.watch(path.watch.html, ['build:html']);
    gulp.watch(path.watch.style, ['build:style']);
    gulp.watch(path.build.js, ['build:js']);
    gulp.watch(path.watch.img, ['build:image']);
    gulp.watch(path.watch.fonts, ['build:fonts']);
    gulp.watch(path.watch.files, ['build:files']);
    gulp.watch(path.watch.libs, ['build:libs']);
});


gulp.task('default', ['build', 'webserver', 'watch']);


/* ------------------------------------------------------- */

// SFTP
gulp.task('sftp', function () {
    return gulp.src(path.dist)
        .pipe(sftp({
            host: hosting.host,
            user: hosting.user,
            pass: hosting.pass,
            remotePath: hosting.remotePath
        }))
        .pipe(notify('sftp Done!'));
});

// Deploy
gulp.task('deploy', ['sftp']);

/* ------------------------------------------------------- */

/* ------------------------------------------- */

// Wiredep
gulp.task('wiredep', function () {
    gulp.src(path.src.htmlBase)
        .pipe(wiredep({
            directory: path.bowerComponents
        }))
        .pipe(gulp.dest(path.src.htmlToBase))
        .pipe(reload({stream: true}))
        .pipe(notify('Wiredep Done!'));
});

// Watch Wiredep
gulp.task('watch:wiredep', function () {
    gulp.watch(path.bowerConfig, ['wiredep']);
});

// Google CDN
gulp.task('cdn', function () {
    return gulp.src(path.src.htmlBase)
        .pipe(googlecdn(require(path.bowerConfig)))
        .pipe(gulp.dest(path.src.htmlToBase))
        .pipe(reload({stream: true}))
        .pipe(notify('GoogleCDN Done!'));
});

// Watch Google CDN
gulp.task('watch:cdn', function () {
    gulp.watch(path.bowerConfig, ['cdn']);
});


/* ------------------------------------------------------- */

// Useref {useref} concat *.js/*.css -> vendor/main
// Подправить пути .................... !!!!!!!!!!!!!!!!
gulp.task('useref', function () {
    var assets = useref.assets();

    return gulp.src(path.build.searchHTML)
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({
            compatibility: 'ie8'
        })))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(path.dirBuild))
        .pipe(reload({stream: true}))
        .pipe(notify('Useref Done!'));
});


/* ------------------------------------------------------- */

// Uncss
// Подправить пути .................... !!!!!!!!!!!!!!!!
gulp.task('uncss', function () {
    return gulp.src(path.build.searchCSS)
        .pipe(uncss({
            html: [path.build.searchHTML]
        }))
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(notify('UnCSS Done!'));
});

/* ------------------------------------------------------- */
