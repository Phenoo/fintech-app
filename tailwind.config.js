/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pthin: ["Inter-Thin", "sans-serif"],
        pextralight: ["Inter-ExtraLight", "sans-serif"],
        plight: ["Inter-Light", "sans-serif"],
        pregular: ["Inter-Regular", "sans-serif"],
        pmedium: ["Inter-Medium", "sans-serif"],
        psemibold: ["Inter-SemiBold", "sans-serif"],
        pbold: ["Inter-Black", "sans-serif"],
        pextrabold: ["Inter-ExtraBold", "sans-serif"],
        pblack: ["Inter-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
