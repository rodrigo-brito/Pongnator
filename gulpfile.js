// Define gulp before we start
var gulp = require('gulp');

// Define Sass and the autoprefixer
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var stripCssComments = require('gulp-strip-css-comments');
var connect = require( 'gulp-connect' );
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

// This is an object which defines paths for the styles.
// Can add paths for javascript or images for example
// The folder, files to look for and destination are all required for sass
var paths = {
	all : './**/*.html',
    root: './',
    styles: {
        src: './assets/sass',
        files: './assets/sass/**/*.scss',
        dest: './assets/css'
    },
    scripts: {
        src: './assets/js',
        files: ['./assets/js/lib/*.js', './assets/js/main.js'],
    }

}

/**
 * Exibe os erros de execução de forma minificada em linha única
 */
var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
}

/**
 * Compila e minifica o CSS
 */
gulp.task('sass', function (){
    gulp.src(paths.styles.files)
    .pipe(plumber(displayError))
    .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: 'map',
        includePaths : [paths.styles.src]
    }))
    .pipe(prefix(
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))
    .pipe( stripCssComments({
        preserve: false
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  gulp.src( paths.scripts.files )
    .pipe( plumber(displayError) )
    .pipe( uglify() )
    .pipe( concat('main.min.js') )
    .pipe( gulp.dest( paths.scripts.src ) )
    .pipe( connect.reload() )
});

/**
 * Monitora a mudança de arquivos estáticos
 */
gulp.task( 'files', function() {
	gulp.src( paths.all ).pipe( connect.reload() );
});

gulp.task( 'watch', function() {
	gulp.watch( paths.all, [ 'files' ]);
    gulp.watch( paths.scripts.files , ['scripts'] );
    gulp.watch( paths.styles.files, ['sass'])
    // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    .on('change', function(evt) {
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });
});

gulp.task( 'connect', function() {
	connect.server({
		livereload: true,
		root: paths.root,
        port: 8181,
	});
});

gulp.task('default', ['sass', 'scripts', 'connect', 'watch']);
gulp.task('lr', ['connect']);
