import mongoose from 'mongoose';
import validator from "validator";



const userSchema = new mongoose.Schema({
    firstName:{
        type: 'string',
        required: [true,"firstname is required"],
        trim:true,
        maxLength:15
    },
    lastName:{
        type:String,
        required:[true,"Last Name is required"],
        trim:true,
        maxLength:15
    },
    userName:{ 
        type:String,
        required:[true,"user Name is required"],
        trim:true,
        minLength:2,
        unique: true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        unique:true,
        trim:true,
        validate:[validator.isEmail,"Email is required"]
    },
    password:{
        type:String,
        trim:true,
        validate:{
            validator:function(val){
                return validator.isStrongPassword(val)
            },
            message:"Password is not strong enough"
        
        }
    },
    photo:{type:String},
    role:{ 
        type:String,
        enum:["admin","user","moderator"],
        required:true,
        default:"user"},
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
},{
    timestamps:true,
});


const User = mongoose.model('User',userSchema);
export default User;