const { RunCrawler } = require('../Data/TruyenTienHiepData');
const { TruyenTienHiep } = require('../Model');

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


// Hàm khởi tạo Truyện Tiên Hiệp
const InitTruyenTienHiep = async () => {
    const DataTruyenTienHiep = await RunCrawler();

    if (!DataTruyenTienHiep) {
        console.error("DataTruyenTienHiep: No data to save");
        return;
    }

    try {
        for (let i = 0; i < DataTruyenTienHiep.length; i++) {
            const item = DataTruyenTienHiep[i];

            // Tạo slug từ NameComic
            const Slug = removeVietnameseTones(item.Title || 'Unknown');

            // Kiểm tra xem slug đã tồn tại hay chưa
            const checkExists = await TruyenTienHiep.findOne({ where: { Slug } });

            if (!checkExists) {
                // Nếu chưa tồn tại, lưu dữ liệu vào cơ sở dữ liệu
                const result = await TruyenTienHiep.create({
                    Slug,
                    ImageLinks: item.ImageLinks ? item.ImageLinks[0] : "N/A",
                    Title: item.Title || "Unknown",
                    Author: item.Author || "Unknown",
                    Chapters: item.Chapters || "Unknown",
                });

                console.warn("Data saved successfully:", result.toJSON());
            } else {
                console.log(`Slug already exists: ${Slug}`);
            }
        }
    } catch (error) {
        console.error("Error saving to database:", error);
        console.error(`Error saving to database:": ${Slug}`);
    }
};

module.exports = {
    InitTruyenTienHiep,
};
