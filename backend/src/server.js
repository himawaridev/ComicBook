require('dotenv').config()
const { RunCrawler } = require('./Data/TruyenTienHiepData');
const { RunCrawlerContent } = require('./Data/TruyenTienHiepContent');
const { sequelize } = require('./Model');
const { Categories } = require('./Services/Categories');
const { InitTruyenTienHiepContent } = require('./Services/TruyenTienHiepContent');
const { InitTruyenTienHiep } = require('./Services/TruyenTienHiep')

const Server = async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connected")
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        await Categories();
        InitTruyenTienHiepContent()
        InitTruyenTienHiep()
    }
    catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}
console.log("Server is running")

Server()

