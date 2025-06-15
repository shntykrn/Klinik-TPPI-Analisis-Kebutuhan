const express = require('express');
const router = express.Router();
const obatController = require('../controllers/ObatController');
const upload = require('../middleware/upload');

router.get('/', obatController.getAll);
router.post('/create', obatController.create);
router.delete('/delete/:id', obatController.delete);
router.post('/upload', upload.single('image'), obatController.uploadImage);

module.exports = router;
