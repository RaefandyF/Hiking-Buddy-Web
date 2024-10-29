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
 *      tags: [Community]
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
/**
 * @swagger
 * /community/add-new-community-connect:
 *  post:
 *      summary: create new community connected with userid data (add new community connect)
 *      description: endpoint for create new community data connect
 *      tags: [Community]
 *      requestBody:
 *          required: true 
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties: 
 *                          Userid:
 *                              type: string 
 *                              description: Userid must start with US followed by 5 characters of number
 *                              example: US99999
 *                          Communityid:
 *                              type: string
 *                              description: Communityid can be filled here 
 *                              example: CM99999
 *                      required:
 *                         - Userid
 *                         - Communityid
 */
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
/**
 * @swagger
 * /community/upload-img-community:
 *  post:
 *      summary: upload image community (add new community connect)
 *      description: endpoint for create new community data connect
 *      tags: [Community]
 *      requestBody:
 *          required: true 
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties: 
 *                          Userid:
 *                              type: string 
 *                              description: Userid must start with US followed by 5 characters of number
 *                              example: US99999
 *                          Communityid:
 *                              type: string
 *                              description: Communityid can be filled here 
 *                              example: CM99999
 *                      required:
 *                         - Userid
 *                         - Communityid
 */
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

// get detail community data 
/**
 * @swagger 
 * /community/get-detail-community?id={id}: 
 *  get: 
 *    summary: get detail community data 
 *    tags: [Community]
 *    parameters: 
 *     - in: query 
 *       name: id
 *       schema:
 *         type: string 
 *       description: get detail community
 */
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

// get reply comment specific and community 
/**
 * @swagger
 * /community/get-reply-comment?commentid={commentid}&communityid={communityid}:
 *  get: 
 *    summary: reply community comment data 
 *    tags: [Community]
 *    parameters: 
 *    - in: query 
 *      name: communityid 
 *      schema: 
 *        type: string 
 *      description: get community id with detail comment data
 *    - in: query
 *      name: commentid 
 *      schema: 
 *        type: string 
 *      description: get comment id in community id data 
 */
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