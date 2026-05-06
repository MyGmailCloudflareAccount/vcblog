import express from 'express'
const posts = express.Router()

import db from '../database/orm.js'
import table from '../database/schema.js'
import { and, desc, eq, sql } from 'drizzle-orm'

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

posts.get('/info', async (req, res) => {
    const id = req.query.id
    if (typeof id !== 'string' || id === '') {
        res.sendStatus(400)
        return
    }

    const result = await db()
        .select({
            title: table.title,
            content: table.content
        })
        .from(table)
        .where(and(eq(table.type, 'post'), eq(table.id, id)))

    if (result.length === 0) {
        res.sendStatus(404)
        return
    }

    res.json(result[0])
})

export default posts
