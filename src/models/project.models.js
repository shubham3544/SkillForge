import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        githubRepo: {
            type: String,
            required: true,
            trim: true,
        },

        liveLink: {
            type: String,
            trim: true,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "Planning",
                "In Progress",
                "Completed",
                "On Hold",
            ],
            default: "Planning",
        },

        startDate: {
            type: Date,
            default: Date.now,
        },

        endDate: {
            type: Date,
        },

        personalNotes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

projectSchema.index(
    {
        user: 1,
        githubRepo: 1,
    },
    {
        unique: true,
    }
);

export const Project = mongoose.model("Project", projectSchema);

