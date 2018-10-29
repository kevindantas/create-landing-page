const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 *
 * @param {String} folderPath
 * @return {Array<HtmlWebpackPlugin>}
 */
module.exports = function getHtmlPages(folderPath, options = {}) {
  const {
    minify,
  } = options;

  const files = fs.readdirSync(folderPath);
  const htmlFiles = files.filter(file => file.match(/\.html$/));
  return htmlFiles.map(filename =>
    new HtmlWebpackPlugin({
      inject: true,
      template: `${folderPath}/${filename}`,
      filename,
      minify,
    }));
};
