const express = require('express')
const router = express.Router()
const db = require('../../services/db')
const img_controller = require('../../services/UploadImage')

const multer = require('multer')
const upload = multer()

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
router.post('/upload-img-thread',upload.single('imageName'), async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
        res.json(await img_controller.uploadImageCommunity(req.body, req.file))
    } catch (error) {
        console.log(error)
        res.status(404).send({
            "status": "error", 
            "message": error.message
        })
    }
})

// give like v2 
router.post('/add-like-thread', async(req,res)=>{
    // get the data from request 
    const {ThreadId, UserId} = req.body 

    // validate empty 
    if(!ThreadId || !UserId){
        return res.status(404).send({
            "status": "failed", 
            "message": "field cannot be empty !"
        })
    }

    // add to table thread like 
    const sqlIn = `INSERT INTO ThreadLike VALUES (?,?)`
    const result = await db.query(sqlIn, [ThreadId, UserId])

    // check is success insert 
    if(result.affectedRows == 0){
        return res.status(404).send({
            "status": "failed", 
            "message": "failed insert data"
        })
    }

    // select query ThreadPostHeader 
    const select2 = `SELECT ThreadId, TotalLike FROM ThreadPostHeader`
    const result2 = await db.query(select2)

    let temp1;
    let temp2;

    result2.map((re)=>{
        if(re.ThreadId == ThreadId){
            temp1 = ThreadId
            temp2 = re.TotalLike 
            return  
        }
    })

    // setelah dicari gaada 
    if(!temp1){
        return res.status(404).send({
            "status": "failed", 
            "message": "cannot find the thread for like"
        })
    }
    else{
        const sqlQueryLike = `UPDATE ThreadPostHeader SET TotalLike = ? WHERE ThreadId = ?`
        const result3 = await db.query(sqlQueryLike, [parseInt(temp2)+1, temp1])

        if(result3.affectedRows > 0){
            return res.status(200).send({
                "status": "success", 
                "message": "success updated the data !"
            })
        }
    }
})

module.exports = router