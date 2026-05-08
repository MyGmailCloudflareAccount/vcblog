import express from 'express'
const posts = express.Router()

import { get_config } from '../env/config.js'
import db from '../database/orm.js'
import table from '../database/schema.js'
import { and, count, desc, eq, sql, or, like } from 'drizzle-orm'

posts.get('/count', async (req, res) => {
    const result = await db()
        .select({
            total_post: count()
        })
        .from(table)
        .where(eq(table.type, 'post'))

    if (result.length === 0) {
        res.sendStatus(404)
        return
    }

    const config = get_config()
    const post_per_page = parseInt(await config.get('post_per_page'), 10)
    if (isNaN(post_per_page)) {
        res.sendStatus(500)
        return
    }

    const total_post = result[0].total_post
    const total_page = Math.ceil(total_post / post_per_page)

    res.json({ total_page })
})

posts.get('/list', async (req, res) => {
    const page = req.query.page
    if (typeof page !== 'string' || page === '') {
        res.sendStatus(400)
        return
    }

    let pageNum = parseInt(page, 10)
    if (isNaN(pageNum)) {
        res.sendStatus(400)
        return
    }

    if (pageNum < 1) {
        pageNum = 1
    }

    const config = get_config()
    const post_per_page = parseInt(await config.get('post_per_page'), 10)
    if (isNaN(post_per_page)) {
        res.sendStatus(500)
        return
    }

    const offset = (pageNum - 1) * post_per_page
    const limit = post_per_page

    const result = await db()
        .select({
            id: table.id,
            title: table.title,
            preview: sql`substr(${table.content}, 1, 200)`.mapWith(String).as('preview')
        })
        .from(table)
        .where(eq(table.type, 'post'))
        .orderBy(desc(table.id))
        .limit(limit)
        .offset(offset)

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

posts.get('/search', async (req, res) => {
    const keyword = req.query.keyword
    if (typeof keyword !== 'string' || keyword === '') {
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
        .where(and(eq(table.type, 'post'), or(like(table.title, `%${keyword}%`), like(table.content, `%${keyword}%`))))
        .orderBy(desc(table.id))
        .limit(20)

    res.json(result)
})

export default posts
