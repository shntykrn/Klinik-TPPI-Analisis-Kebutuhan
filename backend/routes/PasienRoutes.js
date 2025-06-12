// routes/pasienRoutes.js
const express = require('express');
const router = express.Router();
const pasienController = require('../controllers/PasienController');

router.get('/', pasienController.getAllPasien);
router.post('/', pasienController.createPasien);

module.exports = router;
