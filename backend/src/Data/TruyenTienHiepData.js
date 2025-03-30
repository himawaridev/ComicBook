const express = require('express'); // Thư viện ExpressJS
const axios = require('axios'); // Thư viện gửi HTTP request
const cheerio = require('cheerio'); // Thư viện xử lý HTML
const pLimit = require('p-limit'); // Thư viện giới hạn số lượng yêu cầu đồng thời

// Khai báo URL
const nameType = 'truyen-tien-hiep/hoan';
const url = `https://truyenhoan.com/${nameType}/`;

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
const RunCrawler = async () => {
    // Tạo mảng rỗng để chứa dữ liệu
    const ComicData = [];

    // Tạo mảng chứa các URL cần crawl
    const urls = [];
    for (let i = 1; i <= 61; i++) { // Crawl 61 trang
        const urlPage = i === 1 ? url : `${url}trang-${i}/`;
        urls.push(urlPage);
    }

    // Sử dụng p-limit để giới hạn số lượng yêu cầu đồng thời
    const crawlTasks = urls.map(url => limit(() => getHTML(url)));
    const htmls = await Promise.all(crawlTasks);

    // Duyệt qua từng trang
    htmls.forEach((html, index) => {
        if (!html) {
            console.error(`Failed to fetch HTML content for page ${index + 1}.`);
            return;
        }

        const $ = cheerio.load(html);

        // Duyệt qua từng phần tử .row
        $('.row').each((i, element) => {

            // Lấy link ảnh
            const ImageLinks = $(element).find('.col-list-image > div').children('div').eq(0).attr('data-desk-image');

            // Lấy tiêu đề truyện
            const Title = $(element).find('.truyen-title').text().trim();

            // LinkComic: Lấy link truyện dùng để crawl
            const LinkComic = $(element).find('.truyen-title a').attr('href');

            // Lấy tên tác giả
            const Author = $(element).find('.glyphicon-pencil').parent().text().trim();

            // Lấy số chương
            const Chapters = $(element).find('.glyphicon-list').parent().text().trim();

            // Chỉ thêm vào mảng nếu có tiêu đề
            if (Title) {
                ComicData.push({
                    Title: Title || 'N/A', // Tiêu đề truyện
                    Author: Author || 'Unknown',
                    LinkComic: LinkComic || 'N/A', // Link truyện dùng để crawl
                    Chapters: Chapters || '0 chương',
                    ImageLinks: ImageLinks || 'N/A', // Liên kết ảnh cho từng truyện
                });
            }
        });
    });

    // Kiểm tra kết quả
    if (ComicData.length === 0) {
        console.error("No data found. Please check the URL structure. Data/TruyenTienHiepData.js");
        return [];
    }

    // UnLock this line to see the data:
    // console.log("[TruyenTienHiepData.js]", ComicData);

    return ComicData;
};

// Xuất module
module.exports = {
    RunCrawler,
};