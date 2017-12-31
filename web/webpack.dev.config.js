const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'babel-polyfill',//处理babel 不能
            'react-hot-loader/patch',//react 热替换
            path.join(__dirname, 'src/index.js')
        ]
    },
    output: {
        //本应[chunkhash]([chunkhash]和react-hot-loader低版本不兼容)
        filename: '[name].[hash].js',//npm install react-hot-loader@next --save-dev （已解决用bata版本）
    },
    module: {
        rules: [{
            test: /\.(css|less)$/,//PostCSS(cssnext) && css module(单文件组件局部样式)
            use: ["style-loader", "css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader","less-loader"]
        }]
    },
    plugins: [
       /*  new webpack.DefinePlugin({//模拟数据变量
            MOCK: true
        }) */
    ],
    devServer: {
        port: 8030,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        /* proxy: {
            "/api/*": "http://localhost:8090/$1"
        } */
    }
};

module.exports = merge({
    customizeArray(a, b, key) {
        if (key === 'entry.app') {//entry.app不合并，全替换
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);