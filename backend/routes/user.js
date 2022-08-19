import express from "express";
import { forgotPassword, login, logout, protect, resetPassword, signup } from "../controllers/auth.js";
import { deleteMe, getMe, updateMe } from "../controllers/user.js";


const router = express.Router();

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)


router.route('/me')
    .get(protect,getMe)
    .patch(protect,updateMe)
    .delete(protect,deleteMe)

router.post('/forgotPassword',forgotPassword)
router.patch('/resetPassword/:token',resetPassword)



export default router;
