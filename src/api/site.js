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

const settings = express.Router()
site.use('/settings', settings)

import { requireAuth } from './auth.js'
settings.use(requireAuth)

settings.get('/list', async (req, res) => {
    const keys = (await config.list()).keys.map(item => item.name)
    const values = await config.get(keys)
    res.json(Object.fromEntries(values))
})

export default site
