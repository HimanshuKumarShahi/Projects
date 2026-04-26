import { User } from "../models/user.model"
import jwt from "jsonwebtoken"

const registerUser=async (req , res)=>{
    //get user details from frontend.
    // validation-not empty
    //check user exist : username or email
    // check images or avatar
    //upload on cloudinary,avatar
    // create user-object- create entry in db
    //remove password and refresh token from response
    // check for user creation
    // return res 
    
    const {userName , Email , FullName , Password }=req.body || {};

    if(![userName , Email , FullName , Password])
    {
        throw new Error(400,"All Fields are required. ");
        
    }
}