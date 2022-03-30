const mongoose = require('mongoose')

const ConnectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.dbURI)
        console.log(`Order\'s DB connected`)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = ConnectDB