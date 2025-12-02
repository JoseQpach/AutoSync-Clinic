/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A", // Fondo oscuro
        surface: "#1E293B",    // Paneles
        border: "#334155",     // Bordes
        textPrimary: "#E2E8F0", 
        textSecondary: "#94A3B8",
        primary: "#6366F1",     // Violeta Botón
        primaryHover: "#4F46E5", 
        success: "#10B981",     
        danger: "#F43F5E",      
        accent: "#06B6D4",      
      },
    },
  },
  plugins: [],
}