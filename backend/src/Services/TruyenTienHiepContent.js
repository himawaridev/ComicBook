const { RunCrawlerContent } = require('../Data/TruyenTienHiepContent');
const { TruyenTienHiepContent } = require('../Model');

const InitTruyenTienHiepContent = async () => {
    // Gọi hàm crawl và đợi dữ liệu trả về
    const DataTruyenTienHiepContent = await RunCrawlerContent();

    // Kiểm tra dữ liệu có tồn tại
    if (!DataTruyenTienHiepContent) {
        console.error("---------------------------------------------- No data to save");
        return;
    }
    // console.log("Data to save:", DataTruyenTienHiepContent);

    try {
        for (let i = 0; i < DataTruyenTienHiepContent.length; i++) {
            const item = DataTruyenTienHiepContent[i];
            const result = await TruyenTienHiepContent.create({
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

            // console.log("Data saved successfully:", result.toJSON());
        }

    } catch (error) {
        console.error("Error saving to database:", error);
    }
};

module.exports = {
    InitTruyenTienHiepContent,
};
