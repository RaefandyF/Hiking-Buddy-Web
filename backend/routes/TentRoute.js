const express = require('express')
const router = express.Router()
const tentcontroller = require('../services/TentController')

// add new tent 
router.post('/add-new-tent', async(req, res)=>{
    try {
        res.json(await tentcontroller.addNewTent(req.body))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "route not found !"
        })
    }
}) 

// add new category rent 
router.post('/add-new-category-rent', async(req, res) => {
    try {
        res.json(await tentcontroller.addNewCategoryTent(req.body))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "route not found !"
        })
    }
})

module.exports = router

