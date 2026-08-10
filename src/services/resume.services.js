import { Resume } from "../models/resume.models.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary,
         deleteFromCloudinary,
 } from "../utils/cloudinary.js";
 import { createActivity } from "./activity.services.js";

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

    await createActivity({
        user: userId,
        type: "RESUME_UPLOADED",
        message: `Uploaded resume ${resume.name}`,
        metadata: {
            resumeId : resume._id,
            resumeName: resume.name,
        },
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

    await createActivity({
        user: userId,
        type: "RESUME_PRIMARY",
        message: `Set ${resume.name} as Primary Resume`,
        metadata: {
            resumeId : resume._id,
            resumeName: resume.name,
        }
    })

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

    const cloudinaryResponse = await deleteFromCloudinary(
        resume.publicId
    );

    if(!cloudinaryResponse)
    {
        throw new ApiError(500,"Failed to delete the resume from cloudinary");
    }

    await Resume.deleteOne({
        _id: resumeId,
        user: userId,
    });

    await createActivity({
        user: userId,
        type: "RESUME_DELETED",
        message: `Deleted resume${resume.name}`,
        metadata: {
            resumeId: resume._id,
            resumeName: resume.name,
        },
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

