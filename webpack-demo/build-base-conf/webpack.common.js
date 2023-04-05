const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath } = require('./paths')

module.exports = {
    entry: path.join(srcPath, 'index'),
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'], // babel-loader 的打包选项在 .babelrc 文件中
                include: srcPath,
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     // loader 的执行顺序是：从后往前（知识点）
            //     loader: ['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss
            },
            // style-loader 的功能就一个，在 DOM 里插入一个 <style> 标签，并且将 CSS 写入这个标签内；
            // css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样，默认生成一个数组存放存放处理后的样式字符串，并将其导出；
            // 进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等；
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ]
}


// postcss-loader 应该是 Webpack 配置中不可或缺的一个 CSS loader。它负责进一步处理 CSS 文件，比如添加浏览器前缀，压缩 CSS 等。
// 配置 postcss-loader 时，可以在 webpack.config.js 中配置具体选项，也可以新建一个 postcss.config.js，专门定义 postcss-loader 的配置。
// 这篇文档基于依赖包版本：


// webpack：4.39.1
// npm i -D webpack


// postcss-loader：3.0.0
// npm i -D postcss-loader


// cssnano：4.1.10
// npm i -D cssnao


// autoprefixer：9.7.2
// npm i -D autoprefixer


// 添加浏览器前缀


// 配置 Autoprefixer 之前，需要先添加 Browserslist ：在项目根目录添加 .browserslistrc 文件；或者在package.json文件中添加 browserslist ，比如：
// {
//    "browserslist": [
//       "defaults"
//     ]
// }

// 配置 Autoprefixer：

// 如果是在项目根目录中创建了 postcss.config.js：
// module.exports = {
//   plugins: [
//        require('autoprefixer')
//     ]
// }

// 如果直接在 webpack.config.js 中配置：
// {
//   test: /\.css$/,
//   use: [
//     'style-loader',
//     'css-loader',
//     {
//       loader: 'postcss-loader',
//       options: {
//         plugins: [
//           require('autoprefixer')
//         ]
//       }
//     }
//   ]
// }

// 生产模式中压缩CSS
// 推荐使用文件 postcss.config.js的方式:
// module.exports = ({ env }) => ({
//   plugins: [
//        require('autoprefixer'),
//        env === 'production' ? require('cssnano') : null
//     ]
// })
// env取值process.env.NODE_ENV，可用来判断是开发模式还是生产模式。
// 当然也可以在 webpack.config.js 中，只是写起来有点冗余，尤其是需要在多个规则中用到 postcss-loader 时：
// const devMode = process.env.NODE_ENV === 'development'; // 是否是开发模式

// module.exports = {
//   module: {
//     rules:[
//       {
//         test: /\.css$/,
//         use: [
//           'style-loader',
//           'css-loader',
//           {
//             loader: 'postcss-loader',
//             options: {
//               plugins:devMode ? [require('autoprefixer')] : [require('autoprefixer'), require('cssnano')]
//             }
//           }
//         ],
//       }
//     ]
//   }
// };

// 压缩 CSS 其他方法可以参考 Webpack 文档中这一段 。
// 开发模式下生成 Sourcemap
// 用 style-loader时：
// const devMode = process.env.NODE_ENV === 'development'; // 是否是开发模式

// module.exports = {
//   module: {
//     rules:[
//       {
//         test: /\.less$/i,
//         use:  [
//           'style-loader',
//           { loader: 'css-loader', options: { sourceMap: devMode}},
//           { loader: 'postcss-loader', options: { sourceMap: devMode}},
//           { loader: 'less-loader', options: { sourceMap: devMode }}
//         ]
//       },
//     ]
//   }
// };
// 用 MiniCssExtractPlugin 时，注意 sourcemap 得配置成“inline”，不然调试时仍旧无法定位到.less 源码，只能定位到编译后的 CSS 文件。
// const devMode = process.env.NODE_ENV === 'development'; // 是否是开发模式

// module.exports = {
//   module: {
//     rules:[
//       {
//         test: /\.less$/i,
//         use:  [
//           {
//             loader: MiniCssExtractPlugin.loader,
//             options: {
//               // only enable hot in development
//               hmr: devMode,
//               // if hmr does not work, this is a forceful method.
//               reloadAll: true,
//             },
//           },
//           { loader: 'css-loader', options: { sourceMap: devMode}},
//           { loader: 'postcss-loader', options: { sourceMap: devMode?'inline':false}}, // 注意这里是 inline
//           { loader: 'less-loader', options: { sourceMap: devMode }}
//         ]
//       },
//     ]
//   }
// };
