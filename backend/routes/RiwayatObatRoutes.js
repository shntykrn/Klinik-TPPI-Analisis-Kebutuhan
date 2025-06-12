// routes/riwayatObatRoutes.js
const express = require('express');
const router = express.Router();
const riwayatObatController = require('../controllers/RiwayatObatController');

router.get('/', riwayatObatController.getAllRiwayatObat);
router.post('/', riwayatObatController.createRiwayatObat);

module.exports = router;
