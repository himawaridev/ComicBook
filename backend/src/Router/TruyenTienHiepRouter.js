// https://www.npmjs.com/package/express
const express = require('express');
const router = express.Router();

// Import controller
const {
    getTruyenTienHiepController
} = require('../Controller/TruyenTienHiepController');

// Định nghĩa route GET /truyen-tien-hiep
router.get('/getTruyenTienHiepController', getTruyenTienHiepController);

module.exports = router;
