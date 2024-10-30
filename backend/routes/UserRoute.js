const express = require('express')
const router = express.Router()
const uc = require('../services/UserController')

// get current user login data \
/**
 * @swagger 
 * /customer/get-current-login:
 *  get: 
 *    summary: get current login data 
 *    tags: [Customer]
 *    parameters:
 *     - in: 
 *       name: userid
 *       schema: 
 *         type: string 
 *       description: get detail current login user data 
 */
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

