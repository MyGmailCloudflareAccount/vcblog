import express from 'express'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const api = express.Router()
app.use('/api', api)

import { createServer } from 'node:http'
import { httpServerHandler } from 'cloudflare:node'
const server = createServer(app)
export const apiHandler = httpServerHandler(server)

import site from './api/site.js'
api.use('/site', site)
