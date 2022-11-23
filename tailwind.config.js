const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./app/**/*.{ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          'ubuntu': ['Ubuntu'],
          'roboto': ['Roboto']
        },
        width: {
          '128': '32rem',
        }
      },
    },
    plugins: [],
  }