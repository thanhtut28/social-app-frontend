/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
   content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
   theme: {
      fontFamily: {
         sans: ["-apple-system", ...defaultTheme.fontFamily.sans],
         serif: ["Merriweather", "serif"],
      },
      extend: {},
   },
   plugins: [require("@tailwindcss/forms")],
};
