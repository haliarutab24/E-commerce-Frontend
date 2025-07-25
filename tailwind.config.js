/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8", // Blue-700
        primaryDark: "#1e40af", // Blue-800
        accent: "#e94560",
        newPrimary: "#00809D",
        newPrimaryFooter: "#B8E0EF",
      
      },
      screens: {
        '900': '900px',
      },
    },
  },
  plugins: [],
};
