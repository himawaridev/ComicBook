// https://www.npmjs.com/package/express
const express = require('express');
const router = express.Router();

// Import controller
const {
    getTruyenHoanHotController
} = require('../Controller/TruyenHoanHotController');

// Định nghĩa route GET /truyen-tien-hiep
router.get('/getTruyenHoanHotController', getTruyenHoanHotController);

module.exports = router;

