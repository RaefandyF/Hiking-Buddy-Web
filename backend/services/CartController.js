const db = require('./db')

// add new data to cart 
const addToCartProductBusinessUnit = async (newData) => {
    const result = await db.query(`
        INSERT INTO CartBusinessUnitProduct 
        VALUES
        ('${newData.UserId}', '${newData.BusinessProductId}', ${newData.quantity})
        `)
    
    io.emit('addcart', newData)

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

// get data cart product from business unit 
const getDataCartBusinessUnit = async () => {
    const result = await db.query(`
            SELECT cbu.Userid,
            cbu.quantity,
            bup.businessunitproductid, 
            bp.businessunitproductname, 
            bp.businessunitproductprice
            FROM cartbusinessunitproduct cbu 
            JOIN 
            businessunitproductconnect bup ON cbu.businessunitproductid = bup.businessunitproductid 
            JOIN 
            businessunitproduct bp ON bup.businessunitproductid = bp.businessunitproductid        
        `)
        
        
        return {
            "status": "success", 
            "data": result
        }
}


module.exports = {
    addToCartProductBusinessUnit,
    getDataCartBusinessUnit
}
