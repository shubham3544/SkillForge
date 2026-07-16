import {v2 as cloudinary} from "cloudinary";



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

import fs from "fs"

const uploadOnCloudinary = async(localFilePath) => {

    try {
        
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto",
        });

        fs.unlinkSync(localFilePath);

        return response;

    // } catch (error) {
    //     fs.unlinkSync(localFilePath);

    //     return null;
    // }

    } catch (error) {
    console.log("Cloudinary Error:", error);

    if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
    }

    return null;
}
};

export {uploadOnCloudinary};