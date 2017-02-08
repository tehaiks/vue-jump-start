let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let NyanProgressPlugin = require('nyan-progress-webpack-plugin');
let LiveReloadPlugin = require('webpack-livereload-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'js/app': ['./src/js/init.js']

    },
    output: {
        path: "dist",
        filename: "[name].js"

    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.(less|css)$/,
            exclude: /\b(some\-css\-framework|whatever)\b/i,
            loader: ExtractTextPlugin.extract("style?sourceMap", "css?sourceMap!autoprefixer?browsers=last 2 version!less")
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    externals: {
        'jquery': '$',
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin,
        new HtmlWebpackPlugin({
            title: 'webspring-Vue',
            template: 'src/templates/app.html'
        }),
        new LiveReloadPlugin(),
        new ExtractTextPlugin('css/styles.css', { allChunks: true }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new NyanProgressPlugin(),
        // TMP OFF WHILE DEBUGING
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     mangle: false,
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry: false
        })
    ],
};
