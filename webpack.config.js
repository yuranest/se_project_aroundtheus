// Webpack configuration for Around The U.S. Project
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Plugin to extract CSS into separate files
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to manage HTML file creation
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Plugin to clean the dist folder before each build

module.exports = {
  // Entry point for the application
  entry: "./src/pages/index.js",

  // Output configuration
  output: {
    path: path.resolve(__dirname, "dist"), // Directory for bundled files
    filename: "scripts/[name].[contenthash].js", // JS file naming pattern with content hash for cache busting
    publicPath: "/se_project_aroundtheus/", // Path for assets in GitHub Pages
  },

  // Define the mode: development or production
  mode: process.env.NODE_ENV || "development",

  // Development server configuration
  devServer: {
    static: path.resolve(__dirname, "dist"), // Directory to serve static files
    compress: true, // Enable gzip compression
    port: 8080, // Port for the development server
    open: true, // Open browser automatically
  },

  // Module rules for processing different file types
  module: {
    rules: [
      {
        test: /\.css$/, // Process CSS files
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Extract CSS and load it
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i, // Process image files
        type: "asset/resource", // Use asset/resource module type
        generator: {
          filename: "images/[name].[hash][ext]", // Image file naming pattern with hash
        },
      },
      {
        test: /\.m?js$/, // Process JavaScript files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: "babel-loader", // Use Babel loader for transpilation
          options: {
            presets: ["@babel/preset-env"], // Preset for modern JavaScript compatibility
          },
        },
      },
    ],
  },

  // Plugins to extend Webpack functionality
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css", // CSS file naming pattern with content hash
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Path to the HTML template
      favicon: "./src/images/favicon.ico", // Path to the favicon file
    }),
    new CleanWebpackPlugin(), // Clean the dist folder before each build
  ],
};
