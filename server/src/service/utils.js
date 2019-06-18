const BaseService = require('../base/service-simple');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const request = require('request-promise');

/**
 * 工具类接口
 */
const ExampleService = new class extends BaseService {
    constructor() {
        super();
    }
    getCssPreFixer(req, res) {
        let {text, browsers} = req.body;
        if (text) {
            let params = {
                browsers: browsers || ["last 2 versions"]
            };
            postcss([ autoprefixer(params) ]).process(text).then( (result) => {
                result.warnings().forEach( (warn) => {
                    console.warn(warn.toString());
                });
                this.responseSuccess(res, result.css)
            });
        } else {
            this.responseSuccess(res, "")
        }
    }
    proxy(req, res) {
        let {url} = req.body;
        request({
            uri: url,
            strictSSL: false,
            rejectUnauthorized: false
        }).then(ret => {
            this.responseSuccess(res, ret)
        }).catch(err => {
            this.responseError(res, err.message)
        })
    }
};

module.exports = ExampleService;
