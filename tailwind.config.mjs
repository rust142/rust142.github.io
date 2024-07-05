/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
	content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    'node_modules/preline/dist/*.js'
  ],
	theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
		extend: {
      fontFamily: {
        regular: "Instrument Sans",
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
	},
	plugins: [
    require('preline/plugin'),
  ],
}
