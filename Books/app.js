require('dotenv').config()

const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// chhecking status
app.get('/status', (req, res)=>{
    res.status(200).send('Going okay')
})


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`)
})