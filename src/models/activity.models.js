import mongoose , {Schema} from "mongoose";

const activitySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required : true,
        },

        type: {
            type: String,
            required: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        metadata: {
            type: Schema.Types.Mixed,
            default: {},
        },
    } ,
    {
        timestamps: true,
    }
);

export const Activity = mongoose.model("Activity", activitySchema);