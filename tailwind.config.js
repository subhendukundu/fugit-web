/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FD5A4B",
        secondary: "#b13d35",
        tertiary: "#fd984b",
        quaternary: "#fd4bbd",
        quinary: "#b13584",
        text: "#2E384D",
        hover: "#FFC600",
      },
      borderColor: ["active"],
    },
  },
  plugins: [],
};
