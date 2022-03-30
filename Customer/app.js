require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const ConnectDB = require('../Customer/config/db')
const Customer = require('../Customer/model/customer')



app.get('/status', (req, res)=>{
    return res.status(200).json({message: `Customer service working on port: ${process.env.PORT}`})
})

app.post('/customer', async(req, res)=>{
    const new_customer = await Customer.create({
        name: req.body.name,
        address: req.body.address,
        phone_number: req.body.phone_number,
        additional_info: req.body.additional_info
    })
    console.log('A new user has been created')
    return res.status(201).json(new_customer)
})

app.get('/customer', async(req, res)=>{
    try{
        const customer = await Customer.find()

        if(!customer){
            return res.status(404).json({message: 'We don\'t have any customers at the moment.. check back later'})
        }
        return res.status(200).json(customer)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
    
})

app.get('/customer/:id', async(req, res)=>{
    const find_customer = await Customer.findById(req.params.id)

    if(!find_customer){
        return res.status(404).json({message: 'Ohoh...Looks like you spelt the user wrongly'})
    }
    return res.status(200).json(find_customer)
})

// Connect DB
ConnectDB()

const PORT = process.env.PORT || 3030

app.listen(PORT, ()=>{
    console.log(`Listening on Port: ${PORT}`)
})