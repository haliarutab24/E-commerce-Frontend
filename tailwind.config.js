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
        "primary-dark": "#1e40af", // Blue-800
        accent: "#e94560",
      },
    },
  },
  plugins: [],
};
