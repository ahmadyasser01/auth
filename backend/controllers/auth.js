import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import crypto from "crypto"
import {promisify} from "util"


const signToken = (id)=>{
    /**
     * Create jwt token
     */
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })

}

const createSendToken = (user,statusCode,res)=>{
    /**
     * create token
     * create cookie 
     * send  response to user 
     */
    const token = signToken(user._id);
    const cookieOptions = {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true
    };
    res.cookie('jwt',token,cookieOptions);
    user.password = undefined;
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //console.log("res",res);
    if(user.provider!=null)
    {res.redirect("http://localhost:3000")}
    else{
        res.status(statusCode).json({
            status:'success',
            token,
            data:{
                user
            }
        })
        
    }
}

export const signup = async(req,res,next) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            userName: req.body.userName
        });
        return createSendToken(newUser,201,res);
    } catch (error) {
        console.log("err",error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}
export const login = async(req, res, next) => {
    // GET EMAIL AND PASSWORD FROM REQUEST
    const {email,password} = req.body;
    try {
        // CHECK EMAIL AND PASSWORD EXISTS
        if(!email || !password) {
            throw new Error("Please provide email and password")
        }
        // FIND USER BY EMAIL
        const user = await User.findOne({email}).select('+password')

        if(!user || ! (await user.correctPassword(password,user.password))) {
            throw new Error("Invalid email or password")

        }
        // CREATE AND SEND NEW JWT TOKEN
        createSendToken(user,200,res);
        
        
    } catch (error) {
        console.log("err",error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
        
    }

}
export const logout = async(req, res, next) => {
    res.cookie('jwt', 'xxxx', {
        expires: new Date(Date.now()),
        httpOnly: true
      });
      console.log(res.cookie())
      
      res.status(200).json({
         status: 'success',
    user:null });  
}
export const protect = async (req, res,next) => {
    let token;
    try {
        // CHECK IF TOKEN IS IN REQUEST
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        } 
        else if(req.cookies.jwt){
            token = req.cookies.jwt;
        }
        // Check if token is Not found
        if(!token)
        {
            throw new Error("You ARE NOT LOGGED IN  PLEASE LOGIN AND TRY AGAIN");
        }
        // VERIFY JWT TOKEN;
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

        // SEARCH FOR USER
        const currentUser = await User.findById(decoded.id);
        // IF NO USER FOUND THROW ERROR
        if(!currentUser)
        {
            throw new Error("No such user");
        }
        /**
         * IF USER CHANGED PASSWORD AFTER ISSUING JWT TOKEN
         * ASK HIM TO SING IN AGAIN
         * 
         */
         if (currentUser.changedPasswordAfter(decoded.iat)) {
            throw new Error("Please Login again to continue")
          }

        // ADD USER TO REQUEST
         req.user = currentUser;
         // IF NO ERROR UP TILL NOW THEN PASSED AND GO TO NEXT MIDDLEWARE
         next();

    } catch (error) {
        console.log("err",error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}
export const forgotPassword = async (req, res, next) =>{
    const user = await User.findOne({email:req.body.email});
    try {
        // GET USER FROM EMAIL
        // IF NO EMAIL THROW ERROR
        if(!user) throw new Error("There is no user with email " + req.body.email)
        //GENERATE RESET TOKEN
        const resetToken = user.createPasswordResetToken();
        // SAVE USER
        await user.save({validateBeforeSave:false});
        // SEND EMAIL WITH THE RESET LINK
        const resetURL = `${req.protocol}://${req.get(
            'host'
          )}/api/v1/users/resetPassword/${resetToken}`;
          const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
          /**
           * TODO: SEND EMAIL WITH THE RESET LINK
           */
        // SEND SUCCESS RESPONSE
        res.status(200).json({
            state:"Success",
            message:resetURL
        })
        // OR RETURN ERROR  
        
    } catch (error) {
        user.createPasswordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave:false})
        return res.status(500).json({
            status:"Failed",
            message:error.message
        })
        
    }  


}
export const resetPassword = async (req, res, next) =>{
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        // FIND USER BY TOKEN
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires:{$gt:Date.now()}
        });
         // IF NO USER THROW ERROR
         if(!user) throw new Error("TOken is invalid or expired")
         // CHANGE PASSWORD 
         user.password = req.body.password;
         //  REMOVE RESET TOKKEN FROM DATABASE
         user.passwordResetToken = undefined;
         user.passwordResetExpires = undefined;
         await user.save();
         // SEND NEW JWT TOKEN
         createSendToken(user,201,res)

    } catch (error) {
        console.log("Error",error);
        res.status(500).json({
            status:"Failed",
            message:error.message
        })
    }
}

export const isSignedUpBefore = async (email) => {
    const user = await User.findOne({email});
    return user;
}
export const googleSignIn = async(req,res)=>{
    try {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const user = await isSignedUpBefore(req.user.emails[0].value);
    console.log(req.user);
    const firstName = req.user.name.givenName;
    const lastName = req.user.name.familyName;
    const email = req.user.emails[0].value;
    const userName = req.user.id;
    const photo = req.user.photos[0].value;
    if(!user){
        const newUser = await User.create({
            firstName,
            email,
            lastName,
            userName,
            photo,
            provider:req.user.provider
        })
        return createSendToken(newUser,201,res);
    }
    else if(user && user.provider !== 'google'){
        console.log("error happened");
        throw new Error("ACESSDENIED")
    }
    else {
       return createSendToken(user,201,res);
    }
    } catch (error) {
        return res.redirect(`http://localhost:3000/?${error.message}}`)    }
       
    }

    export const githubSignIn = async(req,res)=>{
        try {
            
        const user = await isSignedUpBefore(req.user.emails[0].value);
        console.log(req.user,"user");
        const firstName = req.user.username;
        const email = req.user.emails[0].value;
        const userName = req.user.id;
        const photo = req.user.photos[0].value;
        if(!user){
            const newUser = await User.create({
                firstName,
                email,
                userName,
                photo,
                provider:req.user.provider
            })
            return createSendToken(newUser,201,res);
        }
        else if(user && user.provider !== 'github'){
            throw new Error("ACESSDENIED")
        }
        else {
           return createSendToken(user,201,res);
        }
        } catch (error) {
            return res.redirect(`http://localhost:3000/login?${error.message}}`)
        }
           
        }