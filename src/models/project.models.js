import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            default: "",
        },

        githubUrl: {
            type: String,
            trim: true,
            default: "",
        },

        liveUrl: {
            type: String,
            trim: true,
            default: "",
        },

        techStack: [
            {
                type: String,
                trim: true,
            },
        ],

        status: {
            type: String,
            enum: ["Planning", "In Progress", "Completed", "On Hold"],
            default: "Planning",
        },

        startDate: {
            type: Date,
        },

        endDate: {
            type: Date,
        },

        image: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

projectSchema.index({ user: 1, title: 1 }, { unique: true });

export const Project = mongoose.model("Project", projectSchema);