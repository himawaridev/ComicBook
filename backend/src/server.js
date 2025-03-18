require('dotenv').config();
const { sequelize } = require('./Model');
const { Categories } = require('./Services/Categories');
const { InitTruyenTienHiepContent } = require('./Services/TruyenTienHiepContent');
const { InitTruyenTienHiep } = require('./Services/TruyenTienHiep');
const { TruyenTienHiepContent } = require('./Model');
const { TruyenTienHiep } = require('./Model');

// Const demo test
const { CTTH } = require('./Controller/TruyenTienHiepController');

const Server = async () => {
    try {
        const o = await sequelize.authenticate()
        console.log("[ Database connected ]")
        console.log('[ Connection has been established successfully ]');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('-----------------------------------------------------------------------');
        await sequelize.sync();
        await Categories();
        await InitTruyenTienHiep();
        await InitTruyenTienHiepContent()
        await CTTH();   // Run ?
    }
    catch (error) {
        console.error('Unable to connect to the database:', error.message);
    };
};
console.log('-----------------------------------------------------------------------');
console.log('');
console.log('');
console.log('');
console.log('');
console.log('');
console.log("[ Server is running ]");
Server();  
