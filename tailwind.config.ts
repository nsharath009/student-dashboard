module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff", // Define a custom background color
        border: "#d1d5db", // Define a custom border color
        foreground: "#000000", // Define a custom text color
      },
    },
  },
  plugins: [],
};
