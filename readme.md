### webpack目标：
1. 会切分依赖树，会把依赖树切分到不同的代码块中， 按序加载这些依赖；(与懒加载挺像)
2. 为了保持初始化的时间更少；
3. 任何静态的资源都可以被视为一个模块，在项目中引用；
4. 整合第三方类库并且把第三方的类库也当做它的模块在项目中引用；
5. 可自定义，适合大型项目
    
### 与其它打包工具不同处：
1. 代码分割
2. loader
3. 模块热更新（开发和调试效率）
### webpack命令
1. npm install -g webpack //全局安装webpack。
2. npm install webpack --save-dev //下载安装项目开发所需模块依赖。
3. webpack xxx.js xxx.bundle.js //将xxx.js打包为xxx.bundle.js。

### webpack命令的一些参数
1. --watch  实时更新，自动打包 
2. --dispaly-modules  展示用了哪些模块
3. --display-reasons  使用模块的原因
4. --module-bind 绑定模块 
`--module-bind 'css=style-loader\!css-loader' //绑定运行模块css-loader、style-loader，因为在bash中！有着特殊含义，所以这里需要\来转义。`
5. --progress 打包时显示进程时间。

### webstorm中使用webpack的方式
1. 在项目根目录下创建文件名为webpack.config.js文件（因为默认名为此），然后在terminal中输入webpack即可
2. 在项目根目录下创建自定义文件名的配置文件。例如：webpack.dev.config.js文件,需用
`webpack -config webpack.dev.config.js`
3. 自定义名的配置文件，例如webpack.mine.config.js，然后在package.json中的script中添加
`"webpack": "webpack --config webpack.mine.config.js --progress --display-modules -colors"`
然后    
`npm run webpack`

### webpack配置文件中的entry的三种输入方式
1. string 


    entry:{
        main: "./src/script/main.js"
    }
2. array 适用于平行的不互相依赖的文件打包在一起


    entry:{
        main:['./src/script/main.js','./src/script/a.js']
    }
3. object, 适用情况：多页面应用程序。这里要和output里的[name]占位符配合使用，威力才能最大。
如果你要打包成多个js文件，那么entry对象里的key叫做chunk就是文件名，里面的值就是需要打包的文件里面包含的文件。
   
   
    entry:{
        main:'./src/script/main.js',
        a:'./src/script/a.js'
    },
### webpack配置文件中的output
1. 占位符有3种：[name]、[hash]、[chunkhash]
2. output的filename
    1. hash: 这次打包的hash;每次终端运行webpack命令，都会生成一段信息，这段信息的第一行就有一个hash
    2. chunkhash:每一个chunk自己的hash
3. output的path，//这里配置的是输出的文件地址   

### 在打包的HTML中插入js
> html中引入script，如果是hash或者chunkhash生成的js，则src每次都要修改，避免修改的方法就是用webpack的插件,具体步骤为

1. 安装webpack插件：终端项目目录输入：`npm install html-webpack-plugin --save-dev`
2. 配置文件中建立对插件的引用
    
    
    //webpack.config.js中
    //首先引用插件
    var htmlWebpackPlugin=require('htmll-webpack-plugin');
    //其次以index.html为模板设置plugins
    plugins:[
        new htmlWebpackPlugin()//初始化插件,这只是会让webpack自动生成一个index.html，且自动把js代码插入到html当中
    ]
    /* 这里说的是webpack生成的index.html，不是你自定义的index.html，要想让生成的index.html是自定义的，需要详细定义，如下*/
    plugins:[
        new htmlWebpackPlugin({
            template: ‘index.html’,//这里的index.html就是根目录下的index.html文件，是你自己写的文件。
            filename: ‘index-[hash].html’,//这里指定的是生成的文件的名字
             inject: 'body’,// 这里可以指定js文件是放在head还是body标签里面
        })// 初始化插件
    ]
    //然后webpack使用插件的地址是根据配置里的context，上下文来决定的。文件生成在dist下，而不是一直在js下
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'js/[name]-[chunkhash].js'//js文件生成到js文件夹中
    },
    
### 静态HTML模板如何添加到打包后的index.html
> 利用webpack的loader: html-loader,
1. 在源文件中写好要加入的模板文件，比如：layer.ejs或者layer.tpl
2. 在源文件中写一个js，引入模板文件、样式，将有样式的模板文件作为对象导出
3. 在app.js（核心逻辑文件）中引入源文件中的js及公共样式库，利用innerHTML将模板加入到index.html
4. 在webpack.config.js中添加配置：
        
        
        module:{
            rules:[
                {
                    test:/\.ejs/,//或者是tpl结尾的文件
                    loader:'ejs-loader',//ejs模板利用ejs-loader,此loader主要针对结尾是ejs和tpl的文件
                },
            ]
        }
5. 执行npm run webpack 执行打包，使用浏览器打开打包文件夹下的index.html,即可看到打包后的结果

### webpack打包css
> 主要利用css-loader（处理css文件）和style-loader（将css-loader处理后的文件作为样式标签\<style\>插入到html文件中）
    
### webpack处理css文件中的@import
> 如果css文件中出现@import，则有两种处理方式，一种是将postcss文件单独写成配置文件postcss.config.js,另一种需要安装postcss-import插件
1. 将postcss文件单独写成配置文件postcss.config.js
    
    
    //webpack.config.js
    {
        test:/\.css$/,
        use:[	'style-loader',
                {
                    loader: 'css-loader',
                    options: {importLoaders: 1}
                },
                'postcss-loader'
            ]
    }
    //postcss.config.js
    module.exports = {
     plugins:[require('autoprefixer')]
    }
2. 需要安装postcss-import插件 （安装命令 npm install postcss-import）


    //webpack.config.js
    {
        test:/\.css$/,
        use:[ 'style-loader',
                {	loader: 'css-loader',
                    options: {importLoaders: 1 }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                            plugins: [
                                require('postcss-import'),
                                require('autoprefixer')
                            ]
                    }
                }
            ]
    }

### webpack如何编译sass/less 
> 主要利用less-loader和sass-loader（可能会让你安装node-loader）
1. less-loader 的配置 `style-lander!css-loader!postcss-loader!less-loader’`
2. sass-loader 的配置 


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
    
### webpack中关于图片的出现主要有三种情况：
1. 在根部的HTML文件中，即最顶层的HTML，以img标签出现；
2. 在css中，作为背景需要的图片;
3. 在源文件中的的模板文件，即HTML文件或layer.tpl文件中，以img标签出现；
 
#### 引用图片的绝对路径或相对路径
1. 在HTML中引用图片时，使用绝对路径是完全ok的;
2. 但是在源文件中的模板文件中使用相对路径，就会打包之后路径加载不进去，出现打包后的图片找不到的问题
解决办法是使用  用${require("../../assets/aaa.jpg" )}替换'../../assets/aaa.jpg'

### webpack中打包图片
> 主要利用file-loader或者url-loader来处理图片
1. url-loader  url-loader和file-loader相似，但是url-loader可以指定limit参数。
    1. 安装url-loader: 终端目标文件输入：npm install url-loader --save-dev
    2. url-loader可以处理文件或者图片，当文件/图片大小大于指定的limit,就会丢给filel-loader去处理，
    当小于设定的limit，就会转为base64编码，不再是一个url(不再是一个http请求)，图片会被打包进html,css,js

### 两种图片引用方式
1. 通过http请求load进来。浏览器会有缓存，比较适用于重复性较高的图片。
2. 打包成base64。任何地方要用时，都会有base64编码存在那里，会造成代码的冗余，增加代码的体积。


### 可能遇到的问题
1. 已经用npm安装了node-sass和sass-loader，但是执行npm run webpack  会出现以下问题  MSBUILD : error MSB3428: 未能加载 Visual C++ 组件“VCBuild.exe”。
    要解决此问题：
    1. 安装 .NET Framework 2.0 SDK；
    2. 安装 Microsoft Visual Studio 2005；或 3) 如果将该组件安装到了其他位置，请将其位置添加到系统路径
    这是因为系统问题，Windows专业版有此问题，旗舰版就没有