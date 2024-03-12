const db = require('./db')
const helper = require('../helper')

// get all customer data 
const getAllCustomerData = async () => {
    const rows = await db.query(`SELECT * FROM Customer`)
    const data = helper.checkEmptyRows(rows)

    return {
        data
    }
}

module.exports = {
    getAllCustomerData
}