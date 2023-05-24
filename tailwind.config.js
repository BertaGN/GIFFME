/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 3s linear infinite',
      },
      keyframes: {
        'gradient': {
          '0%, 100%': { 'background-position': '100% 0%' },
          '50%': { 'background-position': '0% 100%' },
        },
      },
      gradientColorStops: {
        'strong-pink': '#FF0080',
        'medium-pink': '#FF55A0',
        'light-pink': '#FF8BC0',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
  plugins: [],
};

