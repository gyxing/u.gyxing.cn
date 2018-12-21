const path = require('path');
const fs = require('fs');
const BaseServiceSimple = require('../base/service-simple');


/**
 * 文章类接口
 */
const FilesService = new class extends BaseServiceSimple {
    constructor() {
        super();
        this.tb_name = 'files';
    }
    // 获取日志文件内容
    logs(req, res) {
        let logsPath = path.resolve(__dirname, '../../logs');    // 日志文件所在
        let arr = [];
        try{
            let fns = fs.readdirSync(logsPath).reverse();
            for(let item of fns) {
                let url = path.resolve(logsPath, item);
                let stat = fs.statSync(url);
                if(stat.isFile()) {
                    let txt = fs.readFileSync(url, 'utf-8');
                    arr.push({
                        name: item,
                        size: stat.size,
                        createTime: stat.birthtimeMs,
                        lastModifyTime: stat.mtimeMs,
                        content: txt.split('\n')
                    })
                }
            }
            this.responseSuccess(res, arr);
        }catch(e) {
            this.responseError(res, '找不到日志文件', 400);
        }
    }
};

module.exports = FilesService;
