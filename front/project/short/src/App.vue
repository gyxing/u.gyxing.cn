<template>
    <div class="main">
        <div class="title"><h2>网址短链接</h2></div>
        <div class="input-box">
            <textarea class="txt" v-model="webUrl" placeholder="在此输入网址"></textarea>
        </div>
        <div class="filter-box">
            <span class="label">提供商：</span>
            <ul class="list">
                <li v-for="(item,index) in typeList" :key="index" :class="{active:type===item.label}" @click="type=item.label">{{item.value}}</li>
            </ul>
            <div class="btn" :class="{disabled:loading}" @click="queryApi()">立即转换</div>
        </div>
        <div class="result-box" v-if="result">
            <div class="label">转换结果：</div>
            <div class="row">原网址：{{result.url}}</div>
            <div class="row">
                <span>短链接：</span>
                <a :href="result.short" target="_blank" v-if="result && result.short!=='error'">{{result.short}}</a>
                <span class="error" v-else-if="result && result.short==='error'">（缺失）</span>
            </div>
        </div>
        <div class="history-box">
            <div>
                <span class="btn" @click="onHistory()">本地历史记录<i>{{expand?'&and;':'&or;'}}</i></span>
                <span class="clear" @click="clearHistory()" v-if="expand && historyList.length > 0">清空历史记录</span>
            </div>
            <div class="content" v-if="expand">
                <div v-if="historyList.length > 0" class="list">
                    <div class="item" v-for="(item,index) in historyList" :key="index">
                        <p>原网址：{{item.url}}</p>
                        <p>短链接：{{item.short}}</p>
                        <p class="gray" v-if="item.time">生成时间：{{item.time | fmt_time}}</p>
                    </div>
                </div>
                <div v-else class="nodata">暂无记录</div>
            </div>
        </div>
    </div>
</template>

<script>
    import request from '../../../public/js/request';
    import utils from '../../../public/js/utils';

    export default {
        data() {
            return {
                webUrl: '',
                type: '',
                typeList: [
                    {label: 'sina', value: 't.cn'},
                    {label: 'urlcn', value: 'url.cn'},
                    {label: 'mrwso', value: 'mrw.so'},
                    {label: 'suoim', value: 'suo.im'},
                    {label: 'u6gg', value: 'u6.gg'},
                    {label: 'rrdme', value: 'rrd.me'},
                    {label: 'c7gg', value: 'c7.gg'}
                ],
                result: null,
                loading: false,
                expand: false,
                historyList: []
            }
        },
        created() {
            document.title = "网址短链接";
            this.type = this.typeList[0].label;
        },
        methods: {
            onType(item) {
                this.type = item.label
            },
            queryApi() {
                if (this.webUrl && !this.loading) {
                    this.loading = true;
                    let url = `http://tools.aeink.com/tools/dwz/urldwz.php?longurl=${encodeURIComponent(this.webUrl)}&api=${this.type}`;
                    request(url).then( ret => {
                        if (ret.ae_url) {
                            let short = ret.ae_url;
                            this.result = {url: this.webUrl, short};
                            // 写入本地记录
                            let record = JSON.parse(localStorage.getItem('_short_url_records')) || [];
                            let item = record.find( d => d.short === short && d.url === this.webUrl );
                            if (!item) {
                                record.unshift({
                                    ...this.result,
                                    time: new Date().getTime()
                                });
                                localStorage.setItem('_short_url_records', JSON.stringify(record));
                                this.queryHistory();
                            }
                        } else {
                            this.result = 'error';
                        }
                    }).finally( () => {
                        this.loading = false;
                    })
                }
            },
            onHistory() {
                if (!this.expand) {
                    this.queryHistory()
                }
                this.expand = !this.expand;
            },
            clearHistory() {
                localStorage.removeItem('_short_url_records');
                this.historyList = [];
            },
            queryHistory() {
                this.historyList = JSON.parse(localStorage.getItem('_short_url_records')) || [];
            }
        },
        filters: {
            fmt_time(val) {
                return utils.dateFormat(new Date(val), 'yyyy-MM-dd hh:mm:ss')
            }
        }
    }
</script>

<style lang="less" scoped>
    .main {
        font-size: 14px;
        width: 675px;
        margin: 50px auto 0;
        padding: 8px;
    }
    .title {
        margin-bottom: 25px;
    }
    .input-box {
        .txt {
            width: 100%;
            height: 80px;
            box-sizing: border-box;
            padding: 8px;
            font-size: 16px;
            border: solid 1px #07f;
        }
    }
    .filter-box {
        display: flex;
        align-items: center;
        margin: 8px 0;
        .label {
            width: 60px;
        }
        .list {
            flex: 1;
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            & > li {
                cursor: pointer;
                padding: 3px 8px;
                border-radius: 4px;
                border: solid 1px #fff;
                margin: 0 9px 0 0;
                &.active {
                    border: solid 1px #fbcbcb;
                    color: #f00;
                }
                &:hover {
                    color: #f00;
                }
            }
        }
        .btn {
            width: 100px;
            background-color: #07f;
            color: #fff;
            text-align: center;
            padding: 8px 0;
            border-radius: 6px;
            cursor: pointer;
            &:not(.disabled):active {
                background-color: #0060d7;
            }
            &.disabled {
                background-color: #949494;
            }
        }
    }
    .result-box {
        margin: 30px 0 50px;
        .label {
            font-size: 16px;
            margin: 8px 0;
            font-weight: bold;
        }
        .row {
            margin: 15px 0;
            word-wrap: break-word;
            a {
                color: #07f;
                text-decoration: none;
                border-bottom: solid 1px #07f;
                padding: 0 0 3px 0;
            }
        }
    }
    .history-box {
        margin-top: 25px;
        .btn {
            display: inline-block;
            border: solid 1px #bbb;
            border-radius: 6px;
            padding: 6px 10px;
            cursor: pointer;
            user-select: none;
            &:hover {
                background-color: #f1f1f1;
            }
            i {
                font-style: normal;
                margin-left: 5px;
            }
        }
        .clear {
            color: #f00;
            margin-left: 15px;
            font-size: 12px;
            display: inline-block;
            border-bottom: solid 1px #f58282;
            padding: 0 3px 3px 2px;
            cursor: pointer;
            &:hover {
                color: #a50000;
                border-bottom: solid 1px #b95d5d;
            }
        }
        .content {
            border: solid 1px #ddd;
            p {
                margin: 4px 0;
                word-wrap: break-word;
            }
            .list {
                .item {
                    border-top: solid 1px #eee;
                    padding: 4px 15px;
                    &:first-child {
                        border-top: none;
                    }
                }
                .gray {
                    font-size: 12px;
                    color: #777;
                }
            }
        }
        .nodata {
            padding: 25px 15px;
            color: #999;
        }
    }
</style>
