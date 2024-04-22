const db = require('./db')

// srvices login 
const loginUser = async (data) => {
    const result = await db.query(`
        SELECT Userrole FROM Users 
        WHERE Useremail = '${data.Useremail}'
        AND 
        Userpassword = '${data.Userpassword}'
    `)

    if(result.length == 0){
        return {
            "status": "error", 
            "message": "not found user !"
        }
    }

    return{
        "status": "success", 
        "data": result
    }
}

module.exports = {
    loginUser
}