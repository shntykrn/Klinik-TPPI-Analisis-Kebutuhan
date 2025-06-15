const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // hapus file lokal setelah upload
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Upload gagal", detail: error.message });
  }
};

module.exports = { uploadImage };
