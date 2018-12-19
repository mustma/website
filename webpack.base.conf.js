module.exports = {
    //入口
    entry: {
        index: ['babel-polyfill', __dirname + '/src/app']
    },
    //输出
    output: {
        path: __dirname + '/build',
        filename: 'js/[name].js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    //补充后缀名
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss']
    },
    //dev 服务
    devServer: {
        disableHostCheck: true
    },
    //模块
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader?cacheDirectory',
                    options: {
                        presets: ["es2015", "stage-0", "react"],
                        plugins: ["transform-decorators-legacy"]
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[hash:7].[ext]'
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    plugins: []
};