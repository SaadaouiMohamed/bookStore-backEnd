import express from 'express'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/userRoute.js'
import bookRouter from './routers/bookRoute.js'

const app=express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use('/static', express.static('books'));
app.use("/api",userRouter);
app.use("/api",bookRouter)



/************************Connect DB *******************************/

const connectDB = async () => {
    try {
      const conn = await mongoose.connect("mongodb+srv://mohamed:hamma08878847@cluster0.qajrreh.mongodb.net/book?retryWrites=true&w=majority")
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    }
  }

  connectDB()

const Port=5000
app.listen(Port,()=>{
    console.log(`Listening in port${Port}`)
})