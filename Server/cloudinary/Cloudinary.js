import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      console.log("File Buffer is missing");
      return reject("File Buffer is missing");
    }

    const uploadOptions = { resource_type: "auto" };
    if (folder) uploadOptions.folder = folder;

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.log("Cloudinary Upload Error:", error);
          return reject(error);
        }
        console.log("File uploaded successfully:", result.secure_url);
        result.url = result.secure_url;
        resolve(result);
      },
    );

    uploadStream.end(fileBuffer);
  });
};

export { uploadOnCloudinary };
