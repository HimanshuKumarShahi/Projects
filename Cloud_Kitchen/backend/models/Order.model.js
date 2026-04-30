import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        // Kaunse kitchen ka order hai?
        kitchenId: {
            type: Schema.Types.ObjectId,
            ref: "Kitchen",
            required: true,
            index: true,
        },
        // Kisne order kiya?
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // Items ordered
        items: [
            {
                menuItemId: {
                    type: Schema.Types.ObjectId,
                    ref: "MenuItem",
                    required: true,
                },
                dishName: { type: String, required: true },
                quantity: { type: Number, required: true, min: [1, "Quantity cannot be less than 1"] },
                price: { type: Number, required: true },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        // Kanban Board Status Logic
        status: {
            type: String,
            enum: ["Incoming", "Preparing", "Ready", "Delivered"],
            default: "Incoming",
        },
        orderType: {
            type: String,
            enum: ["Dine-in", "Takeaway", "Delivery"],
            default: "Takeaway",
        },
        // For Premium feel: Tracking payment
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
        // Table number for Dine-in customers
        tableNumber: {
            type: String,
        },
    },
    { timestamps: true }
);

// Indexing for faster dashboard loading
orderSchema.index({ kitchenId: 1, status: 1 });

export const Order = mongoose.model("Order", orderSchema);