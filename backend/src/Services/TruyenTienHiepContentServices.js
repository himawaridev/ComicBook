const { RunCrawlerContent } = require('../Data/TruyenTienHiepContentData');
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


// Khỏi tạo dữ liệu TruyenTienHiepContent đợi hàm RunCrawlerContent chạy xong
const TruyenTienHiepContentService = async () => {

    // Chạy hàm RunCrawlerContent, đợi xong thì hàm TruyenTienHiepContentService mới chạy
    const DataTruyenTienHiepContent = await RunCrawlerContent();

    // Check xem có dữ liệu không, nếu không thì báo lỗi
    if (!DataTruyenTienHiepContent) {
        console.error("DataTruyenTienHiepContent: No data to save");
        return;
    }

    try {
        for (let i = 0; i < DataTruyenTienHiepContent.length; i++) {
            const item = DataTruyenTienHiepContent[i];


            // Nếu item.Slug không có giá trị thì tạo Slug từ Title
            const Slug = item.Slug ? removeVietnameseTones(item.Slug) : removeVietnameseTones(item.NameComic || 'Unknown');

            // Kiểm tra xem slug đã tồn tại hay chưa
            const checkExists = await TruyenTienHiepContent.findOne({ where: { Slug } });

            // Nếu chưa tồn tại, lưu dữ liệu vào cơ sở dữ liệu
            if (!checkExists) {
                const result = await TruyenTienHiepContent.create({
                    Slug: Slug,
                    ImageLinks: item.ImageLinks || "N/A",
                    NameComic: item.NameComic || "No NameComic available",
                    Rating: parseFloat(item.Rating) || 0,
                    RatingCount: parseInt(item.RatingCount, 10) || 0,
                    Description: item.Description || "No description available",
                    Author: item.Author || "No author available",
                    Genres: item.Genres || [],
                    Status: item.Status || "No status available",
                    Tags: Array.isArray(item.Tags) ? item.Tags : [],
                    Chapters: Array.isArray(item.Chapters) ? item.Chapters : [],
                });

                // console.log("Data đã lưu thành công:", result.toJSON());
            } else {
                // console.log(`Slug already exists : ${Slug}`)
            }
        }

        console.log('Khởi tạo TruyenTienHiepContent thành công: Service/TruyenTienHiepContent.js');

    } catch (error) {
        console.error("Không thể lưu data:", error);
        console.error(`Không thể lưu data:": ${Slug}`);
    }
};

module.exports = {
    TruyenTienHiepContentService,
};
