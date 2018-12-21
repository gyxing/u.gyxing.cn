const BaseService = require('../base/service-simple');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

/**
 * 工具类接口
 */
const ExampleService = new class extends BaseService {
    constructor() {
        super();
    }
    getCssPreFixer(req, res) {
        let text = req.body.text;
        if (text) {
            let params = {
                browsers: ["last 2 versions"]
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
};

module.exports = ExampleService;
