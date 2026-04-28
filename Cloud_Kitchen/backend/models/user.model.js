import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(

    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
            trim: true,
            lowercase: true,
            unique: true
        },
        mobileNumber: {
            type: String,
            required: [true, "Mobile number is required"],
            minLength: [10, "Mobile number must be 10 digits"],
            maxLength: [10, "Mobile number must be 10 digits"],
            match: [/^\d{10}$/, "Please enter a valid 10-digit number"]
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [6, 'Password must be exactly 6 digits'],
            match: [/^\d+$/, 'Password must contain only numeric digits']
        
    },
    role: { type: String,
         enum: ['Owner', 'Staff', 'Customer'],
          default: "Customer" },

    kitchenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen', default: null },
    },
{
    timestamps: true
}

)

/**
 * Encrypt password before saving in mongoDB
 */

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userSchema)