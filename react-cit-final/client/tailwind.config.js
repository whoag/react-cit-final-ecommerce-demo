const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      width:{
        'fit' : 'fit-content',
        '90v' : '90vw'
      },
      screens: {
        phone: '450px',
        tablet: '640px',
        // => @media (min-width: 640px) { ... }

        laptop: '1150px',
        // => @media (min-width: 1024px) { ... }

        desktop: '1500px',
        // => @media (min-width: 1280px) { ... }
      },
      minHeight: {
        '1/2': '50%',
        '2/3': '66%',
        '2/5': '40%',
        '4/5': '80vh',
      },
      colors: {
        trueGray: colors.trueGray,
        'peel': {
          DEFAULT: '#F6682E',
          '50': '#FEE7DE',
          '100': '#FDD9CA',
          '200': '#FBBDA3',
          '300': '#F9A17C',
          '400': '#F88455',
          '500': '#F6682E',
          '600': '#E2490A',
          '700': '#AC3707',
          '800': '#772605',
          '900': '#411503'
        },
        'red-violet': {
          DEFAULT: '#D3197B',
          '50': '#F5AED4',
          '100': '#F39CCA',
          '200': '#EF77B6',
          '300': '#EB53A3',
          '400': '#E62F8F',
          '500': '#D3197B',
          '600': '#A1135E',
          '700': '#6F0D41',
          '800': '#3D0723',
          '900': '#0A0106'
        },
        'nice-blue': {
          DEFAULT: '#258ED9',
          '50': '#C1DFF4',
          '100': '#B0D6F1',
          '200': '#8DC4EC',
          '300': '#6AB2E6',
          '400': '#47A0E0',
          '500': '#258ED9',
          '600': '#1D6FA9',
          '700': '#154F79',
          '800': '#0C3049',
          '900': '#041119'
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};