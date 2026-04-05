import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const ConnectDB=async()=>{

    try {
        const connection=await mongoose.connect(process.env.MONGODB_URL)
            console.log("DataBase Connection Established Done  ('Connection Hogya Boss.')"); 
        
    } 
    catch (error) {
        console.log("MongoDB Connection  Error , \nSomething Happen Check Mongodb String in env file ----------> \n " , error);
        process.exit(1);
    }
}
export default ConnectDB;