/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "475px",
        // => @media (min-width: 475px) { ... }

        "3xl": "2000px",
        // => @media (min-width: 2000px) { ... }
      },
    },
  },
  plugins: [],
};
