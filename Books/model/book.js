const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Books = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    // nop - Number of pages
    number_of_pages:{
        type: Number,
        required: false
    },
    publisher:{
        type:String,
        required: false
    }
},
    {timestamps: true}
)
module.exports = mongoose.model('books', Books)