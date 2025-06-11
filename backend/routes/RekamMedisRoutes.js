// routes/rekamMedisRoutes.js
const express = require('express');
const router = express.Router();
const rekamMedisController = require('../controllers/RekamMedisController');

router.get('/', rekamMedisController.getAllRekamMedis);
router.post('/', rekamMedisController.createRekamMedis);

module.exports = router;
