import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewars/error.js";


export const login = async (req,res, next)=>{
    try {
        // const email = email.toUpperCase()
        // const email = req.body.email.toUpperCase()
        const { email, password} = req.body;
    const user = await User.findOne({ email }).select("+password");
     
    if(!user) return next(new ErrorHandler('invalid Email or Password', 400));
 
   
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return next(new ErrorHandler('invalid Email or Password', 400));
   

    sendCookie(user, res, `welcome back ${user.role}`, 200);

    } catch (error) {
        next(error);    
    }
};


export const registerUser = async(req,res,next)=>{
   try {
    const {name, email, password,role}= req.body;
    let user = await User.findOne({email});
   
if(user) return next(new ErrorHandler('user already exist',404));
const hashedPassword = await bcrypt.hash(password, 10);
 
    user= await User.create({name, email, password: hashedPassword,role}); 
 
   sendCookie(user,res,'Registered Succesfully',201);
   
   } catch (error) {
    next(error);
   }
};
   
 

export const getUserProfile = async (req,res)=>{
    
    const users = await User.find({})
    res.status(200).json({
        success: true,
        users,
    });
};

    


export const logout =(req,res)=>{
    res.status(200).cookie('token','',{expires : new Date(Date.now()),
        sameSite: process.env.NODE_ENV=== "Development" ? "lax" : "none", 
        secure : process.env.NODE_ENV=== "Development" ? false :true,}).json({
        success: true,
        user : req.user,
    });
}
