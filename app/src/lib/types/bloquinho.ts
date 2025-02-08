const extensions = [
	'txt',
	'java',
	'js',
	// 'jsx',
	'ts',
	// 'tsx',
	'sql',
	'html',
	'py',
	'md',
	'css',
] as const;

export type Extension = (typeof extensions)[number];

export type Bloquinho = {
	id: string;
	title: string;
	content: string;
	extension: Extension;
	last_viewed_at: Date;
	created_at: Date;
	updated_at: Date;
};

export type EditableBloquinhoFields = Pick<Bloquinho, 'content' | 'extension'>;
