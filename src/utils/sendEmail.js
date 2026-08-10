
import transporter from "../config/emailVerification.js"
import dotenv from "dotenv"
dotenv.config()
const sendEmail=async(email,otp)=>{
    await transporter.sendMail({
        from : process.env.EMAIL_USER,
        to: email,
        subject:"your otp is",
         text: `Your OTP is ${otp}. It is valid for 5 minutes.`

    })

}

export default sendEmail;