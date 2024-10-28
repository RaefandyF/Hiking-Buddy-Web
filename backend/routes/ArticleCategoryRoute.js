const express = require('express')
const router = express.Router()
const acc = require('../services/ArticleCategoryController')

// add new category route 
/**
 * @swagger 
 * /article/add-new-category:
 *  post:
 *      summary: create new category data 
 *      description: endpoint for create new category data 
 *      requestBody:
 *          required: true 
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties: 
 *                          Categoryid:
 *                              type: string 
 *                          Categoryname:
 *                              type: string
 *                      required:
 *                         - Categoryid 
 *                         - Categoryname
 */
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