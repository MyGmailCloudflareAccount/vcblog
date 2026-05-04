import express from 'express'
const pages = express.Router()

import db from '../database/orm.js'
import table from '../database/schema.js'
import { eq } from 'drizzle-orm'

pages.get('/list', async (req, res) => {
    const result = await db()
        .select({
            path: table.path,
            title: table.title
        })
        .from(table)
        .where(eq(table.type, 'page'))

    res.json(result)
})

export default pages
