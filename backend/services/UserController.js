const db = require('./db')

// get current user login 
const getCurrentLogin = async (query) => {
    console.log(query)
    const result = await db.query(`
        SELECT * FROM Users WHERE Userid = '${query.userid}';
    `)

    return {
        "status": "success", 
        "data": result
    }
}

module.exports = {
    getCurrentLogin
}