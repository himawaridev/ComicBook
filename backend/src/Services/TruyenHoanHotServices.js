const { CrawlTruyenHoanHot } = require('../Data/TruyenHoanHotData');
const { TruyenHoanHot } = require('../Model');

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
const TruyenHoanHotServices = async () => {
    const DataTruyenHoanHot = await CrawlTruyenHoanHot();

    if (!DataTruyenHoanHot) {
        console.error("DataTruyenHoanHot: No data to save");
        return;
    }

    try {
        for (let i = 0; i < DataTruyenHoanHot.length; i++) {
            const item = DataTruyenHoanHot[i];

            // Nếu item.Slug không có giá trị thì tạo Slug từ Title
            const Slug = item.Slug ? removeVietnameseTones(item.Slug) : removeVietnameseTones(item.NameComic || 'Unknown');

            // Kiểm tra xem slug đã tồn tại hay chưa
            const checkExists = await TruyenHoanHot.findOne({ where: { Slug } });

            // Nếu chưa tồn tại, lưu dữ liệu vào cơ sở dữ liệu
            if (!checkExists) {
                const result = await TruyenHoanHot.create({
                    Slug: Slug,
                    ImageLinks: item.ImageLinks || "N/A",
                    NameComic: item.NameComic || "No NameComic available",
                    LinkComic: item.LinkComic || "No LinkComic available",
                });

                // console.log("Data đã lưu thành công:", result.toJSON());
            } else {
                // console.log(`Slug already exists: ${Slug}`);
            }
        }

        console.log('Khởi tạo TruyenHoanHotService thành công: Service/TruyenHoanHotService.js');

    } catch (error) {
        console.error("Không thể lưu data:", error);
        console.error(`Không thể lưu data:": ${Slug}`);
    }
};

module.exports = {
    TruyenHoanHotServices,
};