import express from 'express'
const site = express.Router()

import { get_config } from '../env/config.js'

site.get('/info', async (req, res) => {
    const config = get_config()

    res.json({
        title: await config.get('title'),
        extra_css: await config.get('extra_css'),
        extra_js: await config.get('extra_js')
    })
})

export default site
