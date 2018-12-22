/**
 * Utils Controller
 */
const express = require('express');
const bodyParser = require('body-parser');
const UtilsService = require('./service/utils');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * css加前缀
 * @api {POST} /utils/cssprefixer css加前缀
 * @apiDescription css加前缀
 * @apiName cssprefixer
 * @apiParam {String} text body，css文本
 * @apiParam {String} browsers body，规则
 * @apiSampleRequest /utils/cssprefixer
 * @apiGroup utils
 * @apiVersion 1.0.0
 */
app.post('/cssprefixer', (req, res) => {
    UtilsService.getCssPreFixer(req, res)
});

module.exports = app;
