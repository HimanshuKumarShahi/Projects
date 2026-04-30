import mongoose, { Schema } from "mongoose";

const menuItemSchema = new Schema(
  {
    kitchenId: {
      type: Schema.Types.ObjectId,
      ref: "Kitchen",
      required: true,
      index: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    dishName: {
      type: String,
      required: [true, "Dish name is required"],
      trim: true,
    },
    description: {
      type: String,
      maxLength: [300, "Description is too long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    foodImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    isVeg: {
      type: Boolean,
      default: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    avgPreparationTime: {
      type: Number, 
      default: 15, 
    },
  },
  { timestamps: true }
);

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);