import { InferModel } from 'drizzle-orm';
import { boolean, varchar } from 'drizzle-orm/pg-core';

import { baseColumns, schema, timestamp } from '../../database/models/defaults';


export const bloquinhoModel = schema.table('bloquinho', {
	...baseColumns,
	title: varchar('title', { length: 50 }).notNull(),
	content: varchar('content', { length: 1000 }).notNull(),
	isPublic: boolean('is_public').notNull().default(true),
	lastViewedAt: timestamp('last_viewed_at'),
});

export type BloquinhoModel = InferModel<typeof bloquinhoModel>;
