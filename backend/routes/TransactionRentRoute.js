const express = require('express')
const router = express.Router()
const trheader_controller = require('../services/TransactionRentHeaderController')

// add new transaction rent header
router.post(`/add-transaction-rent-header`, async(req, res)=>{
    try {
        res.json(await trheader_controller.addNewTransactionRentHeader(req.body))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "not found !"
        })
    }
})

// get transaction rent header by user 
router.get('/get-transaction-rent-header', async(req, res)=>{
    try {
        res.json(await trheader_controller.getTransactionRentHeader(req.query))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "route not found !"
        })
    }
})


module.exports = router