const db = require('./db')

// add transaction detail rent tent
const addNewTransactionDetailRentTent = async (data) => {
    const result = db.query(`
        INSERT INTO TransactionDetailRentTent 
        VALUES ('${data.TransactionRentid}', '${data.Tentid}', '${data.Quantity}')
    `)
}

module.exports = {
    addNewTransactionDetailRentTent
}