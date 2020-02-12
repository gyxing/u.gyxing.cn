const fs = require('fs');
const path = require('path');
const moment = require('moment');

const logsDir = path.join(__dirname, '../../logs');
const infoLog = path.join(logsDir, 'info.log');
const errorLog = path.join(logsDir, 'error.log');

const dateFmt = 'YYYY-MM-DD hh:mm:ss';

const options = {
    flags: 'a',     // append模式
    encoding: 'utf8',  // utf8编码
};
const stdout = fs.createWriteStream(infoLog, options);
const stderr = fs.createWriteStream(errorLog, options);

// 创建logger
const logger = new console.Console(stdout, stderr);

module.exports = {
    log: (text) => {
        logger.log(`【${moment().format(dateFmt)}】 ${JSON.stringify(text)}`)
    },
    error: (text) => {
        logger.log(`【${moment().format(dateFmt)}】 ${JSON.stringify(text)}`)
    }
};
