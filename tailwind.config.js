module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{
      custom: ['Rubik', 'sans-serif']
    },
    extend: {
      backgroundImage: theme => ({
        'berlin-map':'url(../src/assets/blur-map.png)'
      }),
      height: {
        "9/10": "90%",
      },
      width: {
        "3/10": "30%",
        "7/10": "70%",
        "9/10": "90%"
      },
      colors:{
        'fb-blue': '#3b5998',
        'fb-blue-light':'#1877f2',
        'fb-blue-lighter':'#3889F1',
        'green-custom': "#66CA45",
        'green-custom-darker':'#55B935',
        'gold': '#d4b31c'
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        '150':'150px',
        '300':'300px'
       },
      maxHeight: {
        '90':'90vh'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
