import { InferModel } from 'drizzle-orm';
import { boolean, varchar } from 'drizzle-orm/pg-core';

import { baseColumns, schema, timestamp } from '../../database/models/defaults';

export const supportedExtensions = ['java', 'js', 'jsx', 'ts', 'tsx', 'txt', 'sql', 'html', 'py', 'md', 'css'] as const;

export const bloquinhoModel = schema.table('bloquinho', {
	...baseColumns,
	title: varchar('title', { length: 50 }).notNull(),
	content: varchar('content', { length: 1000 }).notNull(),
	isPublic: boolean('is_public').notNull().default(true),
	extension: varchar('extension', { length: 10, enum: supportedExtensions }).notNull().default('txt'),
	lastViewedAt: timestamp('last_viewed_at'),
});

export type BloquinhoModel = InferModel<typeof bloquinhoModel>;
export type SupportedExtensions = (typeof supportedExtensions)[number];
