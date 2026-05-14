import express from 'express'
const pages = express.Router()

import db from '../database/orm.js'
import table from '../database/schema.js'
import { and, eq } from 'drizzle-orm'

pages.get('/list', async (req, res) => {
    const result = await db
        .select({
            id: table.id,
            title: table.title
        })
        .from(table)
        .where(eq(table.type, 'page'))
        .orderBy(table.id)

    res.json(result)
})

pages.get('/info', async (req, res) => {
    const id = req.query.id
    if (typeof id !== 'string' || id === '') {
        res.sendStatus(400)
        return
    }

    const idNum = parseInt(id, 10)
    if (isNaN(idNum)) {
        res.sendStatus(400)
        return
    }

    const result = await db
        .select({
            title: table.title,
            content: table.content
        })
        .from(table)
        .where(and(eq(table.type, 'page'), eq(table.id, idNum)))

    if (result.length === 0) {
        res.sendStatus(404)
        return
    }

    res.json(result[0])
})

import { requireAuth } from './auth.js'

pages.post('/update', requireAuth, async (req, res) => {
    const { id, title, content } = req.body
    if (typeof id !== 'number' || typeof title !== 'string' || title === '' || typeof content !== 'string' || content === '') {
        res.sendStatus(400)
        return
    }

    await db.update(table).set({ title, content }).where(eq(table.id, id))
    res.sendStatus(200)
})

pages.post('/new', requireAuth, async (req, res) => {
    const { title, content } = req.body
    if (typeof title !== 'string' || title === '' || typeof content !== 'string' || content === '') {
        res.sendStatus(400)
        return
    }

    await db.insert(table).values({ type: 'page', title, content })
    res.sendStatus(200)
})

pages.get('/delete', requireAuth, async (req, res) => {
    const id = req.query.id
    if (typeof id !== 'string' || id === '') {
        res.sendStatus(400)
        return
    }

    const idNum = parseInt(id, 10)
    if (isNaN(idNum)) {
        res.sendStatus(400)
        return
    }

    await db.delete(table).where(eq(table.id, id))
    res.sendStatus(200)
})

export default pages
