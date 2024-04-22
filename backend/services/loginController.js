const db = require('./db')

// srvices login
const loginUser = async (data) => {

    if(data.Useremail.length != 0 || 
        data.Userpassword.length != 0){
            
            const result = await db.query(`
                SELECT * FROM Users 
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
        else{
            return {
                "status": "error", 
                "message": "data cannot be empty !"
            }
        }

}

module.exports = {
    loginUser
}