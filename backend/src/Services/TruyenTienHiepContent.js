const { RunCrawlerContent } = require('../Data/TruyenTienHiepContent');
const { TruyenTienHiepContent } = require('../Model');

// Hàm tạo slug từ tiêu đề
const removeVietnameseTones = (str) => {
    // Sử dụng phương thức normalize để chuyển đổi chuỗi sang dạng Unicode
    return str
        .normalize("NFD") // NFD: Decomposition (phân tích thành các ký tự cơ bản)
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các ký tự dấu (diacritics)
        .replace(/đ/g, 'd') // Thay thế 'đ' bằng 'd'
        .replace(/Đ/g, 'D') // Thay thế 'Đ' bằng 'D'
        .toLowerCase() // Chuyển đổi chuỗi sang dạng chữ thường
        .trim() // Loại bỏ các khoảng trắng ở đầu và cuối chuỗi
        .replace(/[^a-z0-9\s]/g, '') // Loại bỏ các ký tự không phải chữ cái hoặc số
        .replace(/\s+/g, '-'); // Thay thế các khoảng trắng bằng dấu gạch ngang
};



const InitTruyenTienHiepContent = async () => {
    const DataTruyenTienHiepContent = await RunCrawlerContent();

    if (!DataTruyenTienHiepContent) {
        console.error("DataTruyenTienHiepContent: No data to save");
        return;
    }

    try {
        for (let i = 0; i < DataTruyenTienHiepContent.length; i++) {
            const item = DataTruyenTienHiepContent[i];

            // Tạo slug từ NameComic
            const Slug = removeVietnameseTones(item.NameComic || 'Unknown');

            // Kiểm tra xem slug đã tồn tại hay chưa
            const checkExists = await TruyenTienHiepContent.findOne({ where: { Slug } });

            if (!checkExists) {
                const result = await TruyenTienHiepContent.create({
                    Slug,
                    ImageLinks: item.ImageLinks ? item.ImageLinks[0] : "N/A",
                    TitleIntro: item.TitleIntro || "No intro available",
                    NameComic: item.NameComic || "Unknown",
                    Rating: parseFloat(item.Rating) || 0,
                    RatingCount: parseInt(item.RatingCount, 10) || 0,
                    Description: item.Description || "No description available",
                    Author: item.Author || "Unknown",
                    GenresArray: item.GenresArray || [],
                    Status: item.Status || "Unknown",
                    Tags: Array.isArray(item.Tags) ? item.Tags : [],
                    Chapters: Array.isArray(item.Chapters) ? item.Chapters : [],
                });

                console.warn("Data saved successfully:", result.toJSON());
            } else {
                console.log(`Slug already exists: ${Slug}`)
            }
        }

    } catch (error) {
        console.error("Error saving to database:", error);
        console.error(`Error saving to database:": ${Slug}`);
    }
};

module.exports = {
    InitTruyenTienHiepContent,
};
