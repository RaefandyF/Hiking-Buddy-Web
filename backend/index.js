const express = require("express")
const app = express()
const port = 8080
const customerRouter = require('./routes/customerRoute')

app.use(express.json())

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use('/customer', customerRouter)

app.get('/', (req,res) =>{
    res.json({"message": "ok"})
})

app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`)
})
