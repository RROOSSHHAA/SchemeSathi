/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#142B4A',
          dark: '#0E1E34',
          light: '#1D3D68',
        },
        saffron: {
          DEFAULT: '#D6A45B',
          light: '#E2BC7E',
          dark: '#BA8840',
        },
        heritage: {
          green: '#28634A',
          light: '#368060',
          dark: '#1C4634',
        },
        alabaster: {
          DEFAULT: '#F5F2EA',
          card: '#FAF8F4',
          dark: '#EAE5D9',
        },
        charcoal: {
          DEFAULT: '#30343B',
          dark: '#1F2227',
          light: '#4B515C',
        },
        govborder: '#DEDCD4',
        govmuted: '#737982',
        govsuccess: '#28634A',
        govwarning: '#B47A29',
        goverror: '#A33A32',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
