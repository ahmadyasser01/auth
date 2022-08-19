import express, { request } from "express";
import {  protect } from "../controllers/auth.js";



const router = express.Router();


router.get('/',protect,(req,res)=>{
    res.json({
        status:"authenticated",
        data:"secret data only logged in user can see"
    })
})



export default router;
