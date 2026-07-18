import mongoose, { Mongoose, Schema } from "mongoose";

const dsaProblemschema = new Schema(
    {

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title:{
            type:String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        platform:{
            type: String,
            enum: [
                "LeetCode",
                "Codeforces",
                "CodeChef",
                "GeeksforGeeks",
                "HackerRank",
                "Other",
            ],
            required: true,
        },

        problemLink:{
            type: String,
            trim: true,
        },

        difficulty: {
            type: String,
            enum : ["Easy","Medium","Hard"],
            required: true,
        },

        status: {
            type: String,
            enum : ["Todo","Solved","Revisit"],
            default: "Todo",
        },

        pattern: {
            type:Schema.Types.ObjectId,
            ref: "Pattern",
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },

        solvedAt: {
            type: Date,
        },

    },{timestamps:true})

dsaProblemschema.index({user:1, title:1}, {unique: true});

export const DSAProblem = mongoose.model("DSAProblem",dsaProblemschema);