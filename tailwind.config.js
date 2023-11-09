/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
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
      keyframes: {
        indeterminateAnimation: {
          "0%": { transform: "translateX(0) scaleX(0)" },
          "40%": { transform: "translateX(0) scaleX(0.4)" },
          "100%": { transform: "translateX(100%) scaleX(0.5)" },
        },
      },
      animation: {
        indeterminate: 'indeterminateAnimation 1s infinite linear',
      },
    },
  },
  plugins: [],
};
