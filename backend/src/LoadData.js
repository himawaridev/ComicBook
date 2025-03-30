const { RunCrawler } = require('./Data/TruyenTienHiepData');
const { TruyenTienHiep } = require('./Model'); // Import Model Sequelize

// ------------------------ Tự động cập nhật dữ liệu ------------------------ //
const autoUpdateData = async () => {
    console.log('-----------------------------------------------------------------------');
    console.log("[🔄 AutoUpdate] Bắt đầu cập nhật dữ liệu...");

    try {
        const newData = await RunCrawler(); // Chạy crawler để lấy dữ liệu mới
        console.log(`[🔄 AutoUpdate] Lấy được ${newData.length} truyện mới.`);

        // Xóa dữ liệu cũ (Nếu muốn giữ dữ liệu cũ, bỏ dòng này)
        await TruyenTienHiep.destroy({ where: {} });

        // Thêm dữ liệu mới vào database
        await TruyenTienHiep.bulkCreate(newData);
        console.log("[🔄 AutoUpdate] Cập nhật dữ liệu thành công!");

    } catch (error) {
        console.error("[❌ AutoUpdate] Lỗi khi cập nhật dữ liệu:", error.message);
    }
};

// Cài đặt thời gian chạy tự động (ví dụ: 6 tiếng)
const UPDATE_INTERVAL = 6 * 60 * 60 * 1000; // 6 giờ = 6 * 60 * 60 * 1000 ms
setInterval(autoUpdateData, UPDATE_INTERVAL);

module.exports = { autoUpdateData };