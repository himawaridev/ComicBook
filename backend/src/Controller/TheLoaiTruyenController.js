// Import model TruyenTienHiep từ thư mục Model
const { TheLoaiTruyen } = require('../Model');

const getTheLoaiTruyenController = async (req, res) => {
    try {
        const TheLoaiTruyenController = await TheLoaiTruyen.findAll();
        return res.status(200).json({ TheLoaiTruyenController });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });  // Phản hồi nếu có lỗi
    }
};

module.exports = {
    getTheLoaiTruyenController
};

