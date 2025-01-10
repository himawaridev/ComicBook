require('dotenv').config();
const { RunCrawler } = require('./Data/TruyenTienHiepData');
const { RunCrawlerContent } = require('./Data/TruyenTienHiepContent');
const { sequelize } = require('./Model');
const { Categories } = require('./Services/Categories');
const { InitTruyenTienHiepContent } = require('./Services/TruyenTienHiepContent');
const { InitTruyenTienHiep } = require('./Services/TruyenTienHiep');
const { TruyenTienHiepContent } = require('./Model');
const { TruyenTienHiep } = require('./Model');

const Server = async () => {
    try {
        await sequelize.authenticate()
        console.warn("[ - - - - - Database connected - - - - - ]")
        console.warn('[ - - - - - Connection has been established successfully - - - - - ]');
        await sequelize.sync();
        await Categories();
        await InitTruyenTienHiep()

        // ---
        // const listTruyen = await TruyenTienHiepContent.findAll(); // Query data từ db
        const QueryTruyenTienHiep = await TruyenTienHiep.findAll(); // Query data từ db

        // console.log(listTruyen)
        // console.log(QueryTruyenTienHiep)


        if (!QueryTruyenTienHiep) {
            console.log("[ - - - Không có dữ liệu truyện trong bảng TruyenTienHiep - - - ]")
        }

        const ResultsQueryTruyenTienHiep = await Promise.all(
            QueryTruyenTienHiep.map(async (item) => { }),
        )

        // const save = QueryTruyenTienHiep.map(async (item) => {
        //     const data = await RunCrawler(item.url);
        //     // console.log(data);
        // })
    }
    catch (error) {
        console.error('Unable to connect to the database:', error.message);
    };
};
console.warn("[ - - - - - Server is running - - - - - ]");
Server();  