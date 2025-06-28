import antfu from '@antfu/eslint-config';

export default antfu({
	react: true,
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
	stylistic: {
		indent: 'tab',
		semi: true,
		quotes: 'single',
	},
}, {
	rules: {
		'style/brace-style': ['error', '1tbs'],
		'antfu/if-newline': 'off',
		'n/prefer-global/process': ['error', 'always'],
		'react-refresh/only-export-components': 'off',
		'react/no-use-context': 'off',
		'react/no-context-provider': 'off',
		'react/no-forward-ref': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'ts/no-misused-promises': 'off',
		'ts/promise-function-async': 'off',
		'ts/switch-exhaustiveness-check': 'off',
		'ts/consistent-type-definitions': 'off',
		'perfectionist/sort-imports': ['error', {
			internalPattern: ['^src/.+'],
			groups: [
				['builtin'],
				['external'],
				['tsconfig-path'],
			],
		}],
	},
});
