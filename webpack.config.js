var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "eval",
  mode: "development",
  entry: ["./src/index"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: [".js", ".jsx", ".mjs"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        include: path.join(__dirname, "src")
      },
      { test: /\.mjs$/, type: "javascript/auto" }
    ]
  }
};
