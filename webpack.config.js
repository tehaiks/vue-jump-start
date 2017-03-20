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
        path: path.resolve("./dist/"),
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
            use: [
                'style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader'
            ]
        }, {
            test: /\.less$/,
            use: [
                'style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader',
                'less-loader'
            ]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postcss: [require('postcss-cssnext')({
                    warnForDuplicates: false
                })]
            }
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
    devServer: {
        contentBase: path.resolve("./dist/"),
        compress: true,
        port: 9000,
        host: '127.0.0.1',
        hot: true,
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            loaders: ['babel?presets[]=es2015']
        }),
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
                decodeEntities: true
            },
        }),
        new LiveReloadPlugin(),
        new ExtractTextPlugin({
            filename: "css/styles.css",
            allChunks: true
        }),
        new NyanProgressPlugin(),

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