const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      images: path.resolve(__dirname, "./public/images"),
      styles: path.resolve(__dirname, "./public/css"),
    },
  },
  performance: {
    maxAssetSize: 400000,
    maxEntrypointSize: 400000,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            include: path.join(__dirname, "src"),
            outputPath: "images",
          },
        },
      },
      {
        test: /\.(eot|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "fonts",
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
    host: "localhost",
    port: 3000,
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "https://api.spacexdata.com/v3",
    }),
  },
};
