const { TheLoaiTruyenServices } = require('./Services/TheLoaiTruyenServices');

// Services:
const { InitTruyenTienHiep } = require('./Services/TruyenTienHiepServices');
const { TruyenKiemHiepServices } = require('./Services/TruyenKiemHiepServices')
const { TruyenMoiCapNhatServices } = require('./Services/TruyenMoiCapNhatServices');
const { TruyenHotServices } = require('./Services/TruyenHotServices');
const { TruyenHoanHotServices } = require('./Services/TruyenHoanHotServices')

// Services content:
const { TruyenTienHiepContentService } = require('./Services/TruyenTienHiepContentServices');

const initServices = async () => {
    let hasError = false;

    try {
        await TheLoaiTruyenServices();
        console.log("[✅ TheLoaiTruyenServices initialized]");
        console.log('-----------------------------------------------------------------------');
    } catch (error) {
        console.error("[❌ TheLoaiTruyenServices failed]:", error.message);
        hasError = true;
    }

    try {
        await InitTruyenTienHiep();
        console.log("[✅ InitTruyenTienHiep initialized]");
        console.log('-----------------------------------------------------------------------');
    } catch (error) {
        console.error("[❌ InitTruyenTienHiep failed]:", error.message);
        hasError = true;
    }

    try {
        await TruyenTienHiepContentService();
        console.log("[✅ TruyenTienHiepContentService initialized]");
        console.log('-----------------------------------------------------------------------');
    } catch (error) {
        console.error("[❌ TruyenTienHiepContentService failed]:", error.message);
        hasError = true;
    }

    try {
        await TruyenKiemHiepServices();
        console.log("[✅ TruyenKiemHiepServices initialized]");
        console.log('-----------------------------------------------------------------------');
    } catch (error) {
        console.error("[❌ TruyenKiemHiepServices failed]:", error.message);
        hasError = true;
    }

    try {
        await TruyenMoiCapNhatServices();
        console.log("[✅ TruyenMoiCapNhatServices initialized]");
        console.log('-----------------------------------------------------------------------');
    } catch (error) {
        console.error("[❌ TruyenMoiCapNhatServices failed]:", error.message);
        hasError = true;
    }

    try {
        await TruyenHotServices();
        console.log("[✅ TruyenHotServices initialized]");
        console.log('-----------------------------------------------------------------------');
    } catch (error) {
        console.error("[❌ TruyenHotServices failed]:", error.message);
        hasError = true;
    }

    try {
        await TruyenHoanHotServices();
        console.log("[✅ TruyenHoanHotServices initialized]");
        console.log('-----------------------------------------------------------------------');
    } catch (error) {
        console.error("[❌ TruyenHoanHotServices failed]:", error.message);
        hasError = true;
    }


    // Handle:

    if (hasError) {
        console.error("[❌ Server stopped due to initialization errors]");
        process.exit(1);
    }
};

module.exports = { initServices };
