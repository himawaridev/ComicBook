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
    console.log("[🔄 Initializing all services in parallel...]");

    const services = [
        {
            name: "TheLoaiTruyenServices",
            service: TheLoaiTruyenServices
        },
        {
            name: "InitTruyenTienHiep",
            service: InitTruyenTienHiep
        },
        {
            name: "TruyenTienHiepContentService",
            service: TruyenTienHiepContentService
        },
        {
            name: "TruyenKiemHiepServices",
            service: TruyenKiemHiepServices
        },
        {
            name: "TruyenMoiCapNhatServices",
            service: TruyenMoiCapNhatServices
        },
        {
            name: "TruyenHotServices",
            service: TruyenHotServices
        },
        {
            name: "TruyenHoanHotServices",
            service: TruyenHoanHotServices
        }
    ];

    try {
        // Chạy tất cả services song song
        const results = await Promise.allSettled(
            services.map(async ({ name, service }) => {
                try {
                    await service();
                    console.log(`[✅ ${name} initialized]`);
                    console.log(' ');
                    console.log(' ');
                    return { name, success: true };
                } catch (error) {
                    console.error(`[❌ ${name} failed]:`, error.message);
                    return { name, success: false, error: error.message };
                }
            })
        );

        // Kiểm tra kết quả
        const failedServices = results.filter(result => result.status === 'rejected' || (result.value && !result.value.success));

        if (failedServices.length > 0) {
            console.error("[❌ Some services failed to initialize]");
            console.error("Failed services:", failedServices.map(f => f.value?.name || 'Unknown'));
            process.exit(1);
        }

        console.log('-----------------------------------------------------------------------');
        console.log("[✅ All services initialized successfully]");

    } catch (error) {
        console.error("[❌ Server stopped due to initialization errors]:", error.message);
        process.exit(1);
    }
};

module.exports = { initServices };
