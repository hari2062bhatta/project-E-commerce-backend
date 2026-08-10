import User from "../models/auth.models.js"
import bcrypt from "bcrypt"
// import nodemailer from "../config/emailVerification.js"
import sendEmail from "../utils/sendEmail.js"
// import passport from "../utils/goolgeSignup.js"
export async function Register(req,res){

        const {email}=req.body

    try{
        const checkUser=await User.findOne({email})
    if(checkUser){
        return  res.status(409).json({
            status:"Registration failed",
            message:checkUser
        })
    }
      const otp=Math.floor(100000*Math.random()+600000)
      console.log(otp);

        req.session.otp=otp
        req.session.otpExpiry = Date.now() + 5 * 60 * 1000;
      try{
        await sendEmail(email,otp)
        console.log("email send successfully")
        res.status(200).json({
            status:true,
            message:"opt send successfully"
        })
      }
      catch(err){
        console.log(err.message)
      }


   
    }
    catch(error){
        res.status(500).json({
            status:false,
            message:error.message
        })
    }
    
}
export async function Login(req,res){

    const {email,password}=req.body

    try{
        const user=await User.findOne({email})
        if(!user){
            console.log(user)
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
      const verifyPassword=bcrypt.compareSync(password,user.password)
      if(verifyPassword){
            req.session.user = {
            id: user._id,
            email: user.email,
            role: user.role
        };
        res.status(200).json({
            success:true,
            message:req.session.user
        })
      }
      else{
        return res.status(404).json({
                success:false,
                message:"user not found"
            })
      }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

export async function Logout(req,res){

      try{
          req.session.destroy();
          res.status(200).json({
            success:true,
            message:"user logout successfully"
          })
      }
      catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
      }

}

export async function otpVerification(req,res){

    const {fullName,address,contact,email,password,gender,otp,role}=req.body

   
    try{
       if(req.session.otp==otp){
        console.log("registration seccessfull")
                const hashPassword=bcrypt.hashSync(password,10)
            const newUser=await User.create({
                fullName,
                address,
                contact,
                email:email.toLowerCase(),
                password:hashPassword,
                gender,
                role,

            })
            const userResponse=newUser.toObject()
            delete userResponse.password;
            res.status(201).json({
                status:"registration success",
                message:userResponse
            })

       }
       else{
        res.status(400).json({
            status:false,
            message:"invalid or otp expired"
        })
        console.log("invalid or otp expired")
       }
    }
    catch(err){
            console.log(err.message)
    }

}

export async function googleSignup(req,res){
       res.send("<a href='/auth/googlverify'>sign up with google</a>")

}

export async function verifyGoogle(req,res){

}
