// Import model TruyenKiemHiep từ thư mục Model
const { TruyenKiemHiep } = require('../Model');

const getTruyenKiemHiepController = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1000; // Mặc định trang là 10 nếu không có giá trị
        limit = parseInt(limit) || 10;  // Mặc định lấy 25 bản ghi mỗi trang nếu không có giá trị
        const offset = (page - 1) * limit; // Tính toán offset dựa trên trang hiện tại và số lượng bản ghi mỗi trang

        const { count, rows } = await TruyenKiemHiep.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']] // Sắp xếp theo id tăng dần
            // Sắp xếp theo ngày tạo mới nhất : createdAt DESC
            // order: [['createdAt', 'DESC']]
            // order: [['id', 'DESC']]
            // order: [['id', 'ASC']]
        });

        return res.status(200).json({ TruyenKiemHiepController: rows, total: count });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTruyenKiemHiepController
};

