import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Pattern } from "../models/patterns.models.js";

const createPattern = asyncHandler(async(req,res) =>
{
    const {name , description , color } = req.body;

    if(!name?.trim())
    {
        throw new ApiError(400, "Pattern name is required");

    }

    const existinPattern = await Pattern.findOne({
        user: req.user._id,
        name: name.trim(),
    });

    if(existinPattern)
    {
        throw new ApiError(409,"Pattern already exists")
    }

    const pattern = await Pattern.create({
        user : req.user._id,
        name : name.trim(),
        description,
        color,
    });

    return res
    .status(200)
    .json(
        new ApiResponse(
            201,
            pattern,
            "pattern created Successfully"
        )
    );
});
const getAllPatterns = asyncHandler(async(req,res) =>
{
    const patterns = await Pattern.find({
        user: req.user._id,
        }).sort({createdAt: -1});

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                patterns,
                "Patterns fetched successfully"
            )
        );
});
const getPatternById = asyncHandler(async(req,res) =>
    {
        const {patternId} = req.params;

        const pattern = await Pattern.findOne({
            _id: patternId,
            user: req.user._id,
        });

        if(!pattern)
        {
            throw new ApiError(404, "Pattern not found");
        }

        return res 
        .status(200)
        .json(
            new ApiResponse(
                200,
                pattern,
                "Pattern fetched successfully"
            )
        )

    })
const updatePattern = asyncHandler(async(req,res) => 
    {
        const {patternId} = req.params;
        const {name, description, color} = req.body;

        const pattern = await Pattern.findOne({
            _id: patternId,
            user: req.user._id,
        });

        if(!pattern)
        {
            throw new ApiError(404, "Pattern not found");
        }

        if (name?.trim()) {
        pattern.name = name.trim();
        }

        if (description !== undefined) {
        pattern.description = description;
        }

        if (color !== undefined) {
        pattern.color = color;
         }    

        await pattern.save();

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                pattern,
                "Pattern updated successfully"
            )
        );


    });
   
   
 const deletePattern = asyncHandler(async (req, res) => {
    const { patternId } = req.params;

    const pattern = await Pattern.findOneAndDelete({
        _id: patternId,
        user: req.user._id,
    });

    if (!pattern) {
        throw new ApiError(404, "Pattern not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Pattern deleted successfully"
            )
        );
});

export {
    createPattern,
    getAllPatterns,
    getPatternById,
    updatePattern,
    deletePattern,
};