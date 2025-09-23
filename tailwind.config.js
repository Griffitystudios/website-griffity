/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        h1: "9.8125rem", // 157px
        h2: "6.875rem", // 110px
        h3: "3.75rem", // 60px
        h4: "2.8125rem", // 45px
        h5: "1.875rem", // 30px
        base: "1.25rem", // 20px for regular paragraph
        c2: "6.25rem", // 100px
        c1: "11.374rem", // 182px
      },
      colors: {
        primary: "#DBA039",
        body: "#051016",
        white: "#FFFFFF",
        muted: "#e6e6e6",
      },
      screens: {
        xs: "375px", // added xs breakpoint
        xsm: "520px", // added xsm breakpoint
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px", // modified 2xl to 1440px
        "3xl": "1920px", // added 3xl breakpoint
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
