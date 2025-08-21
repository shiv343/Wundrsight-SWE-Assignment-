// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        surface: "#1e293b", // dark slate
        primary: "#6366f1", // indigo
        secondary: "#ec4899", // pink
      },
    },
  },
  plugins: [],
};
