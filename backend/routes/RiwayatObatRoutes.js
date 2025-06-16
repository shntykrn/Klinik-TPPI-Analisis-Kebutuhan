const express = require('express');
const router = express.Router();
const { getRiwayatObat } = require('../controllers/RiwayatObatController');

router.get('/', getRiwayatObat);

module.exports = router;
