const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/pages/index.js", // Entry point for JavaScript
  },
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "main.js", // Output JS file
    publicPath: "/", // Public path for assets
  },
  target: ["web", "es5"], // Target compatibility
  stats: "errors-only",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "dist"), // Serve static files from dist
    compress: true,
    port: 8080,
    open: true, // Open the project in a browser automatically
    liveReload: true, // Enable live reload on changes
    hot: false, // Disable HMR
  },
  module: {
    rules: [
      {
        test: /\.js$/, // JavaScript processing
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // CSS processing
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Image handling
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]", // Output folder for images
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i, // Font handling
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]", // Output folder for fonts
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Path to HTML template
      favicon: "./src/images/favicon.ico", // Favicon path
    }),
    new CleanWebpackPlugin(), // Clean output folder before building
    new MiniCssExtractPlugin({
      filename: "styles/[name].css", // Output folder for CSS
    }),
  ],
};
