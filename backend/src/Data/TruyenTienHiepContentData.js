const express = require('express'); // Thư viện ExpressJS
const axios = require('axios'); // Thư viện gửi HTTP request
const cheerio = require('cheerio'); // Thư viện xử lý HTML
const pLimit = require('p-limit'); // Thư viện giới hạn số lượng yêu cầu đồng thời

const nameType = 'vo-thuong-sat-than.102';
const url = `https://truyenhoan.com/${nameType}/`; // URL của truyện

// Hàm lấy HTML từ URL
async function getHTML() {
    try {
        const { data: html } = await axios.get(url); // Gửi yêu cầu HTTP GET đến URL
        return html;
    } catch (error) {
        console.error("Error fetching HTML:", error.message);
        return null;
    }
}

// Hàm xử lý crawl nội dung từ HTML
const RunCrawlerContent = async () => {
    const ComicDataContent = []; // Mảng lưu dữ liệu của truyện

    const res = await getHTML(); // Lấy HTML từ URL
    if (!res) {
        console.error("Failed to fetch HTML content.");
        return;
    }

    const $ = cheerio.load(res); // Load HTML vào cheerio để xử lý

    // ---------------------------- //
    // ImageLinks: Lấy link ảnh
    const ImageLinks = $('.book img').attr('src');

    // NameComic: Lấy tên của truyện    
    const NameComic = $('.title').text().trim() || 'N/A';

    // Rating: Lấy rate truyện
    const Rating = $('span[itemprop="ratingValue"]').text().trim() || 'N/A';

    // RatingCount: Lấy số lượng rate truyện
    const RatingCount = $('span[itemprop="ratingCount"]').text().trim() || 'N/A';

    // Description: Lấy mô tả của truyện
    const Description = $('.desc-text').text().trim() || 'N/A';

    // Author: Lấy tên tác giả
    const Author = $('.info a[itemprop="author"]').text().trim() || 'N/A';

    // Genres: Lấy thể loại của truyện
    const Genres = [];

    $('div h3:contains("Thể loại")').nextAll('a').map((i, element) => {
        const Link = $(element).attr('href'); // Lấy đường dẫn các thể loại
        const Text = $(element).text().trim(); // lấy tên các thể loại
        if (Link && Text) {
            Genres.push({ Link, Text }); // Lưu vào mảng
        }
    });

    // Status: Lấy trạng thái của truyện
    const Status = $('.info .text-primary').text().trim() || $('.info .text-success').text().trim();

    // Tags: Mảng lưu thông tin các tag
    const Tags = [];

    $('div h3:contains("Tags")').nextAll('a').map((i, element) => {
        const Link = $(element).attr('href'); // Lấy giá trị href
        const Text = $(element).text().trim(); // Lấy text bên trong thẻ <a>
        if (Link && Text) {
            Tags.push({ Link, Text }); // Lưu vào mảng
        }
    });

    // Chapters: Mảng lưu thông tin các chương
    const Chapters = [];

    $('.list-chapter li a').each((i, element) => {
        const Link = $(element).attr('href'); // Lấy giá trị href
        const Text = $(element).find('.chapter-text span').text().trim(); // Lấy nội dung bên trong .chapter-text span
        const Number = $(element).text().replace(Text, '').trim(); // Lấy số chương bằng cách loại bỏ Text khỏi tổng nội dung

        const ConcatLink = Text.concat(' ', Number);

        if (Link && Text) {
            // Lưu dữ liệu chương vào mảng
            Chapters.push({ Link, ConcatLink });
        }
    });

    // Thêm dữ liệu vào mảng ComicDataContent
    ComicDataContent.push({
        ImageLinks,
        NameComic,
        Rating,
        RatingCount,
        Description,
        Author,
        Genres,
        Status,
        Tags,
        Chapters,
    });

    // Kiểm tra kết quả
    if (Chapters.length === 0) {
        console.error("No data found. Please check the URL structure. Data/TruyenTienHiepContent.js");
        return [];
    }

    // UnLock this line to see the data:
    // console.log("[TruyenTienHiepDataContent]", ComicDataContent); // In dữ liệu đã crawl
    return ComicDataContent;
};

// Xuất module
module.exports = {
    RunCrawlerContent,
};
