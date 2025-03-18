const { TruyenTienHiep } = require('../Model');

// Tách hàm xử lý dữ liệu ra ngoài để tái sử dụng
const processTruyenData = (ListComic) => {
    const result = ListComic.map((truyen, index) => ({
        index: index + 1,
        Slug: truyen.Slug,
        ImageLinks: truyen.ImageLinks,
        Title: truyen.Title,
        LinkComic: truyen.LinkComic,
        Author: truyen.Author,
        Chapters: truyen.Chapters,
    }));
    // console.log(result);
    return result;
};

const CTTH = async () => {
    try {
        const QueryTruyenTienHiep = await TruyenTienHiep.findAll({
            attributes: ['Slug', 'ImageLinks', 'Title', 'LinkComic', 'Author', 'Chapters'], // Chỉ lấy các trường cần thiết
        });

        // Xử lý dữ liệu bằng hàm `processTruyenData`
        const processedData = processTruyenData(QueryTruyenTienHiep);

        // Trả về dữ liệu đã xử lý
        // console.log('TruyenTienHiepController:', processedData);
        return processedData;
    } catch (error) {
        console.error('Lỗi khi truy vấn dữ liệu:', error);
        throw error; // Ném lỗi ra ngoài để xử lý ở nơi khác nếu cần
    }
};
module.exports = { CTTH }; // Export hàm CTTH