/*
* This contains the configuration for our app.
* We use this configuration to figure out our start points, logical structure and other optimizations possible.
* These may (in the future) include :
*   - Splitting tthe code based on entry points
*   - Adding multiple outputs using the same config
*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const widgetConfig = require("./src/widget-config.json");
const bu = require("./build-utils/build-utils.js");

module.exports = {
    mode: "production",
    entry: ["router.jsx", ...bu.getEntryPoints(widgetConfig)],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module : {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === "development",
                        },
                    },
                    "css-loader",
                    "sass-loader",
                ],
                exclude: /node_modules/
            },
            {
                test: /\.txt$/,
                use: "raw-loader"
            },
            {
                enforce: "pre",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitError: true,
                    emitWarning: false
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.jsx?$/,
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
            filename: "index.html",
            template: "./build-utils/template.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new StyleLintPlugin({
            configFile: ".stylelintrc.json",
            context: "src",
            files: "**/*.(sa|sc|c)ss",
            failOnError: false,
            quiet: false,
            emitErrors: true // by default this is to true to check the CSS lint errors
        })
    ]
};
