import multer from "multer";
import fs from "fs";
import path from "path";

// Configure Multer for file uploads
const __dirname = path.resolve();
const tempDir = path.join(__dirname, "public", "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true }); // Create the directory if it doesn't exist
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir); // Temporary folder for image upload
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

// Multer file filter (optional, to only allow image uploads)
// const fileFilter = (req, file, cb) => {
//   if (!file.mimetype.startsWith("image")) {
//     return cb(new Error("Only image files are allowed!"), false);
//   }
//   cb(null, true);
// };


// Multer file filter (optional, to only allow file uploads)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/json",            // JSON files
    "text/csv",                    // CSV files
    "application/vnd.ms-excel",    // Older Excel files (.xls)
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Newer Excel files (.xlsx)
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Only CSV, Excel, and JSON files are allowed!"), false);
  }
  cb(null, true);
};


export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter,
});
