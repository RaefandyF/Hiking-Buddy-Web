const express = require('express')
const router = express.Router()
const loginController = require('../services/loginController')

// login user 
router.post('/login', async(req, res) => {
    try{
        res.json(await loginController.loginUser(req.body))
    } catch(error){
        res.send({
            "status": "error", 
            "message": "cannot login !"
        })
    }
})

module.exports = router