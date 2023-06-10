import { sand, amber, gray, grayDark, grass, tomato } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

export const { styled, css } = createStitches({
	media: {
		sm: '(min-width: 480px)',
		md: '(min-width: 768px)',
		lg: '(min-width: 1024px)',
	},
	theme: {
		colors: {
			green: grass.grass9,
			warning: amber.amber9,
			error: tomato.tomato9,
			sand: sand.sand1,
			fullWhite: '#fff',
			textRegular: grayDark.gray8,
			border: gray.gray5,
			outline: gray.gray6,
			placeholder: gray.gray8,
		},
		radii: {
			rounded: '0.25rem',
		},
		shadows: {
			shadow: '#000 0px 1px 3px -3px',
		},
		space: {
			0: '0.50rem',
			1: '0.75rem',
			2: '1rem',
			3: '1.25rem',
			4: '1.50rem',
			5: '1.75rem',
			10: '4rem',
		},
		fonts: {
			mono: 'monospace',
		},
		fontSizes: {
			textSmall: '0.8rem',
			0: '1rem',
			3: '1.25rem',
			4: '1.875rem',
			5: '2rem',
			6: '2.5rem',
			7: '3rem',
			8: '4rem',
			9: '4.5rem',
		},
	},
});
