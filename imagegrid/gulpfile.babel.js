import gulp from 'gulp';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import fs from 'fs';

import Unsplash from 'unsplash-js';

const sassSource = './src/scss/**/*.scss';
const sassOutput = './dist/css';

const jsSource = './src/js/index.js';
const jsOutput = './dist/js/index.js';

const htmlSource = "./dist/index.html";

const sassOpts = { outputStyle: 'compressed', errLogToConsole: true }; // "let" and "const"!!
 
 gulp.task('sass', () => { 
   gulp.src(sassSource)
    .pipe(sass(sassOpts))
    .pipe(gulp.dest(sassOutput));
 });


 gulp.task('jsx', () => {
  browserify(jsSource)
    .transform('babelify', {presets: ["es2015"]})
    .bundle()
    .pipe(fs.createWriteStream(jsOutput))
    ;
});

 
 
 gulp.task('default', ['sass','jsx'], () => { 

   browserSync.init({
		server: './dist',
		browser: "google chrome"
	})

   gulp.watch(sassSource, ['sass'])
   gulp.watch(htmlSource).on('change', browserSync.reload);
    gulp.watch(sassSource).on('change', browserSync.reload);
   gulp.watch(jsSource, ['jsx'])
    .on('change', (e) => {  
      console.log(`File ${e.path} was ${e.type}, running Sass task...`); // Template strings and interpolation!!
    });
 });