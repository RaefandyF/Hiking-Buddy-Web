const express = require('express')
const router = express.Router()
const bagCarrierController = require('../services/BagCarrierController')

// get carrier datas 
router.get('/list-bag-carrier', async (req, res)=>{
    try {
        res.json(await bagCarrierController.getListProductBagRentData())
    } catch (error) {
        res.status(400).send({
            "status": "error",
            "message": error
        })
    }
})

module.exports = router
