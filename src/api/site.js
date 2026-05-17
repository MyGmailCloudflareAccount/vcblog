import express from 'express'
const site = express.Router()

import { get_config } from '../env/config.js'
const config = get_config()

site.get('/info', async (req, res) => {
    const [title, extra_css, extra_js] = await Promise.all([config.get('title'), config.get('extra_css'), config.get('extra_js')])

    res.json({
        title: title,
        extra_css: extra_css,
        extra_js: extra_js
    })
})

import db from '../database/orm.js'
import table from '../database/schema.js'

import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

site.get('/map', async (req, res) => {
    const hostname = `${req.protocol}://${req.host}`

    const result = await db
        .select({
            id: table.id,
            type: table.type
        })
        .from(table)

    const links = result.map(item => ({
        url: `/${item.type}/${item.id}`,
        changefreq: 'daily',
        priority: 0.8
    }))

    const stream = new SitemapStream({ hostname: hostname })
    const xmlBuffer = await streamToPromise(Readable.from(links).pipe(stream))

    res.type('application/xml')
    res.send(xmlBuffer.toString())
})

import { desc, eq, sql } from 'drizzle-orm'
import { Feed } from 'feed'

site.get('/feed', async (req, res) => {
    const hostname = `${req.protocol}://${req.host}`

    const feed = new Feed({
        title: await config.get('title'),
        link: hostname
    })

    const post_per_page = parseInt(await config.get('post_per_page'), 10)
    if (isNaN(post_per_page)) {
        res.sendStatus(500)
        return
    }

    const posts = await db
        .select({
            id: table.id,
            title: table.title,
            preview: sql`substr(${table.content}, 1, 200)`.mapWith(String).as('preview')
        })
        .from(table)
        .where(eq(table.type, 'post'))
        .orderBy(desc(table.id))
        .limit(post_per_page)

    posts.forEach(post => {
        feed.addItem({
            title: post.title,
            link: `${hostname}/post/${post.id}`,
            id: post.id,
            description: post.preview
        })
    })

    res.type('application/xml')
    res.send(feed.rss2())
})

const settings = express.Router()
site.use('/settings', settings)

import { requireAuth } from './auth.js'
settings.use(requireAuth)

settings.get('/list', async (req, res) => {
    const keys = (await config.list()).keys.map(item => item.name)
    const values = await config.get(keys)
    res.json(Object.fromEntries(values))
})

settings.post('/update', async (req, res) => {
    const { key, value } = req.body
    if (typeof key !== 'string' || key === '' || typeof value !== 'string') {
        res.sendStatus(400)
        return
    }

    await config.put(key, value)
    res.sendStatus(200)
})

export default site
