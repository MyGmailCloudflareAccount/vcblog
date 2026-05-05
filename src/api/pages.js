import express from 'express'
const pages = express.Router()

import db from '../database/orm.js'
import table from '../database/schema.js'
import { eq } from 'drizzle-orm'

pages.get('/list', async (req, res) => {
    const result = await db()
        .select({
            id: table.id,
            path: table.path,
            title: table.title
        })
        .from(table)
        .where(eq(table.type, 'page'))

    res.json(result)
})

pages.get('/info', async (req, res) => {
    const path = req.query.path
    if (typeof path !== 'string' || path === '') {
        res.sendStatus(400)
        return
    }

    const result = await db()
        .select({
            id: table.id,
            title: table.title,
            content: table.content
        })
        .from(table)
        .where(eq(table.path, path))

    if (result.length === 0) {
        res.sendStatus(404)
        return
    }

    res.json(result[0])
})

export default pages
