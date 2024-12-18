/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'rotate-infinite': 'rotate 50s linear infinite', 
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      colors: {
        secondary: '#FF6347',  // Custom color (example)
        tertiary: '#4682B4',   // Custom color (example)
        primary: '#fff'
      },
    },
  },
  plugins: [],
}

