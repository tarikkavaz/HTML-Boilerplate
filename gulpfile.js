var gulp         = require('gulp');
var concat       = require('gulp-concat');
var uglify       = require('gulp-terser');
var autoprefixer = require('autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var rsync        = require('gulp-rsync');

var processors = [
    autoprefixer(  {
        // cascade: false,
        grid: true
    })
];

// Compile all .scss into src/css/global.css
gulp.task('sass', function() {
    return gulp.src([
            'node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss',
            'node_modules/jquery-fancybox/source/scss/jquery.fancybox.scss',
            'node_modules/retinajs/dist/_retina.scss',
            'node_modules/aos/src/sass/aos.scss',
            'node_modules/normalize.css/normalize.css',
            'custom/styles/*.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: require("node-normalize-scss").includePaths}))
        .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
        .pipe(concat('global.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./custom/styles/temp"))
        .pipe(browserSync.stream());
});

gulp.task('autoprefixer', function() {
    return gulp.src('./custom/styles/temp/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/assets/css/'))
});

// Compile all javascript files into src/js/main.js
gulp.task('js', function() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery-fancybox/source/js/jquery.fancybox.js',
            'node_modules/retinajs/dist/retina.min.js',
            'node_modules/aos/dist/aos.js',
            'custom/scripts/scripts.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest("src/assets/js"))
        .pipe(browserSync.stream());
});

// Font Awesome Webfonts
gulp.task('icons', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('src/assets/webfonts/'));
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', 'autoprefixer', function() {

    browserSync.init({
        open: false,
        server: "./src"  
    });

    gulp.watch(['custom/styles/**/*.scss'], gulp.series(['sass'])).on('change', browserSync.reload);
    gulp.watch(['custom/scripts**/*.js'], gulp.series(['js'])).on('change', browserSync.reload);
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
}));

// gulp.task('default', gulp.parallel('js','icons','serve'));
gulp.task('default', gulp.parallel('js','serve'));

gulp.task('deploy', function() {
    return gulp.src('src/**')
        .pipe(rsync({
            root: 'src/',
            username: 'deployer',
            hostname: '111.22.3.44',
            destination: '/home/deployer/sites/test.com'
        }));
});