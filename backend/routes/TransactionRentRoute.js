const express = require('express')
const router = express.Router()
const trheader_controller = require('../services/TransactionRentHeaderController')
const trdetail = require('../services/TransactionRentDetail')

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

// add transaction detail tent
router.post('/add-new-transaction-detail-tent', async(req, res)=>{
    try {
        res.json(await trdetail.addNewTransactionDetailRentTent(req.body))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "not found !"
        })
    }
})


module.exports = router