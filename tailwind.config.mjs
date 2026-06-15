/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
				display: ['"Bebas Neue"', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
