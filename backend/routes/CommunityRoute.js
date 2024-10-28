const express = require('express')
const router = express.Router()
const cr = require('../services/CommunityController')
const img_controller = require('../services/UploadImage')

// add new community 
/**
 * @swagger 
 * /community/add-new-community:
 *  post:
 *      summary: create new community data (add community)
 *      description: endpoint for create new community data
 *      requestBody:
 *          required: true 
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties: 
 *                          Communityid:
 *                              type: string 
 *                              description: Communityid must start with CM followed by 5 characters of number
 *                              example: CM99999
 *                          Communityname:
 *                              type: string
 *                              description: Communityname can be filled here 
 *                              example: Communityku
 *                          CommunityDateRelease:
 *                              type: date 
 *                              description: input date of community release
 *                              example: 2022-01-01
 *                          Communitydesc:
 *                              type: string 
 *                              description: input the description of community
 *                              example: I love my community
 *                      required:
 *                         - Communityid
 *                         - Communityname
 *                         - CommunityDateRelease
 *                         - Communitydesc
 */
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

// create community connect 
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

// upload image for community 
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

// get detail community data 
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

// get reply comment specific and community 
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