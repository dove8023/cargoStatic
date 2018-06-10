const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");
let conf = require('dotenv').load()
const webpack = require("webpack");
require("babel-core/register");
require("babel-polyfill");

module.exports = {
    entry: ['babel-polyfill', "./src/index.jsx"],
    /* entry: {
        index: "./src/js/index.js",
        two: "./src/js/two.js"
    }, */
    output: {
        filename: "[name].[chunkhash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new cleanWebpackPlugin(["dist"]),
        new htmlWebpackPlugin({
            title: "Index One",
            favicon: 'favicon.ico',
            filename: "index.html",
            template: "index.html"
        }),
        new webpack.DefinePlugin({
            BACK_SYSTEM_URL: JSON.stringify(process.env.BACK_SYSTEM_URL)
        }),
        // new uglifyJsPlugin()
    ],
    devtool: "inline-source-map",
    // mode: "production",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif|ico)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ["react"]
            //         }
            //     }
            // },
            {
                test: /\.(html|ico)$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
                    options: {
                        presets: ["es2015", "react", "stage-0"]
                    }
                }
            }
        ]
    }
}