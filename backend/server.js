require('dotenv').config()
const express=require('express');
const cors=require('cors');
const connectDb=require('./connectDB')
const isAuthenticated = require('./middlewares/auth')


const app=express();


connectDb();

app.use(cors());
app.use(express.json());

app.use('/auth',require('./routes/auth'))
app.use('/notes', isAuthenticated , require('./routes/notes'))

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`)
})