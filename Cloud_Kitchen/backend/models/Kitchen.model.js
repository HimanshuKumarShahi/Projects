import mongoose from "mongoose";

const KitchenSchema=new mongoose.Schema({

kitchenName: { type: String, required: true },

ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

contactEmail: { type: String, required: true, unique: true },

createdAt: { type: Date, default: Date.now },
})