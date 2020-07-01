const path  =  require('path');
const webpack = require('webpack'); //访问内置的插件
//动态引用打包的文件 安装插件：npm install html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin');
//webpack 清理目录插件,在添加 hash 值后，文件名不会出现重复的情况，导致旧文件的冗余。
//为了解决我们使用 clean-webpack-plugin 插件来实现。npm install clean-webpack-plugin -D
const {CleanWebpackPlugin}  =  require('clean-webpack-plugin');
//webpack 将 CSS 抽取成单独文件:npm install mini-css-extract-plugin -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩js 的webpack插件 安装：npm install uglifyjs-webpack-plugin -D
const UglifyJsPlugin  =  require('uglifyjs-webpack-plugin');

module.exports  =  {
    entry: {
        app: './src/index.js'
    },
    mode:  'development',
    output: { //输出
        filename:  'main.[hash].js', //给文件添加hash值，可防止缓存
        path:  path.resolve(__dirname,  'dist')  // 输出文件位置
    },
    //有关模块配置
    module:{
        //module.rules :是创建模块时，匹配请求的规则数组，按照规则为对应的模块使用对应的loader或者修改解析器（parser）
        //module.rules匹配条件有 :    
        //use：为模块使用指定 loader，并且可以传入一个字符串数组，加载顺序从右往左。
        //{include : Condition}：匹配特定条件，非必传，支持一个字符串或字符串数组；
        //{exclude : Condition}：排除特定条件，非必传，支持一个字符串或字符串数组；
        //{test : Condition}：匹配特定条件，非必传，支持一个正则表达式或正则表达式数组；
        //其他，可参考官网https://webpack.docschina.org/configuration/      
        rules:[ 
            // {//css样式处理，需要安装 npm install -D style-loader css-loader
            //     test:/\.css$/, //需要配置的模块后缀名
            //     use:["style-loader","css-loader"] //对应处理的loader插件名称 处理顺序从右往左
            // },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,//需要打包单独css文件配置插件后把之前的style-loader换成 MiniCssExtractPlugin.loader；如不需要单独打包就用上面方式即可
                    {
                        loader:"css-loader",
                        options:{ sourceMap:  true  } //定位到样式在源文件的位置
                    }
                ]
            },                
            {//图片处理和优化，需要安装 npm install file-loader -D
                test:/\.(png|svg|jpg|jpeg|gif)$/, //需要配置的模块后缀名
                use:["file-loader"] //对应处理的loader插件名称
            },
        ]

    },
    //解决模块请求的选项（不适用于解析装载程序）
    resolve: {
        //查找模块的目录
        // modules: [
        //     "none",
        //     path.resolve(__dirname, "../")
        // ],
        //使用的扩展名
        extensions: [".js", ".json", ".vue", ".css"],
        alias: {// 模块名称别名的列表            
            // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
            //"module": "new-module",            
            // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
            //"only-module$": "new-module", 主要是$；例如：'vue$': 'vue/dist/vue.esm.js',           
            // alias "module" -> "./app/third/module.js" and "module/file" results in error
            // modules aliases are imported relative to the current context
            // "module": path.resolve(__dirname, "app/third/module.js"),
            '@':  path.resolve(__dirname, "src"),
            '@style':  path.resolve(__dirname, "src/style"),
        }
    },
    //插件的有关模块
    plugins:[
         //插件用于压缩js
        new  UglifyJsPlugin({
            cache:  true, parallel:  true, sourceMap:  true
        }),      
        //打包成单独的css文件，注意：抽取样式以后，就不能使用 style-loader 注入到 html 中
        new  MiniCssExtractPlugin({
            filename:  '[name].[hash].css',
            chunkFilename:  '[id].[hash].css'
        }),
        //动态引用打包后的文件
        new  HtmlWebpackPlugin({
            //title:  "study",  // 生成的文件标题
            filename:  "main.html",  // 最终生成的文件名
            minify:  {  // 压缩选项
                collapseWhitespace:  true,  // 移除空格
                removeComments:  true,  // 移除注释
                removeAttributeQuotes:  true,  // 移除双引号
            }
        }),            
        // 清理目录
        new  CleanWebpackPlugin()
    ]
}