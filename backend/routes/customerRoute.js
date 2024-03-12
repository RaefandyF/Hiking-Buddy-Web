const express = require('express')
const router = express.Router()
const customers = require('../services/customerController')

// get all customer 
router.get('/', async(req, res) =>{
    try{
        res.json(await customers.getAllCustomerData())
    } catch(err){
        res.json({
            "message": err.message
        })
    }
})

module.exports = router

