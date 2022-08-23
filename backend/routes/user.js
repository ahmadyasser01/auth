import express from "express";
import { forgotPassword, githubSignIn, googleSignIn, login, logout, protect, resetPassword, signup } from "../controllers/auth.js";
import { deleteMe, getMe, updateMe } from "../controllers/user.js";
import passport from "passport";




const router = express.Router();


router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)


router.route('/me')
    .get(protect,getMe)
    .patch(protect,updateMe)
    .delete(protect,deleteMe)

router.post('/forgotPassword',forgotPassword);
router.patch('/resetPassword/:token',resetPassword);

router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));

router.get(
    "/auth/google/callback",passport.authenticate("google", {failureRedirect: "/failure",session: false}),googleSignIn);




router.get('/auth/github',passport.authenticate('github', { scope: ['user:email'] }));
router.get(
    "/auth/github/callback",passport.authenticate("github", {failureRedirect: "/failure",session: false}),githubSignIn);
      
    

router.get('/auth/getUser',protect,(req,res)=>{
   try {
    res.status(200).json({
        user:req.user
    })
   } catch (error) {
    res.status(404).json({
        error:error.message
    })
   }
})


export default router;
