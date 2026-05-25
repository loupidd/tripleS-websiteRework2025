/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter Tight', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        blue: {
          primary: '#006AB3',
          navy: '#1D3D62',
          mid: '#004E8A',
          light: '#4A90D9',
          dark: '#0F2A45',
          pale: '#EBF3FB',
          pale2: '#D0E6F5',
        },
      },
    },
  },
  plugins: [],
};
