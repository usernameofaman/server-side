const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require('dotenv-webpack');



var config = {
    mode: "development",
    plugins: [new webpack.HotModuleReplacementPlugin()
    ,
    new TsconfigPathsPlugin({
      configFile: "./tsconfig.json",
    }),],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: "css-loader",
                    options: { sourceMap: true }
                  },
                  { loader: "sass-loader" }
                ]
              },
              {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ],
              },
              {
                test: /\.(gif|jpg|png|svg)$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "[name].[ext]",
                      outputPath: "images/",
                      publicPath: "/images/",
                    },
                  },
                  {
                    loader: "image-webpack-loader",
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 85,
                      },
                      pngquant: {
                        quality: "65-90",
                        speed: 4,
                      },
                      gifsicle: {
                        enabled: false,
                      },
                    },
                  },
                ],
              },
        ]
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
          },
          chunks: 'all',
        },
      },
      plugins: [
        new Dotenv({
          path: './.env.development'
        }),
        new MiniCssExtractPlugin({
          filename: "[name].[hash].css",
          chunkFilename: "[id].[hash].css"
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css'
        })
      ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", '.mjs'],
        modules: ["src", "node_modules"]
    }
};

var client = Object.assign({}, config, {
    name: "client",
    target: "web",
    entry: path.resolve(__dirname, "src/client/index.tsx"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    }
});

var server = Object.assign({}, config, {
    name: "server",
    target: "node",
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, "src/server/index.tsx"),
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "build")
    }
});

module.exports = [client, server];