const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    main: "./src/pages/index.js", // Entry point
  },
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "main.js", // Output filename for JS
    publicPath: "/", // Ensure correct public path for assets
  },
  target: ["web", "es5"], // Target web and ES5 compatibility
  stats: "errors-only",
  mode: "development", // Development mode
  devServer: {
    static: path.resolve(__dirname, "dist"), // Serve static files from dist
    compress: true,
    port: 8080,
    open: true, // Open in browser automatically
    liveReload: true, // Enable live reloading
    hot: false, // Disable hot module replacement
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process JavaScript files
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Process CSS files
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader", // Process CSS with PostCSS
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Handle image files
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]", // Output images to 'images' folder
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i, // Handle font files
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]", // Output fonts to 'fonts' folder
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Use HTML template
    }),
    new CleanWebpackPlugin(), // Clean 'dist' folder before each build
    new MiniCssExtractPlugin({
      filename: "styles/[name].css", // Output CSS to 'styles' folder
    }),
  ],
};
