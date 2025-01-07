const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

// Khai báo URL
const nameType = 'truyen-tien-hiep';
const url = `https://truyenfull.tv/${nameType}/`;

// Hàm lấy HTML từ URL
async function getHTML() {
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

    const res = await getHTML();
    if (!res) {
        console.error("Failed to fetch HTML content.");
        return [];
    }

    const $ = cheerio.load(res);

    // Lấy link ảnh
    const ImageLinks = [];
    $('.row').map((i, element) => {
        const src = $(element).find('.col-list-image img').attr('src');
        if (src) {
            ImageLinks.push(src);
        }
    });

    console.log("[ImageLinks]", ImageLinks);

    // Duyệt qua từng phần tử `.row`
    $('.row').each((i, element) => {

        // Lấy tiêu đề truyện
        const Title = $(element).find('.truyen-title').text().trim();

        // Lấy tên tác giả
        const Author = $(element).find('.glyphicon-pencil').parent().text().trim();

        // Lấy số chương
        const Chapters = $(element).find('.glyphicon-list').parent().text().trim();

        // Chỉ thêm vào mảng nếu có tiêu đề
        if (Title) {
            ComicData.push({
                Title,
                Author: Author || 'Unknown',
                Chapters: Chapters || '0 chương',
                ImageLinks: ImageLinks[i] || 'N/A', // Liên kết ảnh cho từng truyện
            });
        }
    });

    // Kiểm tra kết quả
    if (ComicData.length === 0) {
        console.error("No data found. Please check the URL structure.");
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
