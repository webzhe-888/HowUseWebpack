/**
 * Created by zhangyg on 2017/10/13.
 */
var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
module.exports ={
    //entry: './src/script/main.js',//打包入口从哪里开始
    //entry:['./src/script/main.js','./src/script/a.js'],
    entry:{
        main:'./src/script/main.js',
        a:'./src/script/a.js',
        b:'./src/script/b.js',
        c:'./src/script/c.js'
    },
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename:'js/[name]-[chunkhash].js',
        publicPath:'http://csd.com/'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:"index.html",
            filename:'a.html',
            inject:false,
            title:"this is a",
            chunks:['main','a']
        }),
        new htmlWebpackPlugin({
            template:"index.html",
            filename:'b.html',
            inject:false,
            title:"this is b",
            chunks:['main','b']
        }),
        new htmlWebpackPlugin({
            template:"index.html",
            filename:'c.html',
            inject:false,
            title:"this is c",
            chunks:['main','c']
        })
    ]
};