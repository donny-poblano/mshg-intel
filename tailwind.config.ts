import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a1a2e',
          light: '#232342',
          lighter: '#2d2d52',
        },
        gold: {
          DEFAULT: '#f4a81d',
          light: '#f7be4f',
          dark: '#d9920f',
        },
      },
    },
  },
  plugins: [],
};
export default config;
