// https://www.npmjs.com/package/express
const express = require('express');
const router = express.Router();

// Import controller
const {
    getTruyenKiemHiepController
} = require('../Controller/TruyenKiemHiepController');

// Định nghĩa route GET /truyen-tien-hiep
router.get('/getTruyenKiemHiepController', getTruyenKiemHiepController);

module.exports = router;
