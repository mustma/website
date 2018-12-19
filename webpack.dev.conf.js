const webpack = require('webpack');//webpack
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//抽离css样式
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const utils = require('./config/utils');

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig,{
    //入口
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        path.join(__dirname, '/src/app')
    ],
    module: {
        rules: utils.styleLoaders({
            sourceMap: true,
            usePostCSS: true
        })
    },
    //Map方式
    devtool: 'eval-source-map',
    //插件
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/vendor-manifest.json')
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            title: "code boy",
            hash: true,
            baseUrl: '/',
            template: __dirname + '/src/index_tpl.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = devWebpackConfig