import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
 import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { application } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req,res) => {

    const { fullname, email, username, password} = req.body;

    if(
        [fullname, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{username},{email}],
     });

    if(existedUser) {
    throw new ApiError(409, "User with email or username already existed");
     }

     const avatarLocalPath = req.files?.avatar?.[0]?.path;

     const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

     if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
     }

     const avatar = await uploadOnCloudinary(avatarLocalPath);
     const coverImage = await uploadOnCloudinary(coverImageLocalPath);

     if(!avatar){
        throw new ApiError(400, "Avatar upload failed");
     }

     const user = await User.create({
        fullname,
        avatar: avatar.secure_url,
        coverImage: coverImage?.secure_url || "",
        email,
        password,
        username: username.toLowerCase(),
     });

     const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
     );

     if(!createUser)
     {
        throw new ApiError(500,"Something went wrong while registering the user")
     }

     return res.status(200).json(
        new ApiResponse(
            200,
            createUser,
            "User registered Successfully"
        )
     );

    

 });

const generateAccessAndRefreshTokens = async(userId) => {
    
   try {

      const user = await User.findById(userId);

      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken;

      await user.save({validateBeforeSave: false});

      return {accessToken,refreshToken};
      
   } catch (error) {

      throw new ApiError(
         500,
         "Something went wrong while generating access and refresh Tokens"
      )
      
   }

 }

const loginUser = asyncHandler(async(req,res) => {
      const {email, username , password} = req.body;

      if(!(email || username)) {
         throw new ApiError(400, "email or username is required");
      }

      if(!password) {
         throw new ApiError(400,"Password is required");
      }

      const user = await User.findOne({
         $or: [
            {email },
            {username }
         ]
      });

      if(!user){
         throw new ApiError(401,"User does not exist");
      }

       const isPasswordValid = await user.isPasswordCorrect(password);

       if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
       }

       const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

   const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
   );

   //    return res.status(200).json(
   //     new ApiResponse(
   //      200,
   //      user,
   //      "User found succesfully"
   //  )

   const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
   }

   return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    );
});

const logoutUser = asyncHandler(async(req,res) => {

   await User.findByIdAndUpdate(
      req.user._id,
      {
         $unset: {
            refreshToken: 1
         }
      },
      {
         new: true
      }
   );

   const options ={
      httpOnly:true,
      secure: process.env.NODE_ENV === "production"
   }

   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken",options)
   .json(
      new ApiResponse(
         200,
         {},
         "User logged out successfully"
      )
   )
});

const refreshAccessToken = asyncHandler(async(req,res) => {

    const incomingRefreshToken =
       req.cookies?.refreshToken || req.body?.refreshToken;

   if(!incomingRefreshToken)
   {
      throw new ApiError(401,"Unauthorized Request");
   }

   const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
   );

   const user = await User.findById(decodedToken?._id);

   if(!user)
   {
      throw new ApiError(401, "Invalid refresh token");
   }

   if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh token is expired or has been used");
   }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const options = {
      httpOnly: true,
      secure : process.env.NODE_ENV === "production"
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken , options)
    .cookie("refreshToken", refreshToken , options)
    .json(
      new ApiResponse(
         200,
         {
            accessToken,
            refreshToken
         },
         "Access token refreshed successfully"

      )
    )
}
)

const changeCurrentPassword = asyncHandler(async (req,res) => {

   const {oldPassword , newPassword} = req.body;

   if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
   }

   const user = await User.findById(req.user?._id);

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;

    await user.save({validateBeforeSave: false});

    return res.status(200).json(
    new ApiResponse(
        200,
        {},
        "Password changed successfully"
    )
);





});

const updateAccountDetails = asyncHandler(async(req,res)=> {

   const {fullname, email} = req.body|| {};

   if (!fullname || !email) {
    throw new ApiError(400, "Full name and email are required");
}

   const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
         $set: {
            fullname,
            email
         }
      },
      {
         new: true,
      }
   ).select("-password -refreshToken");

   return res.status(200).json(
    new ApiResponse(
        200,
        user,
        "Account details updated successfully"
      )
   );
   
});

const updateUserAvatar = asyncHandler(async(req,res) => {
  
   const avatarLocalPath = req.file?.path;

   if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
   }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
    throw new ApiError(500, "Error while uploading avatar");
    } 

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
         $set:{
            avatar: avatar.url
         }
      },
      {
         new: true
      }
     ).select("-password -refreshToken")

     return res.status(200).json(
    new ApiResponse(
        200,
        user,
        "Avatar updated successfully"
    )
);
    
    
});

const updateUserCoverImage = asyncHandler(async (req, res) => {

    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is required");
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!coverImage) {
        throw new ApiError(500, "Error while uploading cover image");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Cover image updated successfully"
        )
    );
});

    

    
 export {registerUser,
         loginUser,
         logoutUser,
         refreshAccessToken,
         changeCurrentPassword,
         updateAccountDetails,
         updateUserAvatar,
         updateUserCoverImage
      };