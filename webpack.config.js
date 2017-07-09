const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  cache: true,
  entry: {
    app: ['./src/js/init'],
  },
  output: {
    path: path.resolve('./dist/'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('postcss-cssnext')({
              warnForDuplicates: false,
            }),
          ],
        },
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
    },
  },
  externals: {
    jquery: '$',
  },
  devServer: {
    contentBase: path.resolve('./dist/'),
    compress: true,
    port: 9000,
    host: '127.0.0.1',
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
      dry: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'webspring-Vue',
      template: 'src/templates/app.html',
      inject: true,
      cache: true,
      hash: true,
      showErrors: true,
      minify: {
        html5: true,
        removeComments: true,
        sortClassName: true,
        maxLineLength: 100,
        preserveLineBreaks: true,
        collapseWhitespace: true,
        decodeEntities: true,
      },
    }),
    new LiveReloadPlugin(),
    new ExtractTextPlugin({
      filename: 'css/styles.css',
      allChunks: true,
    }),
    new NyanProgressPlugin(),
  ],
};
