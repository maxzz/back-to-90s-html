import gulp from 'gulp';
import postcss from 'gulp-postcss';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import sync from 'browser-sync';

export const html = () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

export const styles = () => {
    return gulp.src('src/styles/index.css')
        .pipe(postcss([
            autoprefixer,
            csso,
        ]))
        //.pipe(replace(/\.\.\//g, ''))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

export const copy = () => {
    return gulp.src([
            'src/images/**/*',
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream({
            once: true
        }));
};
/*
export const paths = () => {
    return gulp.src('dist/*.html')
        .pipe(replace(
            /(<link rel="stylesheet" href=")styles\/(index.css">)/, '$1$2'
        ))
        .pipe(replace(
            /(<script src=")scripts\/(index.js">)/, '$1$2'
        ))
        .pipe(gulp.dest('dist'));
};
*/

export const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });
};

export const watch = () => {
    gulp.watch('src/*.html', gulp.series(html, paths));
    gulp.watch('src/styles/**/*.css', gulp.series(styles));
    gulp.watch([
        'src/images/**/*',
    ], gulp.series(copy));
};

// Default

export default gulp.series(
    gulp.parallel(
        html,
        styles,
        copy,
    ),
    paths,
    gulp.parallel(
        watch,
        server,
    ),
);
