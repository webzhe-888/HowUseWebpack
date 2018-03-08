/**
 * Created by zhangyg on 2017/10/16.
 */
var path = require("path");
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output:{
        path: __dirname +"/dist",
        filename: 'js/[name].bundle.js'
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',
            template: 'index.html',
            inject:'body'
        })
    ],
    module:{
        rules:[//loader中的每一项都是一个规则
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude: path.resolve(__dirname,'/node_modules/'),
                include:__dirname +'/src/'
            },
            {
                test:/\.css$/,
                //loader是从右往左执行，如果是数组的话就是从最后一个开始执行
                //loader: 'style-loader!css-loader!postcss-loader'//css-loader 是吧css引入到js中，style-loader是吧解析好的插入到HTML中
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 //import文件的数量
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import'),
                                require('autoprefixer')({ //自动添加css前缀
                                    browsers: ['last 5 versions']//css浏览器兼容
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 //import文件的数量
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({ //自动添加css前缀
                                    browsers: ['last 5 versions']//css浏览器兼容
                                })
                            ]
                        }
                    },{
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
}