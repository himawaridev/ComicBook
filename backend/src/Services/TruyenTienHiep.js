const { RunCrawler } = require('../Data/TruyenTienHiepData');
const { TruyenTienHiep } = require('../Model');

const InitTruyenTienHiep = async () => {

    const DataTruyenTienHiep = await RunCrawler();

    if (!DataTruyenTienHiep) {
        console.error("---------------------------------------------- No data to save");
        return;
    }

    try {
        for (let i = 0; i < DataTruyenTienHiep.length; i++) {
            const item = DataTruyenTienHiep[i];
            const result = await TruyenTienHiep.create({
                ImageLinks: item.ImageLinks ? item.ImageLinks[0] : "N/A",
                TitleIntro: item.TitleIntro || "No intro available",
                NameComic: item.NameComic || "Unknown",
                RatingCount: parseInt(item.RatingCount, 10) || 0
            });

            console.log("Data saved successfully:", result.toJSON());
        }

    } catch (error) {
        console.error("Error saving to database:", error);
    }
};

module.exports = {
    InitTruyenTienHiep,
};
