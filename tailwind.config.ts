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
        background: "var(--background)",
        foreground: "var(--foreground)",
        pink: 'var(--pink)',

        purple: "var(--purple)",
        grey:'var(--grey)',
        textGrey:'var(--textGrey)',
        blue:'var(--blue)',
        
      textPurple: 'var(--textPurple)',
      lightblue: 'var(--lightblue)',
      lightpink: 'var(--lightpink)',
      homegrey:'var(--homegrey)',
      homeblack: 'var(--homeblack)',
      },
    },
  },
  plugins: [],
};
export default config;
