const db = require('./db')

// get all mountain data that proper 
const getAllMontainData = async () => {
    const result = await db.query(`SELECT * FROM Mountain`)

    return {
        "status": "success", 
        "mountains": result
    }
}

// get detail route mountain 
const getDetailRouteMountain = async (id) => {
    const result = await db.query(`
        SELECT * FROM Mountain WHERE MountainId = '${id}'
    `)

    return {
        "status": "success", 
        "mountain": result
    }
}

// get all rating data 
const getAllRatingDetail = async (mountainid) => {
        const result = await db.query(`
            SELECT * FROM users us 
            JOIN ratingconnect rc 
            ON us.Userid = rc.Userid 
            JOIN mountain mn 
            ON mn.Mountainid = rc.Mountainid 
            WHERE mn.Mountainid = '${mountainid}'
        `)

        return {
            "status": "success", 
            "data": result
        }
}

module.exports = {
    getAllMontainData, 
    getDetailRouteMountain, 
    getAllRatingDetail
}

