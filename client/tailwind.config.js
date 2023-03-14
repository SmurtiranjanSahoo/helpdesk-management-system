/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xxs: "375px",
      xs: "425px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "835px",
      // => @media (min-width: 640px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      xxl: "1440px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
  // important: true,
};
