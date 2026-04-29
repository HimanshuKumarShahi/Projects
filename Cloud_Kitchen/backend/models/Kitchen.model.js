import mongoose from "mongoose";

const KitchenSchema = new mongoose.Schema({

    kitchenName: { type: String, required: true, trim: true, index: true },

    banner: {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    },

    logo: {
        url: { type: String },
        public_id: { type: String }
    },

    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    contactEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },

    phone: {
        type: String,
        required: [true, "Contact number is required"]
    },
    address: {
        type: String,
        required: [true, "Physical address is required"]
    },

    description: { type: String, maxLength: [500, "Description cannot exceed 500 characters"] },


    cuisineTypes: [
        { type: String, trim: true }
    ],
    operatingHours: {
        open: { type: String, default: "09:00" },
        close: { type: String, default: "22:00" }
    },
    isActive: {
        type: Boolean,
        default: true
    },

    createdAt: { type: Date, default: Date.now },
}, { timestamps: true })

kitchenSchema.virtual('isOpen').get(function() {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    return currentTime >= this.operatingHours.open && currentTime <= this.operatingHours.close;
});

export const Kitchen = mongoose.model("Kitchen", kitchenSchema);