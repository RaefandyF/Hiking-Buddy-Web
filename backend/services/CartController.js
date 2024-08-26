const db = require('./db')

// add new data to cart 
const addToCartProductBusinessUnit = async (newData) => {
    const result = await db.query(`
        INSERT INTO CartBusinessUnitProduct 
        VALUES
        ('${newData.UserId}', '${newData.BusinessProductId}', ${newData.quantity})
        `)

    if(result.affectedRows == 0){
        return {
            "status": "error", 
            "message": "data cannot be inserted"
        }
    }

    return {
        "status": "success", 
        "message": "data has successfully inserted !"
    }
}

module.exports = {
    addToCartProductBusinessUnit
}
