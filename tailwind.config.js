/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto_sans: ['noto-sans', 'sans-serif'],
        noto_sans_light: ['noto-sans-light', 'sans-serif'],
        poppins: ['poppins', 'sans-serif'],
        poppins_black: ['poppins-black', 'sans-serif'],
        freesentation: ['freesentation-regular', 'sans-serif'],
        freesentation_bold: ['freesentation-bold', 'sans-serif'],
        aftermath: ['aftermath', 'sans-serif'],
      },
      colors: {
        myBlue: "#4246ce",
        myGreen: "#00FF57"
      }
    },
  },
  plugins: [],
}

