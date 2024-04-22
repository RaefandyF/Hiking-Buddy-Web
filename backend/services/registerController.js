const db = require('./db')

// create new user 
const registerUser = async (newuser) => {
    const result = await db.query(`
        INSERT INTO Customer VALUES
        ('${newuser.Customerid}', '${newuser.Customername}', 
            '${newuser.Customerpassword}', '${newuser.Customerfullname}', 
            '${newuser.Customeremail}', '${newuser.CustomerDOB}')
    `)

    let msg = "your account cannot be register !"
    console.log(result)

    if(result.affectedRows){
        msg = "register successfully !"
    }

    return {
        msg
    }
}

module.exports = {
    registerUser
}
