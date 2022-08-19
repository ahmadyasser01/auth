import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";
import userRouter from "./routes/user.js"
import secretRouter from "./routes/secret.js"

// CONSTANTS
dotenv.config();
const PORT = process.env.PORT;
const DBURI = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017';
const app = express();


// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use('/api/users',userRouter);
app.use('/api/secret',secretRouter);
app.use('/',(req,res)=>{
    console.log(req.cookies);
    res.send(req.cookies)
})


// SERVER
connectDB(DBURI);
app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})