/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-sans-serif'],
      },
      colors: {
        primary: '#6366f1',
        base: '#0f172a',
        surface: '#1e293b',
        card: '#1e293b',
        glass: 'rgba(255, 255, 255, 0.06)',
      },
      boxShadow: {
        glow: '0 4px 15px rgba(99, 102, 241, 0.4)',
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
    },
  },
  plugins: [],
};
