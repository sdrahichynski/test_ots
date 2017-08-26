const babel   = require('gulp-babel'),
			concat  = require('gulp-concat'),
			connect = require('browser-sync'),
			gulp    = require('gulp'),
			sass    = require('gulp-sass'),
			sourcemaps = require('gulp-sourcemaps');


const path = {
	'src'   : {
		'html': './src/*.html',
		'js' : './src/js/**/*.js',
		'scss': './src/scss/*.scss',
		'public': './src/public/**/*.*'
	},

	'build' : {
		'css' : './build/css/',
		'html': './build/',
		'js'  : './build/js/',
		'public': './build/public/'
	},

	'watch' : {
		'html': './src/*.html',
		'js'  : './src/js/**/*.js',
		'scss': './src/scss/**/*.scss',
		'public': './src/public/**/*.*'
	}
};


gulp.task('connect', () => {
	connect({
		host: 'localhost',
		port: 9000,
		server: {
			baseDir: './build',
		}
	});
});


gulp.task('html', () => {
	return gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
		.pipe(connect.reload({stream: true}));
});


gulp.task('js', () => {
	return gulp.src([path.src.js])
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('all.js', {newLine: ';'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.js))
		.pipe(connect.reload({stream: true}));
});



gulp.task('style', () => {
	return gulp.src([path.src.scss])
			.pipe(sourcemaps.init())
			.pipe(sass()).on('error', sass.logError)
			.pipe(concat('all.css'))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(path.build.css))
			.pipe(connect.reload({stream: true}));
});

gulp.task('public', () => {
	return gulp.src([path.src.public])
			.pipe(gulp.dest(path.build.public))
			.pipe(connect.reload({stream: true}));
});


gulp.task('watch', () => {
	gulp.watch(path.watch.html, ['html']);
	gulp.watch(path.watch.js, ['js']);
	gulp.watch(path.watch.scss, ['style']);
	gulp.watch(path.watch.public, ['public']);
});


gulp.task('default', ['watch', 'connect', 'html', 'js', 'style', 'public']);