import { pgSchema, timestamp as pgTimestamp, uuid } from 'drizzle-orm/pg-core';


export const schema = pgSchema('main');

export const timestamp = (name: string) => pgTimestamp(name, { withTimezone: false, mode: 'string' }).notNull().defaultNow();

export const baseColumns = {
	id: uuid('id').primaryKey().defaultRandom(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at'),
};
