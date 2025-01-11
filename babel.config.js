const presets = [
  [
    "@babel/preset-env",
    {
      targets: "defaults, not IE 11, not dead", // Define target browsers
      useBuiltIns: "entry", // Use polyfills for the specified browsers
      corejs: "^3", // Specify core-js version for polyfills
    },
  ],
];

module.exports = { presets };
