import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connection Done.');
        
    } catch (error) {
        console.error("Error Connecting to MongoDB ", error);
        process.exit(1);
    }
}

export default connectDB;