const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv=require("dotenv");
dotenv.config();
// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dvn8z6lvw', 
    api_key: '399685149993883', 
    api_secret: 'mBHB3cPvpLMbFJptaoWxtGrLJHA' 
  });
  

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify your destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

// Increase file size limit to 30MB
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB in bytes
  }
});

// Route handler with Multer middleware for file upload
exports.uploadImage = upload.single('image');
 