const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./Model');
const http = require('http');
const socketManager = require('./socket/socketManager');

// Import Services:
const { initServices } = require('./Check');
const { autoUpdateData } = require('./LoadData'); // Import hàm tự động cập nhật dữ liệu

// Loading environment variables from file .env:
const dotenv = require('dotenv');
dotenv.config();
console.log("DB USER server:", process.env.PORT_SERVER_RUN); // Kiểm tra xem biến có được đọc không

// Import router from Router:
const TruyenTienHiepRouter = require('./Router/TruyenTienHiepRouter');
const TheLoaiTruyenRouter = require('./Router/TheLoaiTruyenRouter');
const TruyenKiemHiepRouter = require('./Router/TruyenKiemHiepRouter');
const TruyenMoiCapNhatRouter = require('./Router/TruyenMoiCapNhatRouter');
const TruyenHotRouter = require('./Router/TruyenHotRouter');
const TruyenHoanHotRouter = require('./Router/TruyenHoanHotRouter')

// ------------------------ Use app ------------------------ //
app.use(cors());
app.use(express.json());

// ------------------------ Use router ------------------------ //
app.use('/', TruyenTienHiepRouter);
app.use('/', TheLoaiTruyenRouter);
app.use('/', TruyenKiemHiepRouter);
app.use('/', TruyenMoiCapNhatRouter);
app.use('/', TruyenHotRouter);
app.use('/', TruyenHoanHotRouter);

// ------------------------ Khởi động Server ------------------------ //
const startServer = async () => {
    try {
        try {
            await sequelize.authenticate();
            console.log("[✅ Database connected successfully]");
        } catch (error) {
            console.error("[❌ Database connection failed]", error.message);
            process.exit(1); // Dừng server nếu kết nối thất bại
        }

        try {
            await sequelize.sync(); // Đồng bộ cơ sở dữ liệu
            console.log("[✅ Database synced successfully]");
            console.log("[🔄 Initializing services...]");
        } catch (error) {
            console.error("[❌ Database sync failed:", error.message);
            process.exit(1); // Dừng server nếu đồng bộ thất bại
        }

        console.log('-----------------------------------------------------------------------');

        // ----- Run servies:
        try {
            await initServices(); // Gọi khởi tạo services ở file check.js
            console.log("[✅ Services] initialized successfully: Check.js");
        }
        catch (error) {
            console.error("[❌ Services] initialization failed:", error.message);
            process.exit(1); // Dừng server nếu khởi tạo services thất bại
        }

        try {
            await autoUpdateData(); // Gọi khởi tạo services ở file LoadData.js
            console.log("[✅ AutoUpdate] initialized successfully: LoadData.js");
        }
        catch (error) {
            console.error("[❌ AutoUpdate initialization failed:", error.message);
            process.exit(1); // Dừng server nếu khởi tạo services thất bại
        }

        //------------------------------ Start server ------------------------------//
        const PORT = process.env.PORT_SERVER_RUN || 8000;
        const server = http.createServer(app);

        // Khởi tạo Socket.IO thông qua SocketManager
        socketManager.initialize(server);

        server.listen(PORT, () => {
            console.log('-----------------------------------------------------------------------');
            console.log(`[🚀 Server] is running on port ${PORT}`);
        });

        // Xử lý khi server đóng
        process.on('SIGTERM', () => {
            console.log('SIGTERM signal received: closing HTTP server');
            socketManager.close();
            server.close(() => {
                console.log('HTTP server closed');
            });
        });

    }
    catch (error) {
        console.error("[❌ Unable to start server:", error.message);
    }
};
console.log('-----------------------------------------------------------------------');

// Run server
startServer();

