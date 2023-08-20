export type Extension = 'txt' | 'java' | 'js' | 'jsx' | 'ts' | 'tsx' | 'sql' | 'html' | 'py' | 'md' | 'css';

type ExtensionContent = {
	value: Extension;
	displayName: string;
};

export const extensions: Record<Extension, ExtensionContent> = {
	txt: {
		value: 'txt',
		displayName: 'Text',
	},
	java: {
		value: 'java',
		displayName: 'Java',
	},
	js: {
		value: 'js',
		displayName: 'JavaScript',
	},
	jsx: {
		value: 'jsx',
		displayName: 'Javascript (JSX)',
	},
	ts: {
		value: 'ts',
		displayName: 'Typescript',
	},
	tsx: {
		value: 'tsx',
		displayName: 'Typescript (TSX)',
	},
	sql: {
		value: 'sql',
		displayName: 'SQL',
	},
	html: {
		value: 'html',
		displayName: 'HTML',
	},
	py: {
		value: 'py',
		displayName: 'Python',
	},
	md: {
		value: 'md',
		displayName: 'Markdown',
	},
	css: {
		value: 'css',
		displayName: 'CSS',
	},
};
