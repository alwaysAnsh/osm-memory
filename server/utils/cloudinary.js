import cloudinary from "cloudinary";
import fs from "fs/promises";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

export const uploadOnCloudinary = async (
  localFilePath,
  folderName = "subcategory_files"
) => {
  try {
    if (!localFilePath) throw new Error("No file path provided");

    // Verify the file exists
    await fs.access(localFilePath);

    console.log("Uploading file to Cloudinary:", localFilePath);

    // Upload the file to Cloudinary
    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderName,
      tags: ["subcategory"],
      context: {
        alt: "Subcategory File",
        caption: "Uploaded via API",
      },
    });

    console.log("Cloudinary Upload Successful:", response.url);

    // Delete the local temp file
    await fs.unlink(localFilePath);
    console.log("Temp file deleted:", localFilePath);

    return response;
  } catch (error) {
    console.error("Error during Cloudinary upload:", error.message);

    // Attempt cleanup if an error occurs
    try {
      await fs.unlink(localFilePath);
      console.log("Temp file deleted after upload failure:", localFilePath);
    } catch (cleanupError) {
      if (cleanupError.code === "ENOENT") {
        console.warn("Temp file not found for deletion:", localFilePath);
      } else {
        console.error("Error during temp file cleanup:", cleanupError.message);
      }
    }

    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};
