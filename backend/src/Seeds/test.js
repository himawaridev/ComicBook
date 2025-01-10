// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const pLimit = require('p-limit');

// // Khai báo URL
// const nameType = 'truyen-tien-hiep';
// const url = `https://truyenfull.tv/${nameType}/`;

// // Giới hạn số lượng yêu cầu đồng thời
// const limit = pLimit(50); // Giới hạn 50 yêu cầu đồng thời

// // Hàm lấy HTML từ URL
// async function getHTML(url) {
//     try {
//         const { data: html } = await axios.get(url);
//         return html;
//     } catch (error) {
//         console.error("Error fetching HTML:", error.message);
//         return null;
//     }
// }

// // Hàm crawl dữ liệu
// const RunCrawler = async () => {
//     // Tạo mảng rỗng để chứa dữ liệu
//     const ComicData = [];

//     // Tạo mảng chứa các URL cần crawl
//     const urls = [];
//     for (let i = 1; i <= 61; i++) { // Crawl 61 trang
//         const urlPage = i === 1 ? url : `${url}trang-${i}/`;
//         urls.push(urlPage);
//     }

//     // Sử dụng p-limit để giới hạn số lượng yêu cầu đồng thời
//     const crawlTasks = urls.map(url => limit(() => getHTML(url)));
//     const htmls = await Promise.all(crawlTasks);

//     // Duyệt qua từng trang
//     htmls.forEach((html, index) => {
//         if (!html) {
//             console.error(`Failed to fetch HTML content for page ${index + 1}.`);
//             return;
//         }

//         const $ = cheerio.load(html);

//         // Lấy link ảnh
//         const ImageLinks = [];
//         $('.row').map((i, element) => {
//             const src = $(element).find('.col-list-image img').attr('src');
//             if (src) {
//                 ImageLinks.push(src);
//             }
//         });

//         console.log(`[ImageLinks] Page ${index + 1}:`, ImageLinks);

//         // Duyệt qua từng phần tử .row
//         $('.row').each((i, element) => {

//             // Lấy tiêu đề truyện
//             const Title = $(element).find('.truyen-title').text().trim();

//             // Lấy tên tác giả
//             const Author = $(element).find('.glyphicon-pencil').parent().text().trim();

//             // Lấy số chương
//             const Chapters = $(element).find('.glyphicon-list').parent().text().trim();

//             // Chỉ thêm vào mảng nếu có tiêu đề
//             if (Title) {
//                 ComicData.push({
//                     Title,
//                     Author: Author || 'Unknown',
//                     Chapters: Chapters || '0 chương',
//                     ImageLinks: ImageLinks[i] || 'N/A', // Liên kết ảnh cho từng truyện
//                 });
//             }
//         });
//     });

//     // Kiểm tra kết quả
//     if (ComicData.length === 0) {
//         console.error("No data found. Please check the URL structure.");
//         return [];
//     }

//     // UnLock this line to see the data:
//     // console.log("[TruyenTienHiepData.js]", ComicData);

//     return ComicData;
// };

// // Xuất module
// module.exports = {
//     RunCrawler,
// };


// ????????????? //

// $('.list-chapter li a').each((i, element) => {
//     const Link = $(element).attr('href'); // Lấy giá trị href
//     const Text = $(element).find('.chapter-text span').text().trim(); // Lấy nội dung bên trong .chapter-text span
//     const Number = $(element).text().replace(Text, '').trim(); // Lấy số chương bằng cách loại bỏ Text khỏi tổng nội dung

//     if (Link && Text) {
//         // Lưu dữ liệu chương vào mảng
//         Chapters.push({ Link, Text, Number });
//     }
// });

// // ChapterText: Mảng lưu thông tin các chương
// const ChapterTexts = [];
// $('.list-chapter li a').each((i, element) => {
//     const ChapterText = $(element).text().trim(); // Lấy toàn bộ nội dung văn bản

//     ChapterTexts.push({ ChapterText }); // Thêm dữ liệu vào mảng
// });

// console.log("[Check ChapterTexts: =>]", ChapterTexts);

// // ChapterLinks: Mảng lưu thông tin các chương
// const ChapterLinks = [];
// let chapterStart = 1; // Bạn có thể thay đổi số chương bắt đầu này
// let chapterEnd = 10; // Bạn có thể thay đổi số chương kết thúc này

// for (let i = chapterStart; i <= chapterEnd; i++) {
//     const ChapterLink = `https://truyenfull.tv/vu-luyen-dien-phong-vo-luyen-dinh-phong/chuong-${i}.html`;

//     // Lưu dữ liệu chương vào mảng
//     ChapterLinks.push({ ChapterLink });
// }
// console.log("[Check ChapterLinks]", ChapterLinks);