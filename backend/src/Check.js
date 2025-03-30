const { Categories } = require('./Services/Categories');
const { InitTruyenTienHiep } = require('./Services/TruyenTienHiep');
const { InitTruyenTienHiepContent } = require('./Services/TruyenTienHiepContent');

const initServices = async () => {
    let hasError = false;

    try {
        await Categories();
        console.log("[✅ Categories initialized]");
        console.log('-----------------------------------------------------------------------');
    } catch (error) {
        console.error("[❌ Categories failed]:", error.message);
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
        await InitTruyenTienHiepContent();
        console.log("[✅ InitTruyenTienHiepContent initialized]");
        console.log('-----------------------------------------------------------------------');
    } catch (error) {
        console.error("[❌ InitTruyenTienHiepContent failed]:", error.message);
        hasError = true;
    }

    if (hasError) {
        console.error("[❌ Server stopped due to initialization errors]");
        process.exit(1);
    }
};

module.exports = { initServices };
