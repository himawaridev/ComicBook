// const axios = require('axios');
// const { CrawlTruyenTienHiep } = require('../Data/TruyenTienHiepData'); // Import hàm crawl dữ liệu
// const THELOAITRUYEN_DEFAULT = require('../Data/TheLoaiTruyenData.json'); // Import danh sách thể loại

// const fetchDataBySlug = async () => {
//     for (const category of THELOAITRUYEN_DEFAULT) {
//         const nameType = category.slug; // Lấy slug từ danh sách thể loại
//         console.log(`Fetching data for: ${nameType}`);

//         try {
//             const data = await CrawlTruyenTienHiep(nameType);
//             console.log(`Fetched ${data.length} items for category: ${nameType}`);
//         } catch (error) {
//             console.error(`Error fetching data for ${nameType}:`, error.message);
//         }
//     }
// };

// fetchDataBySlug();
