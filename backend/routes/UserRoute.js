const express = require('express')
const router = express.Router()
const uc = require('../services/UserController')


router.get('/get-current-login', async (req, res) => {
    try {
        res.json(await uc.getCurrentLogin(req.query))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "route not found !"
        })
    }
})

module.exports = router

