import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			sans: ['var(--font-nunito)', 'sans-serif'],
			mono: ['monospace'],
		},
		extend: {},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;
