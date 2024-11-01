const express = require('express')
const router = express.Router()
const db = require('../../services/db')
const img_controller = require('../../services/UploadImage')

// get all thread v2 
router.get('/get-all-thread', async(req, res)=>{
    const queryGet = "SELECT th.ThreadId,th.ThreadDescription, th.ThreadDateRelease, thp.TotalLike, thp.TotalComment, thp.TotalShare, us.UserFullName FROM Thread th JOIN ThreadPostHeader thp ON th.ThreadId = thp.ThreadId JOIN Users us ON us.UserId = thp.UserId"
    const threads = await db.query(queryGet)

    res.status(200).send({
        "status": "success", 
        "threads": threads
    })
})

// add new thread v2
router.post('/add-new-thread', async(req,res)=>{
    const {UserId, ThreadId, TotalLike, TotalComment, TotalShare, ThreadDescription, ThreadDateRelease} = req.body

    const sqlquery = "INSERT INTO ThreadPostHeader VALUES (?,?,?,?,?)"
    const sqlquery2 = "INSERT INTO Thread VALUES (?,?,?)"
    const res1 = await db.query(sqlquery, [ThreadId, UserId, TotalLike, TotalComment, TotalShare])
    const res2 = await db.query(sqlquery2, [ThreadId, ThreadDescription, ThreadDateRelease])

    if(res1.affectedRows > 0 && res2.affectedRows > 0){
        res.status(200).send({
            "status": "success", 
            "message": "data successfully inserted !"
        })
    }
})

// upload img thread v2 
router.post('/upload-img-thread', async (req, res) => {
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

module.exports = router