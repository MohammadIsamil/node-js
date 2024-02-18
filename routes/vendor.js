const express = require('express');
const venderController = require('../controllers/venderController');
const router = express.Router();

router.get('/allVenders',venderController.getvendor)

module.exports = router;