// 这里是通用配置
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//一个方法，获取目录路径
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}  

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
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolve('src/icons/svg')],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {      
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'  ,
                exclude: [resolve('src/icons')],//排除该目录  其他规则中有svg 需要加入排除
                options: {
                    limit: 10000
                }         
            },
            {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              loader: 'url-loader'
            },
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader'              
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json','.styl'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src'),
          '@C': resolve("src/components"),
          'pStyles': resolve('src/styles')
        }
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