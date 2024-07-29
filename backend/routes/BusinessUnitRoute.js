const express = require('express')
const router = express.Router()
const businessUnitController = require('../services/BusinessUnitController')

// show all business unit in specific mountain 
router.get('/get-business-unit/:mountainid', async(req, res)=>{
    try {
        res.json(await businessUnitController.getAllBusinessUnit(req.params.mountainid))
    } catch (error) {
        res.status(400).send({
            "status": "failed", 
            "message": "cannot get business unit data"
        })
    }
})

module.exports = router
