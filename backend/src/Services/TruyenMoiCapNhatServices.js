const { CrawlTruyenMoiCapNhat } = require('../Data/TruyenMoiCapNhatData');
const { TruyenMoiCapNhat } = require('../Model');

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
const TruyenMoiCapNhatServices = async () => {
    const DataTruyenMoiCapNhat = await CrawlTruyenMoiCapNhat();

    if (!DataTruyenMoiCapNhat) {
        console.error("DataTruyenMoiCapNhat: No data to save");
        return;
    }

    try {
        for (let i = 0; i < DataTruyenMoiCapNhat.length; i++) {
            const item = DataTruyenMoiCapNhat[i];

            // Nếu item.Slug không có giá trị thì tạo Slug từ Title
            const Slug = item.Slug ? removeVietnameseTones(item.Slug) : removeVietnameseTones(item.Title || 'Unknown');

            // Kiểm tra xem slug đã tồn tại hay chưa
            const checkExists = await TruyenMoiCapNhat.findOne({ where: { Slug } });

            // Nếu chưa tồn tại, lưu dữ liệu vào cơ sở dữ liệu
            if (!checkExists) {
                const result = await TruyenMoiCapNhat.create({
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

        console.log('Khởi tạo TruyenMoiCapNhatService thành công: Service/TruyenMoiCapNhatService.js');

    } catch (error) {
        console.error("Không thể lưu data:", error);
        console.error(`Không thể lưu data:": ${Slug}`);
    }
};

module.exports = {
    TruyenMoiCapNhatServices,
};