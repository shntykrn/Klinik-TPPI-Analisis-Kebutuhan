// routes/rekamMedisRoutes.js
const express = require('express');
const router = express.Router();
const rekamMedisController = require('../controllers/RekamMedisController');

router.get('/get', rekamMedisController.getAllRekamMedis);
router.post('/create', rekamMedisController.createRekamMedis);
router.delete('/delete/:id', rekamMedisController.deleteRekamMedis);

module.exports = router;
