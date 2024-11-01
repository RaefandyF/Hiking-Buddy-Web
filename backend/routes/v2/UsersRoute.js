const express = require('express')
const router = express.Router()
const db = require('../../services/db')
const jwt = require('jsonwebtoken')
const AuthenticationToken = require('./middleware/authenticationToken')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

// router login data 
router.post('/login', async (req, res)=>{
    const {email, password} = req.body 
    console.log(SECRET_KEY)
    const querylog = `SELECT UserId ,UserEmail FROM Users WHERE UserEmail = ? AND UserPassword = ?`
    const result = await db.query(querylog, [email, password])

    if (result.length === 0) {
        return res.status(404).send({
            message: "invalid credentials"
        });
    }

    const payload = { result };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.json({
        message: "success",
        token: token
    });
})

// get current login data user 
router.get('/get-current-login', AuthenticationToken ,async (req, res)=>{
    res.json({
        "status": "success", 
        "message": req.user
    })
})


module.exports = router

