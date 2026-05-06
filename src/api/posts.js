import express from 'express'
const posts = express.Router()

import db from '../database/orm.js'
import table from '../database/schema.js'
import { desc, eq, sql } from 'drizzle-orm'

posts.get('/list', async (req, res) => {
    const start = req.query.start
    const total = req.query.total

    if (typeof start !== 'string' || start === '' || typeof total !== 'string' || total === '') {
        res.sendStatus(400)
        return
    }

    const startNum = parseInt(start, 10)
    const totalNum = parseInt(total, 10)

    if (isNaN(startNum) || isNaN(totalNum)) {
        res.sendStatus(400)
        return
    }

    const result = await db()
        .select({
            id: table.id,
            title: table.title,
            preview: sql`substr(${table.content}, 1, 200)`.mapWith(String).as('preview')
        })
        .from(table)
        .where(eq(table.type, 'post'))
        .orderBy(desc(table.id))
        .limit(totalNum)
        .offset(startNum)

    res.json(result)
})

export default posts
