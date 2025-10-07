/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    colors: {
        // Paleta de colores suave y profesional
        primary: {
          light: 'var(--color-primary-light, #EEF2FF)', // Violeta muy claro
          DEFAULT: 'var(--color-primary-default, #6366F1)', // Violeta 500
          dark: 'var(--color-primary-dark, #4338CA)',    // Violeta 700
        },
        background: 'var(--color-background, #F8F9FA)',     // Gris casi blanco
        surface: 'var(--color-surface, #FFFFFF)',
        'on-surface': 'var(--color-on-surface, #111827)',    // Negro suave
        'subtle-border': 'var(--color-subtle-border, #E5E7EB)', // Borde gris claro
      },
    },
  },
  plugins: [],
}
