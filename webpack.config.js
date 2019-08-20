/*
* This contains the configuration for our app.
* We use this configuration to figure out our start points, logical structure and other optimizations possible.
* These may (in the future) include :
*   - Splitting tthe code based on entry points
*   - Adding multiple outputs using the same config
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const widgetConfig = require("./src/widget-config.json");
const bu = require("./build-utils/build-utils.js");

module.exports = {
    mode: "development",
    entry: ["router.js", ...bu.getEntryPoints(widgetConfig)],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module : {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.txt$/,
                use: "raw-loader"
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitError: true,
                    emitWarning: false
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: "html-loader",
                    options: {
                        attrs: [":data-src"]
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader"
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "./"),
            "./node_modules"
        ]
    },
    devServer: {
        port: 3001
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './build-utils/template.html',
        })
    ]
};
