const presets = [
  [
    "@babel/preset-env",
    {
      targets: "defaults, not IE 11, not dead", // Target browsers
      useBuiltIns: "entry", // Enable polyfills for target browsers
      corejs: "^3", // Specify core-js version
    },
  ],
];

module.exports = { presets };
