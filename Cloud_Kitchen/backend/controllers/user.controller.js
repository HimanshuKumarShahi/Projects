import { User } from "../models/User.model.js"
import jwt from "jsonwebtoken"
import ApiError from '../utils/ApiError.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
    

    /**
     * Data le rhe hai frontend se.
     */
    const {userName , Email , FullName , Password }=req.body || {};


    /**
     * Empty field check kr rhe hai 
     */
    if(![userName , Email , FullName , Password])
    {
        throw new Error(400,"All Fields are required. ");  
    }

    /**
     * Database me user exist kr rha hai ki nhi dhek rhe hai.
     */
    const existUser=await User.findOne({
        $or:[{mobileNumber},{name} , {Email}]
    });

    if(existUser)
    {
        throw new ApiError(409,"User already exist with this username, mobileNumber or email. Please try with different username or email. ");
    }

    /**
     * Profile photo upload working.
     */
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    /**
     * User creation when not exist in database.
     */
    const user=await User.create({
        name,
        avatar:{
            url:avatar.url,
            public_id:avatar.public_id
        },
        email,
        Password,
        mobileNumber,
        role: role || "Customer"
    });

    const createdUser = await User.findById(user._id).select("-password -refreshtoken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
};

export {registerUser}