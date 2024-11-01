const jwt = require('jsonwebtoken')
require('dotenv').config()

function AuthenticationToken(req, res, next){
    
    const SECRET_KEY = process.env.SECRET_KEY
    // get token from header 
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1];
    console.log(SECRET_KEY)
    console.log(jwt.decode(token, {complete: true}))
    if(!token){
        return res.status(404).json({
            message: 'Access denied: You must have token !'
        })
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err){
            return res.status(404).send({
                message: "Invalid token"
            })
        }
        req.user = user 
        next()
    })
}

module.exports = AuthenticationToken