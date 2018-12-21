//模版对应文件的内容
module.exports = {
    addConfigJS(project_name) {
        return (
`const path = require("path");

module.exports = function(env, options) {
    return {
        entry: {
            index: path.resolve(__dirname, "./src/main.js")
        },
        html_name: "",
        template: "",
        product_dir: path.resolve(__dirname,"../../../dist/${project_name}"),
        product_html_dir: path.resolve(__dirname,"../../../dist/${project_name}"),
        product_public_path: "",
        plugins: []
    };
};`
        )
    },
    addMainJS() {
        return (
`import Vue from 'vue';
import App from './App.vue';

import Promise from 'promise-polyfill';
window.Promise = Promise;

new Vue({
    el: "#app",
    render: h => h(App)
});`
        )
    },
    addAppVue() {
        return (
`<template>
    <div>Hello World</div>
</template>

<script>
export default {
	name: "App"
}
</script>

<style lang="less" scoped>
</style>`
        )
    }
};
