// postcss.config.js

// Import plugins
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    autoprefixer, // Add vendor prefixes
    cssnano({ preset: "default" }), // Minify CSS
  ],
};
