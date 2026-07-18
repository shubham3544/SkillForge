import mongoose , {Schema}from "mongoose";

const patternsSchema = new Schema(
    {
       user: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
       },
       name:{
        type:String,
        required:true,
        trim: true,
        minlength: 2,
        maxlength: 50,
       },
       description: {
        type: String,
        trim: true,
        default: "",
       },
       color:{
        type:String,
        default:"#3B82F6",
       },

    },{timestamps: true})

    patternsSchema.index({user:1, name:1}, {unique: true});

export const Pattern = mongoose.model("Pattern",patternsSchema)