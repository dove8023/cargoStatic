const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");
let conf = require('dotenv').load()
const webpack = require("webpack");
require("babel-core/register");
require("babel-polyfill");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const env = /* process.env.NODE_ENV || */ "development";

module.exports = {
    entry: ['babel-polyfill', "./src/index.jsx"],
    output: {
        filename: "[name].[chunkhash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new cleanWebpackPlugin(["dist"]),
        new CopyWebpackPlugin([{
            context: __dirname,
            from: "./libs",
            to: "./"
        }]),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("./manifest.json")
        }),
        new htmlWebpackPlugin({
            title: "Index One",
            favicon: 'favicon.ico',
            filename: "index.html",
            template: "index.html"
        }),
        // new webpack.DefinePlugin({
        //     BACK_SYSTEM_URL: JSON.stringify(process.env.BACK_SYSTEM_URL)
        // }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['lib.js'],
            files: ['index.html'],
            append: false,
            hash: true
        }),
    ],
    devtool: env == "production" ? false : "inline-source-map",
    mode: env,
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