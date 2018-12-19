const webpack = require('webpack');
const config = require('./config');
const vendors = [
    'react',
    'react-dom',
    'react-router-dom',
    'mobx',
    'mobx-react',
    'axios'
];
let plugins = [
    new webpack.DllPlugin({
        path: __dirname + '/build/[name]-manifest.json',
        name: '[name]_library',
        context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: false
        }
    })
];
if (config.productionGzip) { //配置文件开启了gzip压缩
    //引入压缩文件的组件,该插件会对生成的文件进行压缩，生成一个.gz文件
    let CompressionWebpackPlugin = require('compression-webpack-plugin'); 

    plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]', //目标文件名
            algorithm: 'gzip', //使用gzip压缩
            threshold: 10240, //资源文件大于10240B=10kB时会被压缩
            minRatio: 0.8 //最小压缩比达到0.8时才会被压缩
        })
    )
}
module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: __dirname + '/build/js',
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: plugins
};