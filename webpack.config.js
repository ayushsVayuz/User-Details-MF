const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const webpack = require("webpack");
require("dotenv").config({ path: "./.env" });

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    host: "localhost",
    port: 3004,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".jsx", ".js", ".json", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "userDetails",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: "^19.0.0",
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^19.0.0",
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^7.6.0",
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "User Details App",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};
