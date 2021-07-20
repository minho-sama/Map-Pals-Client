module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{
      custom: ['Rubik', 'sans-serif']
    },
    extend: {
      height: {
        "9/10": "90%",
      },
      colors:{
        'fb-blue': '#3b5998',
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
       },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
