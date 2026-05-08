import express from 'express'
const site = express.Router()

import { get_config } from '../env/config.js'

site.get('/info', async (req, res) => {
    const config = get_config()
    const [title, extra_css, extra_js] = await Promise.all([config.get('title'), config.get('extra_css'), config.get('extra_js')])

    res.json({
        title: title,
        extra_css: extra_css,
        extra_js: extra_js
    })
})

export default site
