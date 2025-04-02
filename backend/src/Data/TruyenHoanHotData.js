const express = require('express'); // Thư viện ExpressJS
const axios = require('axios'); // Thư viện gửi HTTP request
const cheerio = require('cheerio'); // Thư viện xử lý HTML
const pLimit = require('p-limit'); // Thư viện giới hạn số lượng yêu cầu đồng thời

// Khai báo URL
const url = `https://truyenhoan.com/`;

// Giới hạn số lượng yêu cầu đồng thời
const limit = pLimit(5); // Giới hạn 5 yêu cầu đồng thời

// Hàm lấy HTML từ URL
async function getHTML(url) {
    try {
        const { data: html } = await axios.get(url);
        return html;
    } catch (error) {
        console.error("Error fetching HTML:", error.message);
        return null;
    }
}

// Hàm crawl dữ liệu
const CrawlTruyenHoanHot = async () => {
    const TruyenHoanHotData = []; // Tạo mảng rỗng để chứa dữ liệu

    // Tạo mảng chứa các URL cần crawl
    const UrlData = [];
    for (let i = 1; i <= 70; i++) { // Crawl 70 trang
        const UrlTrang = i === 1 ? url : `${url}trang-${i}/`;
        UrlData.push(UrlTrang);
    }

    // Sử dụng p-limit để giới hạn số lượng yêu cầu đồng thời
    const crawlTasks = UrlData.map(url => limit(() => getHTML(url)));
    const htmls = await Promise.all(crawlTasks);

    // Duyệt qua từng trang
    htmls.forEach((html, index) => {
        if (!html) {
            console.error(`[❌ Fetch HTML] Failed to Fetch HTML content for page ${index + 1}.`);
            return;
        }

        const $ = cheerio.load(html);

        // Duyệt qua từng phần tử .item
        $('.index-intro .item').each((i, element) => {
            // Lấy tiêu đề truyện
            const NameComic = $(element).find('.title h3').text().trim();

            // Lấy link truyện
            const LinkComic = $(element).find('a').attr('href');

            // Lấy link ảnh
            const ImageLinks = $(element).find('img').attr('lazysrc') || $(element).find('img').attr('src');

            // Chỉ thêm vào mảng nếu có tiêu đề
            if (NameComic) {
                TruyenHoanHotData.push({
                    NameComic: NameComic || 'Undefined NameComic',
                    LinkComic: LinkComic || 'Undefined LinkComic',
                    ImageLinks: ImageLinks || 'Undefined ImageLinks',
                });
            }
        });
    });

    // Kiểm tra kết quả
    if (TruyenHoanHotData.length === 0) {
        console.error("[❌ No data] Check the URL structure: Data/TruyenHoanHotData.js");
        return [];
    }

    // UnLock this line to see the data:
    // console.log("[TruyenHoanHotData.js]", TruyenHoanHotData)

    return TruyenHoanHotData;
};

// Xuất module
module.exports = {
    CrawlTruyenHoanHot,
};
