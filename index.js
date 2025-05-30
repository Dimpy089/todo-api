const dotenv=require('dotenv');
dotenv.config();
const cors = require('cors');

const express=require("express");
const mongoose=require('mongoose');
const connectDB = require('./config/db');
connectDB();
const todoRoutes=require('./routes/todoRoutes');


const app=express();
const PORT=process.env.PORT || 5000;
app.use(cors({
    origin: "http://127.0.0.1:5500",  // or use "*" to allow all during dev
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use('/api',todoRoutes);

app.get("/",(req,res)=>{
    res.send("Hello world!...my API is working");
});


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

