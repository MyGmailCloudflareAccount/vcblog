import express from 'express'
const app = express()
app.enable('trust proxy')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    let realhost = req.headers['x-forwarded-host']
    if (typeof realhost !== 'string') realhost = req.host
    else realhost = realhost.split(',')[0].trim()
    req.headers.host = realhost
    next()
})

import cookieParser from 'cookie-parser'
app.use(cookieParser())

const api = express.Router()
app.use('/api', api)

import site from './api/site.js'
api.use('/site', site)

import pages from './api/pages.js'
api.use('/page', pages)

import posts from './api/posts.js'
api.use('/post', posts)

import auth from './api/auth.js'
api.use('/auth', auth)

import { createServer } from 'node:http'
import { httpServerHandler } from 'cloudflare:node'
const server = createServer(app)
export default httpServerHandler(server)
