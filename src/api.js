import express from 'express'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import { get_config } from './env/config.js'
import session from 'express-session'
const config = get_config()
app.use(
    session({
        secret: await config.get('cookie_secret'),
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'strict'
        }
    })
)

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
