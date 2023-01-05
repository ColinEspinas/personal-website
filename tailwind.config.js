/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    colors: {
      'primary': 'rgb(var(--color-primary) / <alpha-value>)',
      'primary-1': 'rgb(var(--color-primary-1) / <alpha-value>)',
      'primary-2': 'rgb(var(--color-primary-2) / <alpha-value>)',
      'primary-3': 'rgb(var(--color-primary-3) / <alpha-value>)',
      'primary-alpha-1': 'var(--color-primary-alpha-1)',
      'primary-alpha-2': 'var(--color-primary-alpha-2)',
      'accent-1': 'rgb(var(--color-accent-1) / <alpha-value>)',
      'accent-2': 'rgb(var(--color-accent-2) / <alpha-value>)',
      'dark': 'rgb(var(--color-dark) / <alpha-value>)',
      'dark-1': 'rgb(var(--color-dark-1) / <alpha-value>)',
      'dark-2': 'rgb(var(--color-dark-2) / <alpha-value>)',
      'light': 'rgb(var(--color-light) / <alpha-value>)',
      'light-1': 'rgb(var(--color-light-1) / <alpha-value>)',
      'light-2': 'rgb(var(--color-light-2) / <alpha-value>)',
      transparent: "transparent",
      current: "currentColor",
    },
    spacing: {
      '0': '0',
      '1': '5px',
      '2': '10px',
      '3': '15px',
      '4': '20px',
      '5': '30px',
      '6': '40px',
      '7': '50px',
    },
    borderRadius: {
      DEFAULT: '10px',
      'pill': '100px',
    },
    fontFamily: {
      'display': ['"Space Grotesk"'],
      'sans': ['Inter'],
    },
    boxShadow: {
      'border': '0px 0px 0px 2px theme("colors.primary-2") inset;'
    },
    lineHeight: {
      'inter-buttons': '17px',
      'inter-compact': '20px',
      'inter-reading': '26px'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
