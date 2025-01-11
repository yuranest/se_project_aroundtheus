// postcss.config.js

// Import plugins
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  // Specify plugins
  plugins: [
    // Add vendor prefixes for cross-browser compatibility
    autoprefixer,
    // Minify CSS using cssnano
    cssnano({ preset: "default" }),
  ],
};
