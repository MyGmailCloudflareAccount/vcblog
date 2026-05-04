import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
export default sqliteTable('storage', {
    id: integer('id').primaryKey().autoIncrement(),
    type: text('type').notNull().default('post'),
    path: text('path').notNull().unique(),
    title: text('title').notNull(),
    content: text('content').notNull().default('')
})
