const { CrawlTruyenTienHiep } = require('./Data/TruyenTienHiepData');
const { TruyenTienHiep } = require('./Model'); // Import Model Sequelize
const socketManager = require('./socket/socketManager');

// ------------------------ Tự động cập nhật dữ liệu ------------------------ //
const autoUpdateData = async () => {
    console.log('-----------------------------------------------------------------------');
    console.log("[🔄 AutoUpdate] Bắt đầu cập nhật dữ liệu...");

    try {
        // Thực hiện crawl dữ liệu và xóa dữ liệu cũ song song
        const [newData] = await Promise.all([
            CrawlTruyenTienHiep(), // Chạy crawler để lấy dữ liệu mới
            TruyenTienHiep.destroy({ where: {} }) // Xóa dữ liệu cũ
        ]);

        console.log(`[🔄 AutoUpdate] Lấy được ${newData.length} truyện mới.`);

        // Thêm dữ liệu mới vào database
        await TruyenTienHiep.bulkCreate(newData);
        console.log("[🔄 AutoUpdate] Cập nhật dữ liệu thành công!");

        // Gửi thông báo cho tất cả client đang kết nối
        await socketManager.broadcastUpdate({
            message: 'Dữ liệu đã được cập nhật',
            count: newData.length,
            type: 'truyen-tien-hiep'
        });

    } catch (error) {
        console.error("[❌ AutoUpdate] Lỗi khi cập nhật dữ liệu:", error.message);

        // Gửi thông báo lỗi cho clients
        socketManager.broadcastError(error);
    }
};

// Cài đặt thời gian chạy tự động (ví dụ: 6 tiếng)
const UPDATE_INTERVAL = 6 * 60 * 60 * 1000; // 6 giờ = 6 * 60 * 60 * 1000 ms
setInterval(autoUpdateData, UPDATE_INTERVAL);

module.exports = { autoUpdateData };