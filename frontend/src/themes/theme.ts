import {
	sand,
	amber,
	gray,
	grayDark,
	grass,
} from '@radix-ui/colors';
import { createStitches } from '@stitches/react';


export const { styled, css } = createStitches({
	theme: {
		colors: {
			green: grass.grass8,
			warning: amber.amber10,
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
		fontSizes: {
			0: '1rem',
			4: '1.875rem',
			5: '4.5rem',
		},
	},
});
