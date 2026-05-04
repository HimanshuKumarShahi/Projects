import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'Please provide a name.']
    },
    email:{
        type:String,
        required:[true , 'Please provide an email.'],
        unique:true,
        lowercase:true,
    },
    
})