const mongoose = require('mongoose')

const ConnectDB = async() =>{
    try{
        const conn = mongoose.connect(process.env.dbURI)
        console.log('Book Service DB connected')
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}


module.exports = ConnectDB