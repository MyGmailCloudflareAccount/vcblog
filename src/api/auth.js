import express from 'express'
const auth = express.Router()

import { get_config } from '../env/config.js'
const config = get_config()
const jwt_secret = await config.get('jwt_secret')
const true_password = await config.get('password')

import jwt from 'jsonwebtoken'
const jwt_expire = 1 * 60 * 60
const cookie_name = 'auth_token'

auth.post('/login', (req, res) => {
    const { password } = req.body
    if (typeof password !== 'string' || password === '') {
        res.sendStatus(401)
        return
    }

    if (password !== true_password) {
        res.sendStatus(401)
        return
    }

    const token = jwt.sign({}, jwt_secret, { expiresIn: jwt_expire })
    res.cookie(cookie_name, token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: jwt_expire * 1000
    })

    res.sendStatus(200)
})

export const requireAuth = (req, res, next) => {
    const token = req.cookies[cookie_name]
    if (!token) {
        res.sendStatus(401)
        return
    }

    try {
        jwt.verify(token, jwt_secret)
        next()
    } catch {
        res.clearCookie(cookie_name)
        res.sendStatus(401)
    }
}

auth.get('/status', requireAuth, (req, res) => {
    res.sendStatus(200)
})

auth.post('/logout', requireAuth, (req, res) => {
    res.clearCookie(cookie_name)
    res.sendStatus(200)
})

export default auth
