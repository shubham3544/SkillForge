import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Pattern } from "../models/patterns.models.js";
import { createPatternService,
         getAllPatternsService,
         getPatternByIdService,
         updatePatternService,
         deletePatternService
 } from "../services/pattern.services.js";

const createPattern = asyncHandler(async(req,res) =>
{
    
    const pattern = await createPatternService(
        req.user._id,
        req.body
    );
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

const getAllPatterns = asyncHandler(async (req, res) => {

    const patterns = await getAllPatternsService(
        req.user._id
    );

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

const getPatternById = asyncHandler(async (req, res) => {

    const { patternId } = req.params;

    const pattern = await getPatternByIdService(
        req.user._id,
        patternId
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                pattern,
                "Pattern fetched successfully"
            )
        );
});

const updatePattern = asyncHandler(async(req,res) => 
    {
        const {patternId} = req.params;
        

        const pattern = await updatePatternService(
            req.user._id,
            patternId,
            req.body
        );

        
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

    await deletePatternService(
        req.user._id,
        patternId
    );

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