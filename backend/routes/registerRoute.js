const express = require('express')
const router = express.Router()
const registerController = require('../services/registerController')

// post: register new user
router.post('/register', async(req, res, next)=>{
    try{
        res.json(await registerController.registerUser(req.body))
    }
    catch(err){
        res.status(400).json({
            "message": "cannot register"
        })
    }
})

module.exports = router