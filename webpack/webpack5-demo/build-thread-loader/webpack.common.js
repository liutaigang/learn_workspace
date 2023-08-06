const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')
const threadLoader = require('thread-loader');

const jsWorkerPool = {
    poolTimeout: 2000
};

const cssWorkerPool = {
    workerParallelJobs: 2,
    poolTimeout: 2000
};

threadLoader.warmup(jsWorkerPool, ['babel-loader']);
threadLoader.warmup(cssWorkerPool, ['css-loader', 'postcss-loader']);

module.exports = {
    entry: path.join(srcPath, 'index'),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: jsWorkerPool
                    },
                    'babel-loader'
                ],
                include: srcPath,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'thread-loader',
                        options: cssWorkerPool
                    },
                    {
                        loader: 'css-loader',
                    },
                    'postcss-loader'
                ]
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
