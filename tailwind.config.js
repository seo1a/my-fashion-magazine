/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto_sans: ['noto-sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

