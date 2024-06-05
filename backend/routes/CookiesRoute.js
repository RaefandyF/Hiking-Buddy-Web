const express = require('express')
const router = express.Router()
const cookie = require('cookie')

// pass cookies data 
router.get('/pass-cookie/:id', async(req, res) => {
    console.log(req.params)
    res.setHeader('Cookies-set', cookie.serialize('mountainid', req.params.id, {
        maxAge: 60 * 60 
    }))

    res.status(200).send({
        'message': 'cookies-set'
    })
})

module.exports = router