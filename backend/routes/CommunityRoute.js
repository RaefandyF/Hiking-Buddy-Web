const express = require('express')
const router = express.Router()
const cr = require('../services/CommunityController')
const img_controller = require('../services/UploadImage')


router.post('/add-new-community', async(req, res)=>{
    try {
        res.json(await cr.addNewCommunity(req.body))
    } catch (error) {
        console.log(error)
        res.status(404).send({
            "status": "error", 
            "message": "not found !"
        })
    }
})

router.post('/add-new-community-connect', async (req, res)=>{
    try {
        res.json(await cr.addNewCommunityConnect(req.body))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "not found !"
        })
    }
})


router.post('/upload-img-community', async (req, res) => {
    try {
        res.json(await img_controller.uploadImageCommunity(req.body))
    } catch (error) {
        console.log(error)
        res.status(404).send({
            "status": "error", 
            "message": "route not found !"
        })
    }
})

// get all community data
/**
 * @swagger
 * /community/get-all-community:
 *  get:
 *    summary: get all community data 
 *    tags: [Community]
 *    responses:
 *      200: 
 *        description: success 
 */
router.get('/get-all-community', async (req, res)=>{
    try {
        res.json(await cr.getAllCommunity())
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "route not found !"
        })
    }
})

router.get(`/get-detail-community`, async(req, res)=>{
    try {
        res.json(await cr.getCommunityById(req.query.id))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "route not found"
        })
    }
})

// get comment detail community 
/**
 * @swagger
 * /community/get-comment-community?communityid={id}:
 *  get: 
 *    summary: get community comment all 
 *    tags: [Community]
 *    parameters: 
 *    - in: query 
 *      name: communityid 
 *      schema: 
 *        type: string 
 *      description: get comment id with detail comment data
 */
router.get('/get-comment-community', async (req, res)=>{
    try {
        res.json(await cr.getCommentCommunity(req.query.communityid))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "route not found !"
        })
    }
})


router.get('/get-reply-comment', async(req, res)=>{
    try {
        res.json(await cr.getReplyComment(req.query.commentid, req.query.communityid))
    } catch (error) {
        res.status(404).send({
            "status": "error", 
            "message": "route not found!"
        })
    }
})

module.exports = router