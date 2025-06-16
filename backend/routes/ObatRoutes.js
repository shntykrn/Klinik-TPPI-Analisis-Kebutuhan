const express = require('express');
const router = express.Router();
const obatController = require("../controllers/ObatController");
const upload = require('../middleware/upload');

router.get('/', obatController.getAll);
router.get('/:id', obatController.getById);
router.post('/create', obatController.create);
router.delete('/delete/:id', obatController.delete);
router.post('/upload', upload.single('gambar'), obatController.uploadImage);
router.post('/ambil/:id', obatController.ambilObatKeluar)
router.post('/tambah/:id', obatController.tambahObatMasuk)

module.exports = router;
