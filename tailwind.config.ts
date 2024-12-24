module.exports = {
  safelist: [
    "bg-background",
    "border-border",
    "text-foreground",
    // Add any other dynamically generated classes
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
