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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });
  
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
  
app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`)
})