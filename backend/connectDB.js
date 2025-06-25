const { default: mongoose } = require("mongoose")

const connectDb=async ()=>{
    try {
        const db=await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to the DB ${db.connection.name}`)
    } catch (error) {
        console.log(error.message ,"You Cannot Connect to the DB")
    }
}

module.exports = connectDb