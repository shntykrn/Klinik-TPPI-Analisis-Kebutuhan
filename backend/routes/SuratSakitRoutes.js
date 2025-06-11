// routes/suratSakitRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const suratSakitController = require('../controllers/SuratSakitController');

// Setup multer untuk upload lokal sementara
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);
    cb(null, extname && mimetype);
  },
});

// Route untuk tambah surat sakit dengan upload gambar
router.post('/', upload.single('image'), suratSakitController.createSuratSakit);

module.exports = router;
