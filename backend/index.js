const express = require("express")
const app = express()
const port = 8080
const customerRouter = require('./routes/customerRoute')
const registerRouter = require('./routes/registerRoute')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use('/customer', customerRouter)
app.use('/customer', registerRouter)

app.get('/', (req,res) =>{
    res.json({"message": "ok"})
})

app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`)
})
