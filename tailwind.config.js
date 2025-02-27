/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables dark mode using a CSS class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#ffffff", // Light mode primary background
          dark: "#0f172a", // Dark mode primary background (Tailwind slate-900)
        },
        secondary: {
          light: "#38bdf8", // Light mode (Sky Blue - sky-500)
          dark: "#0ea5e9", // Dark mode (Darker Sky Blue - sky-600)
        },
        text: {
          light: "#1e293b", // Light mode text (Tailwind slate-800)
          dark: "#f8fafc", // Dark mode text (Tailwind slate-50)
        },
      },
    },
  },
  plugins: [],
};
