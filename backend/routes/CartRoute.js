const express = require('express')
const router = express.Router()
const cartController = require('../services/CartController')



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

// route get all data of cart 
router.get('/get-business-products-cart', async (req, res) => {
    try {
        res.json(await cartController.getDataCartBusinessUnit())
    } catch (error) {
        res.json({
            "status": "error", 
            "message": error
        })
    }
})

module.exports = router
