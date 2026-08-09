import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
    },

    fileUrl: {
        type: String,
        required: true,
    },

    publicId: {
        type: String,
        required: true,
    },

    isPrimary:{
        type: Boolean,
        default: false,
    },

},{timestamps:true});

resumeSchema.index({ user: 1, createdAt: -1});

export const Resume = mongoose.model("Resume" ,resumeSchema);