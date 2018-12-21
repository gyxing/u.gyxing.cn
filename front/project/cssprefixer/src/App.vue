<template>
    <div class="main">
        <div class="title">CSS添加浏览器前缀</div>
        <div class="box">
            <textarea class="txt" v-model="text"></textarea>
            <span class="btn" @click="onTransfer()">转换 &gt;&gt;</span>
            <textarea class="txt" v-model="result"></textarea>
        </div>
    </div>
</template>

<script>
    import request from '../../../public/js/request';
    export default {
        name: "App",
        data() {
            return {
                text: '',
                result: ''
            }
        },
        created() {
            document.title = 'CSS添加浏览器前缀';
        },
        methods: {
            onTransfer() {
                let host_url = process.env.NODE_ENV === 'production'? '' : 'http://localhost:8200';
                let url = host_url + '/rest/utils/cssprefixer';
                request(url, {
                    method: 'post',
                    data: {text: this.text}
                }).then( ret => {
                    if (ret.code === 0) {
                        let data = ret.data;
                        data = data.replace(/\n/g, '').replace(/ /g, '').replace(/;/g, ';\n').replace(/:/g, ': ');
                        this.result = data;
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .main {
        width: 800px;
        margin: 30px auto 0;
        font-size: 14px;
        .title {
            font-size: 18px;
            padding: 15px 0;
        }
        .box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .btn {
                flex-shrink: 0;
                width: 65px;
                text-align: center;
                padding: 8px 0;
                margin: 0 8px;
                border: solid 1px #999;
                border-radius: 4px;
                cursor: pointer;
                &:active {
                    background-color: #e6fffc;
                }
            }
            .txt {
                flex: 1;
                height: 400px;
                font-size: 14px;
                padding: 8px;
                box-sizing: border-box;
            }
        }
    }
</style>
