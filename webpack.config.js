const path = require('path'); //output Node.js核心模块，用于操作文件路径
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app.jsx', //入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),//通过webpack打包的文件最后要放的位置，第一个参数是当前目录
        publicPath: '/dist/', //
        filename: 'js/app.js'
    },
    module: {//babel
        rules: [
            //react的处理
            {
                test: /\.m?jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'] //简写就可以了,自动根据环境来打包
                    }
                }
            },
            //css文件的处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            //sass文件的处理
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            //加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //独立css文件
        new ExtractTextPlugin('css/[name].css'),//name变量来指定css
        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',//公共模块
            filename: 'js/base.js'
        })
    ],
    devServer: {
        port : 8081
    },
};