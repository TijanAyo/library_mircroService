const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Customer = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone_number:{
        type: String,
        required: true
    },
    additional_infor:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Student', Customer)
