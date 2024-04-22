const db = require('./db')

// create new user 
const registerUser = async (newuser) => {

    if(newuser.Userpassword.length == 0){
        return {
            "status": "error", 
            "message": "data cannot be empty !"
        }
    }

    if(newuser.Userpassword == newuser.Userconfirmpassword){
        
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

    return {
        "status": "failed", 
        "message": "password and confirm password must be same !"
    }

}

module.exports = {
    registerUser
}
