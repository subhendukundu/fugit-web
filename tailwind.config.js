/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: "#FD5A4B",
        secondary: "#02394F",
        text: "#FFFFFF",
        hover: "#FFC600",
      },
      borderColor: ["active"],
    },
  },
  plugins: [],
};
