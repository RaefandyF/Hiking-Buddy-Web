const express = require('express')
const router = express.Router()
const routeController = require('../services/RouteController')

// get all mountain data thta proper 
router.get(`/get-all-mountain`, async(req, res) => {
    try {
        res.json(await routeController.getAllMontainData())
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": error
        })
    }
})

// get detail mountain 
router.get('/get-detail-mountain/:id', async(req, res)=>{
    try {
        res.json(await routeController.getDetailRouteMountain(req.params.id))
    } catch (error) {
        res.status(404).send({
            "status": "failed", 
            "message": error
        })
    }
})

// get rating of the mountain 
router.get('/get-rating-data/:id', async (req, res)=>{
    try {
        res.json(await routeController.getAllRatingDetail(req.params.id))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "cannot get data"
        })
    }
})

module.exports = router