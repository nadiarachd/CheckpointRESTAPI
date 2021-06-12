const mongoose=require('mongoose')
const config = require('config')

const connectDB =async ()=>{
    try {
        await mongoose.connect(config.get("MONGOURI"),{ useUnifiedTopology: true,useNewUrlParser: true })
        console.log('Mongoose connected')
    } catch (error) {
        console.log("error")
    }



}
module.exports=connectDB;