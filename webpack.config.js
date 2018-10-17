const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'Youxi.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Youxi',
    // libraryTarget: 'var'
  },
  devServer: {
    // contentBase: './',
    contentBase: path.resolve(__dirname, "demo/basic/"),
    publicPath: '/dist/',
    // hot: true,
    watchContentBase: true,
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
};
