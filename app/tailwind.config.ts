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
		extend: {
			fontSize: {
				'2xs': ['0.625rem', '0.875rem'],
				'3xs': ['0.5rem', '0.75rem'],
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;
