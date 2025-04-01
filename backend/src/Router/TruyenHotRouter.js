// https://www.npmjs.com/package/express
const express = require('express');
const router = express.Router();

// Import controller
const {
    getTruyenHotController
} = require('../Controller/TruyenHotController');

// Định nghĩa route GET /truyen-tien-hiep
router.get('/getTruyenHotController', getTruyenHotController);

module.exports = router;

