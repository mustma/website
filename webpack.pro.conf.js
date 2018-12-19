const webpack = require('webpack');//webpack
const baseWebpackConfig = require('./webpack.base.conf');
const ImageminPlugin = require('imagemin-webpack-plugin').default;//图片压缩
const HtmlWebpackPlugin = require('html-webpack-plugin');//HTML
const CleanWebpackPlugin = require('clean-webpack-plugin');//清除
const ExtractTextPlugin = require('extract-text-webpack-plugin');//抽离css样式
const utils = require('./config/utils');
const config = require('./config');

const merge = require('webpack-merge');

if (config.productionGzip) { //配置文件开启了gzip压缩
    //引入压缩文件的组件,该插件会对生成的文件进行压缩，生成一个.gz文件
    let CompressionWebpackPlugin = require('compression-webpack-plugin');
    baseWebpackConfig.plugins.push(
        new CompressionWebpackPlugin({
        asset: '[path].gz[query]', //目标文件名
        algorithm: 'gzip', //使用gzip压缩
        test: new RegExp( //满足正则表达式的文件会被压缩
            '\\.(' +
            config.productionGzipExtensions.join('|') +
            ')$'
        ),
        threshold: 10240, //资源文件大于10240B=10kB时会被压缩
        minRatio: 0.8 //最小压缩比达到0.8时才会被压缩
        })
    )
}

const proWebpackConfig = merge(baseWebpackConfig,{
    cache: true,
    devtool: '#source-map',
    module: {
        rules: utils.styleLoaders({
            sourceMap: false,
            extract: true,
            usePostCSS: true
        })
    },
    //输出
    output: {
        path: __dirname + '/build',
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkhash:5].chunk.js'
    },
    //插件
    plugins: [
        new CleanWebpackPlugin(['js', 'fonts', 'images', 'css', 'index.html'], {
            root: __dirname + '/build',
            verbose: true,
            dry: false,
            exclude: ['vendor.dll.js','vendor.dll.js.gz']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false
            }
        }),
        new ExtractTextPlugin("css/[name].css"),
        new ImageminPlugin({
            test: 'images/**',
            optipng: {
                optimizationLevel: 7
            }
        }),
        new HtmlWebpackPlugin({
            title: "code body",
            hash: true,
            baseUrl: '/',
            template: __dirname + '/src/index_tpl.html'
        }),
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
})



module.exports = proWebpackConfig