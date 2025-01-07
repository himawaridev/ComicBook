const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const nameType = [
  'phong-than-chau-f2.23745',
  'truyen-tien-hiep',
  'truyen-do-thi',
  // Thêm các đường dẫn khác vào đây
];

const urls = nameType.map((name) => `https://truyenfull.tv/${name}/`); // Tạo ra các URL tương ứng

// Hàm lấy HTML từ URL
async function getHTML(url) {
  try {
    const { data: html } = await axios.get(url); // Gửi request HTTP GET đến URL
    return html;
  } catch (error) {
    console.error("Error fetching HTML:", error.message);
    return null; // Trả về null nếu có lỗi
  }
}

// Hàm xử lý crawl nội dung từ HTML
const RunCrawlerContent = async () => {
  const ComicDataContent = []; // Mảng lưu dữ liệu của truyện

  for (const url of urls) {
    const res = await getHTML(url); // Gọi hàm getHTML() cho từng URL
    if (!res) {
      console.error("Failed to fetch HTML content.");
      continue;
    }

    const $ = cheerio.load(res); // Load HTML vào cheerio để xử lý

    // Lấy hình ảnh của truyện
    const ImageLinks = [] || 'N/A';

    $('.book img').map((i, element) => {
      const src = $(element).attr('src'); // Lấy giá trị của thuộc tính src
      if (src) {
        ImageLinks.push(src); // Thêm link vào mảng
      }
    });

    // Lấy tiêu đề của truyện
    const TitleIntro = $('.book-intro h2').text().trim() || 'N/A';

    // Lấy tên truyện
    const NameComic = $('.title').text().trim() || 'N/A';

    // Lấy rate truyện
    const Rating = $('span[itemprop="ratingValue"]').text().trim() || 'N/A';
    const RatingCount = $('span[itemprop="ratingCount"]').text().trim() || 'N/A';

    // Lấy mô tả của truyện
    const Description = $('.desc-text').text().trim();

    // Lấy tác giả
    const Author = $('.info a[itemprop="author"]').text().trim();

    // Lấy thể loại
    const GenresArray = [];

    $('div h3:contains("Thể loại")').nextAll('a').map((i, element) => {
      const Link = $(element).attr('href'); // Lấy giá trị href
      const Text = $(element).text().trim(); // Lấy text bên trong thẻ <a>
      if (Link && Text) {
        GenresArray.push({ Link, Text }); // Lưu vào mảng
      }
    });

    // Lấy trạng thái
    const Status = $('.info .text-primary').text().trim() || 'N/A';

    // Mảng lưu thông tin các tag
    const Tags = [];

    $('div h3:contains("Tags")').nextAll('a').map((i, element) => {
      const Link = $(element).attr('href'); // Lấy giá trị href
      const Text = $(element).text().trim(); // Lấy text bên trong thẻ <a>
      if (Link && Text) {
        Tags.push({ Link, Text }); // Lưu vào mảng
      }
    });

    // Mảng lưu thông tin các chương
    const Chapters = [];

    $('.list-chapter li a').each((i, element) => {
      const Link = $(element).attr('href'); // Lấy giá trị href
      const Text = $(element).find('.chapter-text span').text().trim(); // Lấy nội dung bên trong .chapter-text span
      const Number = $(element).text().replace(Text, '').trim(); // Lấy số chương bằng cách loại bỏ Text khỏi tổng nội dung

      if (Link && Text) {
        // Lưu dữ liệu chương vào mảng
        Chapters.push({ Link, Text, Number });
      }
    });

    // Thêm dữ liệu vào mảng ComicDataContent
    ComicDataContent.push({
      ImageLinks,
      TitleIntro,
      NameComic,
      Rating,
      RatingCount,
      Description,
      Author,
      GenresArray,
      Status,
      Tags,
      Chapters,
    });
  }

  return ComicDataContent;
};

// Xuất module
module.exports = {
  RunCrawlerContent,
};