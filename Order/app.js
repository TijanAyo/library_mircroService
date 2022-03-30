require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const axios = require('axios')


app.use(express.json())
app.use(express.urlencoded({extended: true}))

const ConnectDB = require('../Order/config/db')
const Order = require('../Order/model/order')


app.get('/status', (req, res)=>{
    return res.status(200).json({
        message: `Order Service running on PORT: ${process.env.PORT}`
    })
})

app.post('/order', async(req, res)=>{
    const new_order = await Order.create({
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        Initial_date: req.body.Initial_date,
        Delivery_date: req.body.Delivery_date,
    })
    console.log('Order made success')
    return res.status(201).json({message: `Order made Success...`})
})

app.get('/order', async (req, res)=>{
    try {
        const list_order = await Order.find()

        if(!list_order){
            return res.status(404).json({message: `No orders`})
        }
        return res.status(200).json(list_order)
    } 
    catch (err) {
        console.log(err)
        process.exit(1)
    }   
})


app.get('/order/:id',  async (req, res)=>{
    
    try{
        const order =  await Order.findById(req.params.id)

        const response = await axios.get("http://localhost:5000/books/" + order.BookID)
        const response2 = await axios.get("http://localhost:5050/customer/" + order.CustomerID)

        return res.status(200).json({Book_title: response.data.title, Student_name: response2.data.name})
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
    
})


// Connect DB
ConnectDB()

const PORT = process.env.PORT || 4040

app.listen(PORT, ()=>{
    console.log(`Listening on Port: ${PORT}`)
})