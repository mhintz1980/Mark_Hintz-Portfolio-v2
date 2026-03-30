/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F9FA",
        surface: "#FFFFFF",
        "surface-raised": "#FAFBFC",
        primary: "#1F2937",
        secondary: "#6B7280",
        accent: {
          primary: "#2563EB",
          secondary: "#3B82F6",
          warm: "#F59E0B",
          dim: "rgba(37, 99, 235, 0.1)",
        },
        cad: {
          "line-primary": "#3B82F6",
          "line-secondary": "#6B7280",
          dimension: "#4B5563",
          centerline: "#6B7280",
          hidden: "#6B7280",
        }
      },
      fontFamily: {
        heading: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Cascadia Code', 'monospace']
      },
      stroke: ({ theme }) => theme('colors'),
      fill: ({ theme }) => theme('colors'),
    },
  },
  plugins: [],
}
