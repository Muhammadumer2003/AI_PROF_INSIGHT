import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-c" : "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        // Adding custom fonts
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
