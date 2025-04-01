const { CrawlTruyenKiemHiep } = require('../Data/TruyenKiemHiepData');
const { TruyenKiemHiep } = require('../Model');

// Hàm tạo slug từ tiêu đề
const removeVietnameseTones = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
};

// Hàm khởi tạo Truyện Tiên Hiệp  some thing ?? fix this linktruyen no come from
const TruyenKiemHiepServices = async () => {
    const DataTruyenKiemHiep = await CrawlTruyenKiemHiep();

    if (!DataTruyenKiemHiep) {
        console.error("DataTruyenKiemHiep: No data to save");
        return;
    }

    try {
        for (let i = 0; i < DataTruyenKiemHiep.length; i++) {
            const item = DataTruyenKiemHiep[i];

            // Tạo slug từ NameComic
            const Slug = removeVietnameseTones(item.Title || 'Unknown');

            // Kiểm tra xem slug đã tồn tại hay chưa
            const checkExists = await TruyenKiemHiep.findOne({ where: { Slug } });

            // Nếu chưa tồn tại, lưu dữ liệu vào cơ sở dữ liệu
            if (!checkExists) {
                const result = await TruyenKiemHiep.create({
                    Slug: item.Slug || "N/A",
                    ImageLinks: item.ImageLinks || "N/A",
                    Title: item.Title || "No Title available",
                    LinkComic: item.LinkComic || "No LinkComic available",
                    Author: item.Author || "No author available",
                    Chapters: item.Chapters || "No chapters available",
                });

                // console.log("Data đã lưu thành công:", result.toJSON());
            } else {
                console.log(`Slug already exists: ${Slug}`);
            }
        }

        console.log('Khởi tạo TruyenKiemHiepService thành công: Service/TruyenKiemHiepService.js');

    } catch (error) {
        console.error("Không thể lưu data:", error);
        console.error(`Không thể lưu data:": ${Slug}`);
    }
};

module.exports = {
    TruyenKiemHiepServices,
};