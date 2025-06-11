// routes/obatRoutes.js
const express = require('express');
const router = express.Router();
const obatController = require('../controllers/ObatController');

router.get('/', obatController.getAllObat);
router.post('/', obatController.createObat);
router.put('/:id', obatController.updateObat);

module.exports = router;
