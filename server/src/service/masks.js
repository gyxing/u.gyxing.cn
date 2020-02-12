const schedule = require('node-schedule');
const request = require('request-promise');
const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');
const BaseService = require('../base/service-simple');
const logger = require('../utils/logger');

const taskTimes = [
    '0-40 0 9 * * *',
    '0-40 0 14 * * *',
    '0-40 0 18 * * *'
];
const tasks = [];
let reserveSuccess = false;

function startTask() {
    taskTimes.forEach(item => {
        let task = schedule.scheduleJob(item, () => {
            if (!reserveSuccess) {
                httpRequest();
            }
        });
        tasks.push(task);
    });
}

function httpRequest() {
    request({
        uri: 'http://wechat.gzjmyy.com:8088/JmFMResrv/main/reser',
        method: 'POST',
        json: true,
        body: {
            "PLACEPOINTID": "10502",
            "USERNAME": "甘****",
            "MOBILE": "15913191260",
            "USERID": "4417**********6659",
            "USERNAMEMD5": "9f17b1d918a76bbb2bc43cc4f5aa2dfd",
            "USERMOBILEMD5": "b9101440127d98239c1361da48b90cf5",
            "USERIDMD5": "ee44f1f07a943062565561b678b982c5"
        },
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Referer': 'http://wechat.gzjmyy.com:8088/',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 MicroMessenger/6.0.0.54_r849063.501 NetType/WIFI',
        }
    }).then(res => {
        logger.log(res)
    }).catch(err => {
        logger.error(err)
    })
}

/**
 * 口罩预约接口
 */
const MasksService = new class extends BaseService {
    constructor() {
        super();
        startTask();
    }
    queryLogs(req, res) {
        const infoLog = path.join(__dirname, '../../logs', 'info.log');
        let lines = [];
        lineReader.eachLine(infoLog, {encoding: 'utf8'}, (line, last) => {
            lines.push(line);
            if (last) {
                this.responseSuccess(res, lines)
            }
        });
    }
};

module.exports = MasksService;
