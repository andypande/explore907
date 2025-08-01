/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alaska-blue': '#1e40af',
        'alaska-green': '#059669',
        'alaska-snow': '#f8fafc',
        'alaska-dark': '#0f172a',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'alaska-hero': 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
      }
    },
  },
  plugins: [],
} 