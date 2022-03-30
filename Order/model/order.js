const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')
const Schema = mongoose.Schema

const Order = new Schema({
    BookID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    CustomerID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    // YY-MM-DD
    Initial_date:{
        type: Date,
        required: true
    },
    // YY-MM-DD
    Delivery_date:{
        type: Date,
        required: true
    }
    
})

module.exports = mongoose.model('order', Order)