import mongoose from "mongoose"


const connection=async()=>{
    try{ mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected")
    }
    catch(err){
        console.log(err)
        console.log("some error while connecting database")
    }
}

export default connection;