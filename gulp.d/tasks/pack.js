'use strict'

const ospath = require('path')
const vfs = require('vinyl-fs')
const zip = (() => {
  try {
    return require('@vscode/gulp-vinyl-zip')
  } catch {
    return require('gulp-vinyl-zip')
  }
})()

module.exports = (src, dest, bundleName, onFinish) => () =>
  vfs
     // encoding: false == avoid any transcoding, and effectively just pass around raw binary data.
     // if omitted, image files such as .png will be transcoded and become useless
    .src('**/*', { base: src, cwd: src, dot: true, encoding: false })
    .pipe(zip.dest(ospath.join(dest, `${bundleName}-bundle.zip`)))
    .on('finish', () => onFinish && onFinish(ospath.resolve(dest, `${bundleName}-bundle.zip`)))
