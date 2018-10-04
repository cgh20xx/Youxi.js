const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'Youxi.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Youxi',
    // libraryTarget: 'var'
  },
  devServer: {
    contentBase: './',
    hot: true
  },
  mode: 'development'
};
