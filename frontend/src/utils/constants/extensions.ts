export type Extension = 'txt' | 'java' | 'js' | 'ts' | 'sql' | 'html' | 'py' | 'md' | 'css';

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
	ts: {
		value: 'ts',
		displayName: 'TypeScript',
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
