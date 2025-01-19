/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{html,js,ts,jsx,tsx}",
    "./src/components/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009879", // Green for trust, growth, and money
        secondary: "#333",  // Neutral color for text and accents
        accent: "#f9f9f9",  // Light gray for backgrounds
      },
    },
  },
  darkMode: 'class', // enable dark mode using "class" strategy
  plugins: [],
};
