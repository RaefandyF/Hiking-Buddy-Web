const express = require('express')
const router = express.Router()
const businessUnitProductController = require('../services/BusinessUnitProductController')

router.get('/get-product-umkm/:businessunitid', async(req, res)=>{
    try {
        res.json(await businessUnitProductController.getBusinessUnitProductUmkm(req.params.businessunitid))
    } catch (error) {
        res.status(400).send({
            "status": "error", 
            "message": 'cannot get product umkm'
        })
    }
})

module.exports = router