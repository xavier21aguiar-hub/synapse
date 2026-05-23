/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F1115",
        surface: "#161A20",
        primary: "#5B8CFF",
        secondary: "#7C6CFF",
        text: "#F5F7FA",
        muted: "#9CA3AF",

        success:"#22C55E",
        warning:"#F59E0B",
        danger:"#EF4444"
      }
    },
  },
  plugins: [],
}

