const express = require('express')
const router = express.Router()
const articleController = require('../services/ArticleController')

// Insert new article 
router.post(`/add-article`, async(req, res)=>{
    try{
        res.json(await articleController.addNewArticle(req.body))
    }catch(error){
        console.log(error)
        res.status(400).send({
            "status": "error", 
            "message": "error"
        })
    }
})

// article author insert 
router.post('/add-author-article', async(req, res)=>{
    try {
        res.json(await articleController.addArticleAuthor(req.body))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "not found !"
        })
    }
})

// get top article page article limit 3
router.get('/get-top-article', async(req,res)=>{
    try {
        res.json(await articleController.GetTopArticle())
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "data not found "
        })
    }
})

// get detail article 
router.get(`/get-detail-article/:id`, async(req, res)=>{
    try {
        res.json(await articleController.getDetailArticle(req.params.id))
    } catch (error) {
        res.status(404).send({
            "status": "failed", 
            "error": error
        })
    }
})

module.exports = router