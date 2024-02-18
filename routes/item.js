const express = require('express');
const itemController = require('../controllers/itemController');
const router = express.Router();

router.post('/create', itemController.createitem);
module.exports = router;
