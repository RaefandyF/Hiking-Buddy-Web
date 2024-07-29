const db = require('./db')

// get all business unit 
const getAllBusinessUnit = async(mountainid) => {
    const result = await db.query(`
            SELECT * FROM MountainConnect mc 
            JOIN BusinessUnit bu 
            ON mc.BusinessUnitId = bu.BusinessUnitId 
            WHERE MountainId = '${mountainid}'
        `)

    return {
        "status": "success", 
        "data": result
    }
}

module.exports = {
    getAllBusinessUnit
}