const express = require('express')
const router = express.Router()
const cartController = require('../services/cartController')

// route add new data 
router.post('/add-new-product-to-cart', async (req, res) => {
    try {
        res.json(await cartController.addToCartProductBusinessUnit(req.body))
    } catch (error) {
        res.json({
            "status": "error", 
            "message": "not found"
        })
    }
})

module.exports = router
