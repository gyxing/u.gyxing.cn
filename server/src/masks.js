const express = require('express');
const bodyParser = require('body-parser');
const service = require('./service/masks');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * 开始任务
 * @api {GET} /masks/start 开始轮询任务
 * @apiDescription 开始轮询任务
 * @apiName start
 * @apiSampleRequest /masks/start
 * @apiGroup masks
 * @apiVersion 1.0.0
 */
app.get('/logs', (req, res) => {
    service.queryLogs(req, res)
});

module.exports = app;
