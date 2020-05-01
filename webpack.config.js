const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  // webpack will take the files from ./src/index
  entry: './src/index',
  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js'],
  },
  module: {
    rules: [
      // we use babel-loader to load our jsx and tsx files
      { test: /\.(ts|js)x?$/, loader: 'babel-loader?cacheDirectory', exclude: /node_modules/ },
      // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
  ]
},
optimization: {
  usedExports: true,
  minimize: true,
  splitChunks: {
    cacheGroups: {
      commmons:{
        test: /[\\/]node_modules[\\/]/,
				name: 'vendors',
				chunks: 'all',
      }
    }
  }
},
devServer: {
  historyApiFallback: true,
},
plugins: [
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico'
  }),
  new ForkTsCheckerWebpackPlugin(),
  new UglifyJSPlugin({
    cache: true,
    parallel: true
  }),
  new BrotliPlugin({
    asset: '[path].br[query]',
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8
  }),
 ]
};