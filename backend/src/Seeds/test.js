// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const pLimit = require('p-limit');
// const THELOAITRUYEN_DEFAULT = require('../Data/TheLoaiTruyenData.json');

// const limit = pLimit(5);

// async function getHTML(url) {
//     try {
//         const { data: html } = await axios.get(url);
//         return html;
//     } catch (error) {
//         console.error("Error fetching HTML:", error.message);
//         return null;
//     }
// }

// const CrawlTruyenTheoTheLoai = async (slug) => {
//     const url = `https://truyenhoan.com/${slug}/hoan/`;
//     const ComicData = [];
//     const urls = [];

//     for (let i = 1; i <= 70; i++) {
//         const urlPage = i === 1 ? url : `${url}trang-${i}/`;
//         urls.push(urlPage);
//     }

//     const crawlTasks = urls.map(url => limit(() => getHTML(url)));
//     const htmls = await Promise.all(crawlTasks);

//     htmls.forEach((html, index) => {
//         if (!html) {
//             console.error(`Failed to fetch HTML content for page ${index + 1}.`);
//             return;
//         }

//         const $ = cheerio.load(html);

//         $('.row').each((i, element) => {
//             const ImageLinks = $(element).find('.col-list-image > div').children('div').eq(0).attr('data-desk-image');
//             const Title = $(element).find('.truyen-title').text().trim();
//             const LinkComic = $(element).find('.truyen-title a').attr('href');
//             const Author = $(element).find('.glyphicon-pencil').parent().text().trim();
//             const Chapters = $(element).find('.glyphicon-list').parent().text().trim();

//             if (Title) {
//                 ComicData.push({
//                     Title: Title || 'N/A',
//                     Author: Author || 'Unknown',
//                     LinkComic: LinkComic || 'N/A',
//                     Chapters: Chapters || '0 chương',
//                     ImageLinks: ImageLinks || 'N/A',
//                 });
//             }
//         });
//     });

//     if (ComicData.length === 0) {
//         console.error(`No data found for slug: ${slug}. Please check the URL structure.`);
//         return [];
//     }

//     return ComicData;
// };

// const CrawlAllCategories = async () => {
//     for (const category of THELOAITRUYEN_DEFAULT) {
//         console.log(`Fetching data for category: ${category.slug}`);
//         const data = await CrawlTruyenTheoTheLoai(category.slug);
//         console.log(`Fetched ${data.length} stories for category: ${category.slug}`);
//     }
// };

// module.exports = {
//     CrawlAllCategories,
//     CrawlTruyenTheoTheLoai,
// };
