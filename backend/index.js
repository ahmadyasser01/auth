import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js"
// CONSTANTS
dotenv.config();
const PORT = process.env.PORT;
const DBURI = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017';
const app = express();


// MIDDLEWARES
app.use(cors());

//ROUTES
//app.use('/api/users');

// SERVER
connectDB(DBURI);
app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})