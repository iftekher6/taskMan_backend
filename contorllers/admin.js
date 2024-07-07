import ErrorHandler from "../middlewars/error.js";
import { Admin } from "../models/admin.js";
import { sendCookie } from "../utils/features.js";
import bcrypt from 'bcrypt'

export const registerAdmin = async(req,res,next)=>{
    try {
     const {email, password}= req.body;
     let admin = await Admin.findOne({email});
    
 if(admin) return next(new ErrorHandler('admin already exist',404));
 const hashedPassword = await bcrypt.hash(password, 10);
   
    admin = await Admin.create({email, password: hashedPassword}); 
  
    sendCookie(admin,res,'Registered Succesfully',201);
    
    } catch (error) {
     next(error);
    }
 };





export const loginAdmin = async (req,res, next)=>{
    try {
        const { email , password} = req.body;
    const admin = await Admin.findOne({ email }).select("+password");
     
    if(!admin) return next(new ErrorHandler('invalid Email or Password', 400));
 
   
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch) return next(new ErrorHandler('invalid Email or Password', 400));
   

    sendCookie(admin, res, `welcome back ${admin.email}`, 200);

    } catch (error) {
        next(error);    
    }
};


export const logoutAdmin =(req,res)=>{
    res.status(200).cookie('token','',{expires : new Date(Date.now()),
        sameSite: process.env.NODE_ENV=== "Development" ? "lax" : "none", 
        secure : process.env.NODE_ENV=== "Development" ? false :true,}).json({
        success: true,
        user : req.user,
    });
}
