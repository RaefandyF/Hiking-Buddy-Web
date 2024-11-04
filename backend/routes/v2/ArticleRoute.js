const express = require('express')
const router = express.Router()
const db = require('../../services/db')

// get all article v2 
router.get('/get-all-article', async(req, res)=>{
    const queryGet = `SELECT * FROM Article`
    const resultQuery = await db.query(queryGet)

    return res.status(200).send({
        "status": "success", 
        "data": resultQuery
    })
})

module.exports = router