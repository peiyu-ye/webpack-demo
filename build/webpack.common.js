// 这里是通用配置
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry:{ //入口文件
        app: './src/index.js'
    },    
     //有关模块配置
     module:{
        rules:[            
            {
                test:/\.css$/, //需要配置的模块后缀名
                use:["style-loader","css-loader"] //对应处理的loader插件名称 处理顺序从右往左	           
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'index',
            template: 'index.html',
        }),
        new VueLoaderPlugin()
    ],
    output:{ //出口文件
        filename:'[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    }
};