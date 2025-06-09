const axios = require('axios'); // Thư viện gửi HTTP request
const cheerio = require('cheerio'); // Thư viện xử lý HTML
const pLimit = require('p-limit'); // Thư viện giới hạn số lượng yêu cầu đồng thời

class TruyenHoanService {
    static instance = null;
    getInstance() {
        if (TruyenHoanService.instance == null) {
            TruyenHoanService.instance = new TruyenHoanService();
        }
        return TruyenHoanService.instance;
    }
    constructor() {
    }
    // crawl danh sach truyen tu URL bởi category
    async GetStoriesByURL(url) {
        const StoryList = []; // Tạo mảng rỗng để chứa dữ liệu

        // Tạo mảng chứa các URL cần crawl
        const UrlData = [];
        for (let i = 1; i <= 70; i++) { // Crawl 61 trang
            const UrlTrang = i === 1 ? url : `${url}trang-${i}/`;
            UrlData.push(UrlTrang);
        }

        // Sử dụng p-limit để giới hạn số lượng yêu cầu đồng thời
        const crawlTasks = UrlData.map(url => limit(() => TruyenHoanService.getHTML(url)));
        const htmls = await Promise.all(crawlTasks);

        // Duyệt qua từng trang
        htmls.forEach((html, index) => {
            if (!html) {
                console.error(`[❌ Fetch HTML] Failed to Fetch HTML content for page ${index + 1}.`);
                return;
            }

            const $ = cheerio.load(html);

            // Duyệt qua từng phần tử .row
            $('.row').each((i, element) => {

                // ImageLinks: Lấy link ảnh:
                const ImageLinks = $(element).find('.col-list-image > div').children('div').eq(0).attr('data-desk-image');

                // Title: Lấy tiêu đề truyện:
                const Title = $(element).find('.truyen-title').text().trim();

                // LinkComic: Lấy link truyện dùng để crawl:
                const LinkComic = $(element).find('.truyen-title a').attr('href');

                // Author: Lấy tên tác giả:
                const Author = $(element).find('.glyphicon-pencil').parent().text().trim();

                // Chapters: Lấy số chương:
                const Chapters = $(element).find('.glyphicon-list').parent().text().trim();

                // Chỉ thêm vào mảng nếu có tiêu đề:
                if (Title) {
                    StoryList.push({
                        Title: Title || 'Undefined Title', // Tiêu đề truyện
                        Author: Author || 'Undefined Author', // Tên tác giả
                        LinkComic: LinkComic || 'Undefined LinkComic', // Link truyện dùng để crawl
                        Chapters: Chapters || 'Undefined Chapters', // Số chương
                        ImageLinks: ImageLinks || 'Undefined ImageLinks', // Liên kết ảnh cho từng truyện
                    });
                }
            });
        });

        // Kiểm tra kết quả
        if (StoryList.length === 0) {
            console.error("[❌ No data] Check the URL structure: Data/TruyenKiemHiepData.js");
            return [];
        }

        // UnLock this line to see the data:
        // console.log("[TruyenKiemHiepData.js]", TruyenKiemHiepData);

        return StoryList;
    }

    async getHTML(_url) {
        try {
            const { data: html } = await axios.get(_url);
            return html;
        } catch (error) {
            console.error("Error fetching HTML:", error.message);
            return null;
        }
    }
}

module.exports = TruyenHoanService