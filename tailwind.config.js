/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      'primary': '#574AE2',
      'primary-1': '#EFF0F7',
      'primary-2': '#E9E8F8',
      'primary-3': '#857BEA',
      'primary-alpha-1': 'rgba(87, 74, 226, 0.05)',
      'primary-alpha-2': 'rgba(87, 74, 226, 0.1)',
      'accent-1': '#47DCFF',
      'accent-2': '#F84AA7',
      'dark': '#2A2B2E',
      'dark-1': '#4E5056',
      'dark-2': '#6B6D76',
      'light': '#F8F9F9',
      'light-1': '#F4F6F6',
      'light-2': '#E9ECEC',
    },
    spacing: {
      '1': '5px',
      '2': '10px',
      '3': '15px',
      '4': '20px',
      '5': '30px',
      '6': '40px',
    },
    borderRadius: {
      DEFAULT: '10px',
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
  plugins: [],
}
