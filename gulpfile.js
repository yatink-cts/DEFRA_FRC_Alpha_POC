const { src, dest, series, watch } = require('gulp')
// const deleteAsync = require('del')
// import {deleteAsync} from 'del'
const fsPromises = require('fs')
const njk = require('gulp-nunjucks-render')
const beautify = require('gulp-beautify')

async function clean() {
    await fsPromises.rm('dist', 
        { recursive: true, force: true }, 
        (error) => 
            { //Do nothing
            })
}

function html() {
    return src('app/**/*.+(html|njk)')
        .pipe(
            njk({
                path: ['app/**'],
            })
        )
        .pipe(beautify.html({ indent_size: 4, preserve_newlines: false }))
        .pipe(dest('dist'))
}

function watchFiles() {
    watch('app/**/*', html)
}

exports.build = series(clean, html)
exports.default = series(clean, html, watchFiles)