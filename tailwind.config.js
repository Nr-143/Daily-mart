/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
 theme: {
    extend: {
      animation: {
        'gradient-move': 'gradientBG 10s ease-in-out infinite',
        'glow-move': 'glowMove 5s ease-in-out infinite',
        'slideDown': 'slideDown 1s ease-in-out',
        'slideUp': 'slideUp 1.2s ease-in-out',
      },
      keyframes: {
        gradientBG: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        glowMove: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(15px)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
       colors: {
        'electric-purple': '#8A2BE2',
        'sunset-orange': '#FF4500',
        'midnight-blue': '#191970',
        'graphite-gray': '#2F4F4F',
        'soft-lavender': '#E6E6FA',
      },
       fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
