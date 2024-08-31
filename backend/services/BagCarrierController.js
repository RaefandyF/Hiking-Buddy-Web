const db = require('./db')

// const get list home product data (bag)
// const getListProductBagRentData = async () => {
//         const result = await db.query(`SELECT * FROM bagcarier`)
//         console.log(await db.query(`SELECT * FROM bagcarier`))
//     return {
//         "status": "success", 
//         "data": result
//     }
// }
const getListProductBagRentData = async () => {
    const result = await db.query(`SELECT * FROM bagcarier`)

    return {
        "status": "success", 
        "data": result
    }
}

module.exports = {
    getListProductBagRentData
}

