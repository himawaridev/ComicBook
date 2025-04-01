// https://www.npmjs.com/package/express
const express = require('express');
const router = express.Router();

// Import controller
const {
    getTruyenMoiCapNhatController
} = require('../Controller/TruyenMoiCapNhatController');

// Định nghĩa route GET /truyen-tien-hiep
router.get('/getTruyenMoiCapNhatController', getTruyenMoiCapNhatController);

module.exports = router;

