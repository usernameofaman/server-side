const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HotModulePlugin = require("webpack").HotModuleReplacementPlugin;
const Dotenv = require('dotenv-webpack');

module.exports = ({ sourceDir, distDir }) => ({
  output: {
    filename: "js/[name].js"
  },
  resolve: { // .mjs comes before .js 
    extensions: ['*', '.mjs', '.js', '.json', '.gql', '.graphql']
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env.development'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HotModulePlugin()
  ]
});
