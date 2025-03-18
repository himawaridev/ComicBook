const express = require('express');
const router = express.Router();
const { CTTH } = require('../Controllers/TruyenTienHiepController');

// API endpoint để lấy danh sách truyện tiên hiệp
router.get('/truyen-tien-hiep', async (req, res) => {
    try {
        const truyenList = await CTTH();
        res.status(200).json({ success: true, data: truyenList });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi khi lấy dữ liệu', error: error.message });
    }
});

module.exports = router;