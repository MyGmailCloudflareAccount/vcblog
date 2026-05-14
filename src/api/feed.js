import express from 'express'
const feed = express.Router()

import { get_config } from '../env/config.js'
const config = get_config()

import db from '../database/orm.js'
import table from '../database/schema.js'
import { desc, eq, sql } from 'drizzle-orm'

import { Feed } from 'feed'

feed.get('/rss', async (req, res) => {
    const feed = new Feed({
        title: await config.get('title')
    })

    const posts = await db
        .select({
            id: table.id,
            title: table.title,
            preview: sql`substr(${table.content}, 1, 200)`.mapWith(String).as('preview'),
            content: table.content
        })
        .from(table)
        .where(eq(table.type, 'post'))
        .orderBy(desc(table.id))
        .limit(20)

    posts.forEach(post => {
        feed.addItem({
            title: post.title,
            id: post.id,
            description: post.preview,
            content: post.content
        })
    })

    res.type('application/xml')
    res.send(feed.rss2())
})

export default feed
