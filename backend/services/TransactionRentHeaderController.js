const db = require('./db')

// add new transaction rent header 
const addNewTransactionRentHeader = async(data) => {
    const result = await db.query(`
        INSERT INTO TransactionRentHeader VALUES (
            '${data.TransactionRentid}', '${data.Userid}', '${data.Transactiondate}', 
            '${data.Paymentstatus}', '${data.Statusrent}', '${data.Totalpayment}'
        )
    `)

    if(result.affectedRows == 0){
        return {
            "status": "error", 
            "message": "data cannot be inserted !", 
        }
    }

    return {
        "status": "success", 
        "message": "data has been inserted"
    }
}

// get transaction header rent by user 
const getTransactionRentHeader = async (userid) => {
    console.log(userid.userid)

    const result = await db.query(`SELECT 
        *
        FROM TransactionRentHeader 
        WHERE Userid = '${userid.userid}'
    `)

    return {
        "status": "success", 
        "data": result
    }
}

module.exports = {
    addNewTransactionRentHeader,
    getTransactionRentHeader
}