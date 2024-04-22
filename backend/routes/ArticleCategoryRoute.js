const express = require('express')
const router = express.Router()
const acc = require('../services/ArticleCategoryController')

// add new category route 
router.post('/add-new-category', async (req, res)=>{
    try {
        res.json(await acc.addNewCategory(req.body))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "data error"
        })
    }
})

// add new article category connect
router.post('/add-article-category-connect', async (req, res) => {
    try {
        res.json(await acc.addNewArticlecategoryConnect(req.body))
    } catch (error) {
        res.send({
            "status": "error", 
            "message": "connecting failed"
        })
    }
})

module.exports = router