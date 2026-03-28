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
          DEFAULT: '#26225d',
          light: '#312d6b',
          lighter: '#3d387a',
        },
        cream: {
          DEFAULT: '#ebe5d3',
          light: '#faf7ee',
        },
        gold: {
          DEFAULT: '#f4a81d',
          light: '#f9c77a',
          dark: '#d9920f',
        },
        sku: {
          okie: '#b4bd35',
          peppin: '#ef473d',
          wisco: '#40c3d6',
          sausage: '#c14f9d',
          curd: '#f4a81d',
        },
      },
    },
  },
  plugins: [],
};
export default config;
