const webpack = require('webpack');
const path = require("path");
const cleanWebpackPlugin = require("clean-webpack-plugin");
let env = /* process.env.NODE_ENV ||  */ "production";
console.log("ddl env: ", env)

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-redux',
    'react-router-dom',
    'redux-logger',
    'redux-promise-middleware',
    'redux-thunk',
    'antd',
    'redux',
    'lodash',
    'axios',
    'particles.js',
    'moment'
];

module.exports = {
    output: {
        path: path.resolve(__dirname, "libs"),
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    mode: env,
    devtool: env == "production" ? false : "inline-source-map",
    plugins: [
        new cleanWebpackPlugin(["libs"]),
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};