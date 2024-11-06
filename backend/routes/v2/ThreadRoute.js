const express = require('express')
const router = express.Router()
const db = require('../../services/db')
const img_controller = require('../../services/UploadImage')
const {v4: uuidv4} =  require('uuid')
const multer = require('multer')
const { bucket } = require('../../services/firebaseDb')

const upload = multer({
    storage: multer.memoryStorage()
})

// get all thread v2 
router.get('/get-all-thread', async(req, res)=>{
    try {
        const queryGet = "SELECT th.ThreadId,th.ThreadDescription, th.ThreadDateRelease, thp.TotalLike, thp.TotalComment, thp.TotalShare, us.UserFullName FROM Thread th JOIN ThreadPostHeader thp ON th.ThreadId = thp.ThreadId JOIN Users us ON us.UserId = thp.UserId"
        const threads = await db.query(queryGet)

        // ambil data dari firebase storage
        const threadWithImages = await Promise.all(threads.map(async(tr)=>{
            const file = bucket.file(`images/${tr.ThreadId}`)

            let imageUrl = null;
            try {
                const [url] = await file.getSignedUrl({
                action: 'read',
                expires: '03-09-2500'
                });
                imageUrl = url;
            } catch (error) {
                console.error(`Error fetching image for ThreadId ${tr.ThreadId}:`, error);
            }

            return {...tr, imageUrl: imageUrl}

        }))

        res.status(200).send({
            "status": "success", 
            "threads": threadWithImages
        })
    } catch (error) {
        res.status(404).send({
            "status": "failed", 
            "message": error.message
        })
    }
})

// add new thread v2
router.post('/add-new-thread', upload.single("imageName") , async(req,res)=>{
    // user id diambil dari current login data user 
    const {UserId, ThreadDescription, ThreadDateRelease} = req.body

    // memasukkan data uuid v4
    const ThreadId = uuidv4()

    const sqlquery = "INSERT INTO ThreadPostHeader VALUES (?,?,?,?,?)"
    const sqlquery2 = "INSERT INTO Thread VALUES (?,?,?)"
    const res2 = await db.query(sqlquery2, [ThreadId, ThreadDescription, ThreadDateRelease])
    const res1 = await db.query(sqlquery, [ThreadId, UserId, 0, 0, 0])

    if(res1.affectedRows == 0 && res2.affectedRows == 0){
        res.status(500).send({
            "status": "failed", 
            "message": "data cannot be inserted !", 
        })
    }

     // set file name 
     const fileName = `images/${ThreadId}`
     const file = bucket.file(fileName)
 
     // masukkan data ke firebase storage 
     await file.save(req.file.buffer, {
         metadata: {
             contentType: req.file.mimetype
         }
     })

     res.status(200).send({
        status: "success",
        message: "Data successfully inserted!",
      });
})

// upload img thread v2 
// router.post('/upload-img-thread',upload.single('imageName'), async (req, res) => {
//     try {
//         console.log(req.body)
//         console.log(req.file)
//         res.json(await img_controller.uploadImageCommunity(req.body, req.file))
//     } catch (error) {
//         console.log(error)
//         res.status(404).send({
//             "status": "error", 
//             "message": error.message
//         })
//     }
// })

// give like v2 thread 
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

// add comment data v2 thread 
router.post('/add-thread-comment', async(req, res)=>{
    // bound the data from request 
    const {ThreadId, UserId, CommentData} = req.body

    // add data to table Thread Comment 
    const query1 = `INSERT INTO ThreadComment VALUES (?,?,?)`
    const resultadd_1 = await db.query(query1, [ThreadId, UserId, CommentData])

    // select total comment data for get latest and update 
    const query2 = `SELECT ThreadId, TotalComment FROM ThreadPostHeader WHERE ThreadId = ?`
    const resultQuery = await db.query(query2, [ThreadId])
    
    let temp;
    resultQuery.map((re)=>{
        if(re.ThreadId == ThreadId){
            temp = re.TotalComment
        }
    })

    // update total comment setelah di dapatkan data comment sebeelumnya 
    const sqlUpdate = `UPDATE ThreadPostHeader SET TotalComment = ? WHERE ThreadId = ?`
    const resultUpdate = await db.query(sqlUpdate, [parseInt(temp)+1, ThreadId])

    // check apakah berhasil
    if(resultUpdate.affectedRows > 0 && resultadd_1.affectedRows > 0){
        return res.status(200).send({
            "status": "success", 
            "message": "success give comment data !"
        })
    }

    return res.status(404).send({
        "status": "failed", 
        "message": "failed give comment data !"
    })

})

// get total like v2 
router.get('/get-total-like', async(req, res)=>{
    // ambil dari query thread id yang didapat 
    const {threadId} = req.query 

    // select dari database 
    const sqlQuery = `SELECT TotalLike FROM ThreadPostHeader WHERE ThreadId = ?`
    const result = await db.query(sqlQuery, [threadId])

    return res.status(200).send({
        "status": "success", 
        "data": result
    })
})

// get total comment thread v2 
router.get('/get-total-comment', async(req, res)=>{
    const {threadId} = req.query 

    // query for get total comment of thread 
    const sqlQuery = `SELECT TotalComment FROM ThreadPostHeader WHERE ThreadId = ?`
    const result = await db.query(sqlQuery, [threadId])

    return res.status(200).send({
        "status": "success", 
        "data": result
    })
})

// get total share v2 
router.get('/get-total-share', async(req, res)=>{
    const {threadId} = req.query 

    // query for get 
    const getQuery = `SELECT TotalShare FROM ThreadPostHeader WHERE ThreadId = ?`
    const result = await db.query(getQuery, [threadId])

    return res.json({
        "status": "success", 
        "data": result
    })
})

module.exports = router