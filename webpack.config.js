const path = require('path');
const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
    devtool: 'cheap-module-eval-source-map'
};

const productionConfig = {
    plugins: [new CleanWebpackPlugin()]
};

const baseConfig = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.js']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};

module.exports = (env, argv) => {
    const config = argv.mode === 'development' ? devConfig : productionConfig;
    return merge(baseConfig, config);
};
