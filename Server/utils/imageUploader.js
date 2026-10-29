const cloudinary = require('cloudinary').v2

exports.uploadFileToCloudinary = async (file ,folder, height, quality,) => {
    const options = {folder};
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality =  quality;
    }
    options.resource_type = "auto";
    

    return await cloudinary.uploader.upload(file.tempFilePath, options);
} 





// const cloudinary = require('cloudinary').v2;

// exports.uploadFileToCloudinary = async (file, folder, height, quality) => {
//     // Check if file and tempFilePath exist
//     if (!file || !file.tempFilePath) {
//         throw new Error("No file or tempFilePath provided for Cloudinary upload.");
//     }

//     const options = { folder };

//     if (height) {
//         options.height = height;
//     }
//     if (quality) {
//         options.quality = quality;
//     }
//     options.resource_type = "auto";

//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// };