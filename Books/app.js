require('dotenv').config()

const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

const ConnectDB = require('../Books/config/db')

const Books = require('../Books/model/book')

// checking status
app.get('/status', (req, res)=>{
    res.status(200).json({message: 'Book Service working okay'})
})


// Routes
app.get('/books', async(req, res)=>{
    try{
        if(!res.status == 200){
            return res.status(500).json({error: 'Not your fault... something went bad on our end'})
        }
        else{
            const books = await Books.find()
    
            if(!books){
                return res.status(200).json({messge: 'There are no books at the moment'})
            }
            return res.status(200).json(books)
        }
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
})

app.post('/books', async (req, res)=>{
    const new_book = await Books.create({
        title: req.body.title,
        author: req.body.author,
        number_of_pages: req.body.number_of_pages,
        publisher: req.body.publisher
    })
    console.log('A new book has been added successfully')
    res.status(201).json(new_book)
})

app.get('/books/:id', async(req, res)=>{
    try{
        const buk = await Books.findById(req.params.id)

        if(!buk){
            return res.status(404).json({message: 'Our bad... we don\'t have the book you are looking for'})
        }
        return res.json(buk)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
})

// connectDB
ConnectDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`)
})