const db = require('./db')

// create new user 
const registerUser = async (newuser) => {
    const result = await db.query(`
        INSERT INTO Users VALUES
        ('${newuser.Userid}', '${newuser.Userfullname}', 
            '${newuser.Userpassword}', 
            '${newuser.Useremail}', '${newuser.UserDOB}', '${newuser.Userrole}')
    `)

    let msg = "your account cannot be register !"


    if(result.affectedRows){
        msg = "register successfully !"
    }

    return {
        "message": msg
    }
}

module.exports = {
    registerUser
}
