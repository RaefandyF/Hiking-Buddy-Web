const db = require('./db')

// get business unit product umkm 
const getBusinessUnitProductUmkm = async (businessunitid) => {
    const result = await db.query(`
        SELECT bup.BusinessUnitProductName, bup.BusinessUnitProductPrice 
        FROM BusinessUnit bu JOIN BusinessUnitProductConnect bupc ON bu.BusinessUnitId = bupc.BusinessUnitId 
        JOIN BusinessUnitProduct bup ON bupc.BusinessUnitProductId = bup.BusinessUnitProductId 
        WHERE bu.BusinessUnitId = '${businessunitid}';
        `)

    return {
        "status": "success", 
        "data": result
    }
}

module.exports = {
    getBusinessUnitProductUmkm
}