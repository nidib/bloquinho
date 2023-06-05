import { InferModel } from 'drizzle-orm';
import { boolean, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { mainSchema } from './schemas';


export const bloquinhoModel = mainSchema.table('bloquinho', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: varchar('title', { length: 50 }).notNull(),
	content: varchar('content', { length: 1000 }).notNull(),
	isPublic: boolean('is_public').notNull().default(true),
	lastViewedAt: timestamp('last_viewed_at', { withTimezone: false, mode: 'string' }).notNull().defaultNow(),
	createdAt: timestamp('created_at', { withTimezone: false, mode: 'string' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: false, mode: 'string' }).notNull().defaultNow(),
});

export type BloquinhoModel = InferModel<typeof bloquinhoModel>;
