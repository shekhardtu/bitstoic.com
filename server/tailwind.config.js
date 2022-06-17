module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },

  content: ['./src/views/**/*.{html,js,ejs}', './components/**/*.{html,js}'],
  // ...
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
};
