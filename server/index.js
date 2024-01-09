import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from './routes/users.js'
import videoRouter from './routes/videos.js'
import commentRouter from './routes/comments.js'
import authRouter from './routes/auths.js';
import cookieParser from "cookie-parser";
const app = express()
dotenv.config()// without this it will not work 
  
const connect = ()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to mongo db");
        
    }).catch((err)=>{
        throw err;
    })
} 
app.use(cookieParser())
app.use(express.json())//otherwise it will not allow you to use json file
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/video',videoRouter)
app.use('/api/comment',commentRouter)
// for specific error handling response
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})
app.listen(8800,()=>{
    connect()
    console.log("Connnected! ");        
})