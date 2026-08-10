import mongoose from "mongoose"
const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true,

    },
    address:{
        type:String,
    },
    contact:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        enum:["male","female"],
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:["admin","user"]
    },
     googleId: String,
    profileImg: String,

},{
    timestamps:true
})

const User=mongoose.model("User",userSchema)

export default User;