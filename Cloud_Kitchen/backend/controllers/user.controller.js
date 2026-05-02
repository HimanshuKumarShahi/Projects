import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js"; 
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // 1. Data le rhe hai frontend se (Model ke hisab se names rakho)
    const { name, email, mobileNumber, password, role } = req.body;

    // 2. Empty field check 
    if (
        [name, email, mobileNumber, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // 3. Database me user exist kr rha hai ki nhi (Email ya Mobile dono checking )
    const existUser = await User.findOne({
        $or: [{ email }, { mobileNumber }]
    });

    if (existUser) {
        throw new ApiError(409, "User already exists with this email or mobile number.");
    }

    // 4. Profile photo (Avatar) check aur upload
    const avatarLocalPath = req.files?.avatar[0]?.path;
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    
    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed on Cloudinary");
    }

    // 5. User creation (Model fields exactly match hone chahiye)
    const user = await User.create({
        name,
        avatar: {
            url: avatar.url,
            public_id: avatar.public_id
        },
        email,
        password, 
        mobileNumber,
        role: role || "Customer"
    });

    // 6. Verification and response
    const createdUser = await User.findById(user._id).select("-password -refreshtoken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

export { registerUser };