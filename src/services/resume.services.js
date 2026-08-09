import { Resume } from "../models/resume.models.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createResumeService = async (userId, file , name) => {
    
    if(!file) {
        throw new ApiError(400,"Resume file is required");
    }

    if(!name?.trim())
    {
        throw new ApiError(400, "Resume name is required");
    }

    const resumeCount = await Resume.countDocuments({
        user: userId,
    });

    if(resumeCount >=5)
    {
        throw new ApiError(400,"Maximum 5 resumes Allowed")
    };

    const cloudinaryResponse = await uploadOnCloudinary(file.path);

    if(!cloudinaryResponse)
    {
        throw new ApiError(500,"Failed to upload resume")
    };

    const resume = await Resume.create({
        user: userId,
        name: name.trim(),
        fileUrl: cloudinaryResponse.secure_url,
        publicId: cloudinaryResponse.public_id,
        isPrimary: resumeCount === 0,
    });

    return resume;

};

const getAllResumeService = async(userId) => {

    const resumes = await Resume.find({
        user:userId,
    }).sort({
        createdAt: -1,
    });

    return resumes;
};

const getResumeByIdService = async(userId, resumeId) => {

    const resume = await Resume.findOne({
        _id: resumeId,
        user: userId,
    });

    if(!resume)
    {
        throw new ApiError(400,"Resume not found");
    }

    return resume;
};

const setPrimaryResumeService = async (userId, resumeId) => {

    const resume = await Resume.findOne({
        _id: resumeId,
        user: userId,
    });

    if(!resume)
    {
        throw new ApiError(404,"Resume not found");
    }

    await Resume.updateMany(
        {
            user: userId,
        },
        {
            $set: {
                isPrimary: false,
            },
        }
    );

    resume.isPrimary  = true;

    await resume.save();

    return resume;
};

const deleteResumeService = async (userId, resumeId) => {

    const resume = await Resume.findOne({
        _id: resumeId,
        user: userId,
    });

    if(!resume)
    {
        throw new ApiError(404,"Resume not found");
    }

    await Resume.deleteOne({
        _id: resumeId,
        user: userId,
    });

    return resume;
};

export {
    createResumeService,
    getAllResumeService,
    getResumeByIdService,
    setPrimaryResumeService,
    deleteResumeService,
}

