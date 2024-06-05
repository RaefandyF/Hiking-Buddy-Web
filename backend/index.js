const express = require("express")
const app = express()
const port = 8080
const cookieParser = require('cookie-parser')

const customerRouter = require('./routes/customerRoute')
const registerRouter = require('./routes/registerRoute')
const loginRouter = require('./routes/loginRoute')
const articleRouter = require('./routes/ArticleRoute')
const categoryArticleRoute = require(`./routes/ArticleCategoryRoute`)
const transactionRentRoute = require('./routes/TransactionRentRoute')
const communityRoute = require(`./routes/CommunityRoute`)
const tentRoute = require('./routes/TentRoute')
const userRoute = require('./routes/UserRoute')
const mountainRoute = require('./routes/mountainRoute')
const cookiesRoute = require('./routes/CookiesRoute')

const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use('/customer', loginRouter)
app.use('/customer', customerRouter)
app.use('/customer', registerRouter)
app.use('/customer', userRoute)
app.use('/article', articleRouter)
app.use('/article', categoryArticleRoute)
app.use('/transaction-rent', transactionRentRoute)
app.use('/community', communityRoute)
app.use('/tent', tentRoute)
app.use('/mountain', mountainRoute)
app.use('/cookies', cookiesRoute)

app.get('/', (req,res) =>{
    res.json({"message": "ok"})
})

app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`)
})
