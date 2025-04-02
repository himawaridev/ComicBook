const { CrawlTruyenHot } = require('../Data/TruyenHotData');
const { TruyenHot } = require('../Model');

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
const TruyenHotServices = async () => {
    const DataTruyenHot = await CrawlTruyenHot();

    if (!DataTruyenHot) {
        console.error("DataTruyenHot: No data to save");
        return;
    }

    try {
        for (let i = 0; i < DataTruyenHot.length; i++) {
            const item = DataTruyenHot[i];

            // Nếu item.Slug không có giá trị thì tạo Slug từ Title
            const Slug = item.Slug ? removeVietnameseTones(item.Slug) : removeVietnameseTones(item.Title || 'Unknown');

            // Kiểm tra xem slug đã tồn tại hay chưa
            const checkExists = await TruyenHot.findOne({ where: { Slug } });

            // Nếu chưa tồn tại, lưu dữ liệu vào cơ sở dữ liệu
            if (!checkExists) {
                const result = await TruyenHot.create({
                    Slug: Slug,
                    ImageLinks: item.ImageLinks || "N/A",
                    Title: item.Title || "No Title available",
                    LinkComic: item.LinkComic || "No LinkComic available",
                    Author: item.Author || "No author available",
                    Chapters: item.Chapters || "No chapters available",
                });

                // console.log("Data đã lưu thành công:", result.toJSON());
            } else {
                // console.log(`Slug already exists: ${Slug}`);
            }
        }

        console.log('Khởi tạo TruyenHotService thành công: Service/TruyenHotService.js');

    } catch (error) {
        console.error("Không thể lưu data:", error);
        console.error(`Không thể lưu data:": ${Slug}`);
    }
};

module.exports = {
    TruyenHotServices,
};