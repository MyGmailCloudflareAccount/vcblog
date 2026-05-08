import express from 'express'
const auth = express.Router()

import { get_config } from '../env/config.js'
const config = get_config()
const true_password = await config.get('password')

auth.post('/login', async (req, res) => {
    const { password } = req.body
    if (typeof password !== 'string' || password === '') {
        res.sendStatus(401)
        return
    }

    if (password !== true_password) {
        res.sendStatus(401)
        return
    }

    req.session.authed = true
    res.sendStatus(200)
})

export const requireAuth = (req, res, next) => {
    if (!req.session.authed) {
        res.sendStatus(401)
        return
    }

    next()
}

export default auth
