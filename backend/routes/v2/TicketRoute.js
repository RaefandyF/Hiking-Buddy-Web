const express = require('express')
const router = express.Router()
const db = require('../../services/db')
const {v4: uuidv4} = require('uuid')
const AuthenticationToken = require('./middleware/authenticationToken')

// add new ticket data 
router.post('/insert-new-ticket', async(req, res)=>{

    try {

        const {TicketName, TicketCity, TicketProvince, DistanceToPeak, TicketPrice, Longitude, Latitude} = req.body 
    
        // check input cannot be empty 
        if(!TicketName || !TicketCity || !TicketProvince || !DistanceToPeak || !TicketPrice || !Longitude || !Latitude){
            return res.status(200).send({
                "message": "failed", 
                "message": "data inputted cannot be empty !"
            })
        }

        // generate ticket id 
        const ticketId = uuidv4()

        // insert data to database
        const sql = `INSERT INTO Ticket VALUES (?,?,?,?,?,?,?,?)` 
        const insertTicket = await db.query(sql, [
            ticketId, 
            TicketName, 
            TicketCity, 
            TicketProvince, 
            DistanceToPeak, 
            TicketPrice, 
            Longitude, 
            Latitude
        ])

        if(insertTicket.affectedRows == 0){
            return res.status(404).send({
                "status": "failed", 
                "message": "cannot inserted the data"
            })
        }

        // sucess resp
        return res.status(200).send({
            "status": "success", 
            "message": "successful insert the ticket data !"
        })
        
    } catch (error) {
        return res.status(400).send({
            "status": "failed", 
            "message": error.message
        })
    }
})

// get all ticket 
router.get('/get-list-ticket', async(req, res)=>{
    try {
        // read all ticket 
        const query = `SELECT * FROM Ticket`
        const result = await db.query(query)

        return res.status(200).send({
            "status": "success", 
            "data": result
        })

    } catch (error) {
        res.status(404).send({
            "status": "sucess", 
            "message": error.message
        })
    }
})

// buy the ticket 
router.post('/buy-ticket', AuthenticationToken , async(req, res)=>{

    try {
        // request for transaction header and detail
        const {UserId,ticketItems, PaymentMethod, TicketPaymentDate} = req.body

        const TransactionId = uuidv4()
        let totalAmount = 0
        let totalQuantity = 0
        // get data from obeject ticket items for get total amount data and total quantity 
        await Promise.all( ticketItems.map(async(ti)=>{
            const querySelect = `SELECT TicketPrice FROM Ticket WHERE TicketId = ?`
            const result = await db.query(querySelect, [
                ti.TicketId
            ])

            // get every data after result (TicketPrice)
            result.map((price)=>{
                totalQuantity += ti.Quantity 
                temp = ti.Quantity * price.TicketPrice
                totalAmount += temp 
            })
            
            
        }))

        // buy new ticket 
        const query = `INSERT INTO TicketTransactionHeader VALUES (?,?,?,?,?)`
        const result1 = await db.query(query, [
            TransactionId, 
            UserId, 
            totalAmount, 
            PaymentMethod, 
            TicketPaymentDate
        ])

        if(result1.affectedRows == 0){
            return res.status(404).send({
                "status": "failed", 
                "message": "cannot insert new data !"
            })
        }

        // insert data detail every ticket items 
        let isValid = true
        Promise.all(ticketItems.map(async(ti)=>{
            const query2 = `INSERT INTO TicketTransactionDetail VALUES (?,?,?)`
            const result2 = await db.query(query2, [
                TransactionId, 
                ti.TicketId, 
                ti.Quantity
            ])

            if(result2.affectedRows == 0){
                isValid = false 
                return 
            }
        }))
        

        if(!isValid){
            return res.status(404).send({
                "status": "failed", 
                "message": "cannot inserted transaction detail"
            })
        }

        return res.status(200).send({
            "status": "success", 
            "message": "successfully buy ticket in hiking buddy !"
        })

    } catch (error) {
        return res.status(404).send({
            "status": "failed", 
            "message": error.message
        })
    }
})

// show trending ticket data 
router.get('/get-trending-ticket', async(req, res) => {

    try {
        // query untuk mengambil data trending dari terbanyak 
        const queryTrend = `SELECT 
        T.TicketId,
        T.TicketName,
        T.TicketCity,
        T.TicketProvince,
        SUM(TD.Quantity) AS TotalQuantitySold
        FROM 
            TicketTransactionDetail TD
        JOIN 
            Ticket T ON TD.TicketId = T.TicketId
        GROUP BY 
            T.TicketId, T.TicketName, T.TicketCity, T.TicketProvince
        ORDER BY 
            TotalQuantitySold DESC
        LIMIT 10;`

        // mengambil result query 
        const resultQuery = await db.query(queryTrend)

        return res.status(200).send({
            "status": "success", 
            "data": resultQuery
        })

    } catch (error) {
        return res.status(404).send({
            "status": "success", 
            "message": error.message
        })
    }

})

module.exports = router 