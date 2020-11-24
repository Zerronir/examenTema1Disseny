const { watch, src, dest } = require('gulp');
const CompSass = require('gulp-sass');
const cleanJS = require('gulp-uglify');
const htmlValidator = require('gulp-w3c-html-validator');
const gulpBabel = require('gulp-babel');
const sort = require('sort-stream');
const concat = require('gulp-concat');

// Ex1 - Tasca compilaSCSS: Compila el SASS que hi ha dins libs/bootstrap-4.5.3/scss i
// desa'l dins "assets/css/bootstrap". Fes que la tasca ja compili el CSS i minimitzi
// directament el codi. (0,25 punts)

function compilarSass(){
    return src('./libs/bootstrap-4.5.3/scss/**/*.scss')
        .pipe(CompSass())
        .pipe(dest('dist/css/bootstrap'));
}

// Ex2 - Tasca watchSCSS: Crea un watcher que compili el SASS si hi ha un canvi a
//       qualsevol arxiu SASS de tot el projecte, no només de la carpeta scss, per si en un
//       futur afegim SASS en alguna altra carpeta. (0,25 punts)

function watcherSass() {
    watch('./**/*.scss', compilarSass);
}

// Ex3 - Tasca minifyJS: Minimitza el JS de la carpeta "assets/js" (0,25 punts)
function minifyJS(){
    return src('./assets/js/*.js')
        .pipe(cleanJS())
        .pipe(dest('dist/js/'));
}

// Ex4 - Tasca mergeJS: Unifica en un sol arxiu els arxius JS de la carpeta "assets/js" (0,25 punts)
function mergeJS(){
    return src(['./assets/js/chart.js', './assets/js/selector.js', './assets/js/vars.js'])
        .pipe(sort())
        .pipe(minifyJS())
        .pipe(concat('merged.js'))
        .pipe(dest("dist/js/"));
}

// Ex5 - Tasca validHTML: Cerca un plugin de Gulp que validi el codi HTML (0,5 punts)
function validateHTML(){
    // He usado el validador de w3c para gulp
    return src("./index.html")
        .pipe(htmlValidator())
        .pipe(htmlValidator.reporter())
        .pipe(dest("dist/"));
}

// Ex6 - Tasca babel: passa el codi JS de la tasca 4 amb el babel (0,25 punts)
// Para que funcionara el babel he tenido que añadir que sea una función asíncrona.
async function babelJS(){
    src('dist/js/merged.js')
        .pipe(gulpBabel({presets: ["@babel/preset-env"]}))
        .pipe(concat('all-babel.js'))
        .pipe(dest('dist/js/'));
}



// Creamos los exports para ejecutar todas las funciones después
exports.compilarSass = compilarSass;
exports.watchForSass = watcherSass;
exports.minJS = minifyJS;
exports.juntaJS = mergeJS;
exports.validator = validateHTML;
exports.babel = babelJS;