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

const cfg = express.Router()
site.use('/config', cfg)

import { requireAuth } from './auth.js'
cfg.use(requireAuth)

cfg.get('/list', async (req, res) => {
    const keys = (await config.list()).keys
    res.json(keys)
})

cfg.get('/value', async (req, res) => {
    const key = req.query.key
    if (typeof key !== 'string' || key === '') {
        res.sendStatus(400)
        return
    }

    const value = await config.get(key)
    res.send(value)
})

cfg.post('/update', async (req, res) => {
    const { key, value } = req.body
    if (typeof key !== 'string' || key === '' || typeof value !== 'string' || value === '') {
        res.sendStatus(400)
        return
    }

    await config.put(key, value)
    res.sendStatus(200)
})

export default site
