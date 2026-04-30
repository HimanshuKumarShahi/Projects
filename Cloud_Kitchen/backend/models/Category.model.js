import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
        },
        kitchenId: {
            type: Schema.Types.ObjectId,
            ref: "Kitchen",
            required: true,
            index: true,
        },
        priority: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Category=mongoose.model('Category',CategorySchema);