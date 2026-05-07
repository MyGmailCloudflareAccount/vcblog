import express from 'express'
const site = express.Router()

import { get_config } from '../env/config.js'

site.get('/info', async (req, res) => {
    const config = get_config()

    const post_per_page = parseInt(await config.get('post_per_page'), 10)
    if (isNaN(post_per_page)) {
        res.sendStatus(500)
        return
    }

    res.json({
        title: await config.get('title'),
        extra_css: await config.get('extra_css'),
        extra_js: await config.get('extra_js'),
        post_per_page: post_per_page
    })
})

export default site
