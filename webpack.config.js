const nodeExternals = require("webpack-node-externals");
const { resolve } = require("path");
const { ContextReplacementPlugin } = require("webpack");

module.exports = {
    target: "node",
    node: {
        __filename: false,
        __dirname: false,
    },
    externals: process.env.mode === "development" ? [nodeExternals()] : [],
    entry: {
        server: "./src/server.ts",
    },
    mode: process.env.mode,
    devtool: false,
    output: {
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        path: resolve(__dirname, "./dist"),
        publicPath: "/",
        libraryTarget: "commonjs2",
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: "_",
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    minChunks: 2,
                },
            },
        },
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new ContextReplacementPlugin(/(express\/lib|require_optional)/, resolve("./node_modules"), {
            ejs: "ejs",
        }),
    ],
    stats: {
        warningsFilter: /require\.extensions/,
    },
};
