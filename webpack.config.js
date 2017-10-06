const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        "bundle": "./src/index.js",
    },
    module: {
        rules: [
            { test: /\.js$/, use: "babel-loader", include: path.resolve('./src') },
        ],
    },
    output: {
        path: path.join(__dirname, "webapp"),
        filename: "bundle.js",
        devtoolModuleFilenameTemplate: function(info) {
            return path.relative(process.cwd(), info.resourcePath).replace(/^[\/\.]*/, '');
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
    devtool: 'source-map',

    devServer: {
        contentBase: './webapp',

        stats: {
            chunks: false,
        },
    },
};
