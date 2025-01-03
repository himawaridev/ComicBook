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
        return;
    }

    const $ = cheerio.load(res);

    //

    const ImageLinks = [] || 'N/A';

    $('.col-list-image div .cover').map((i, element) => {
        const src = $(element).attr('src'); // Lấy giá trị của thuộc tính src
        if (src) {
            ImageLinks.push(src); // Thêm link vào mảng
        }
    });
    // console.error("??? ????????????", ImageLinks);

    // Duyệt qua từng phần tử `.row`
    $('.row').each((i, element) => {
        // Lấy URL hình ảnh từ thẻ <img>
        // const Image = $(element).find('.col-list-image img').attr('src') || 'N/A';

        // Lấy tiêu đề truyện
        const Title = $(element).find('.truyen-title').text().trim();

        // Lấy tên tác giả
        const Author = $(element).find('.glyphicon-pencil').parent().text().trim();

        // Lấy số chương
        const Chuong = $(element).find('.glyphicon-list').parent().text().trim();

        // Chỉ thêm vào mảng nếu có tiêu đề
        if (Title) {
            ComicData.push({ Title, Author, Chuong });
        }
    });

    // Kiểm tra kết quả
    if (ComicData.length === 0) {
        console.error("No data found. Please check the URL structure.");
        return;
    }

    // In dữ liệu ra console
    // console.log("[TruyenTienHiepData.js]", ComicData);
    return ComicData;
};

// Xuất module
module.exports = {
    RunCrawler,
};
