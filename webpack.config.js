let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let NyanProgressPlugin = require('nyan-progress-webpack-plugin');
let LiveReloadPlugin = require('webpack-livereload-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HappyPack = require('happypack');

module.exports = {
    context: path.resolve(__dirname),
    cache: true,
    entry: {
        'app': ['./src/js/init']

    },
    output: {
        path: "dist",
        filename: "js/[name].js"
    },
    module: {
        rules: [{
            test: /.js$/,
            loaders: ['happypack/loader']
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    externals: {
        'jquery': '$'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry: false
        }),
        new HappyPack({
            loaders: ['babel?presets[]=es2015']
        }),
        new HtmlWebpackPlugin({
            title: 'webspring-Vue',
            template: 'src/templates/app.html'
        }),
        new LiveReloadPlugin(),
        new ExtractTextPlugin({ filename: "css/styles.css", allChunks: true }),
        new NyanProgressPlugin()
        // TMP OFF WHILE DEBUGING
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: false,
        //     mangle: false,
        //     compress: {
        //         warnings: false
        //     }
        // }),
    ]
};
