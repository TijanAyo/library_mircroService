const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema({
    title: {
        type: string,
        required: true
    },
    author: {
        type: string,
        required: true
    },
    // nop - Number of pages
    nop:{
        type: number,
        required: false
    },
    publisher:{
        type:string,
        required: false
    }
},
    {timeseries: true}
)