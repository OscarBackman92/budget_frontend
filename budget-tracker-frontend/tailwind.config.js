/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // ✅ App Router
    "./src/pages/**/*.{js,ts,jsx,tsx}", // ✅ Pages Router (if used)
    "./src/components/**/*.{js,ts,jsx,tsx}", // ✅ Components
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // ✅ Move dark mode inside the main export
  plugins: [],
};
