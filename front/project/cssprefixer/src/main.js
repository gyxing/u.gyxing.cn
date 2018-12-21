import Vue from 'vue';
import App from './App.vue';
import '@PUBLIC/less/reset.less';

import Promise from 'promise-polyfill';
window.Promise = Promise;

new Vue({
    el: "#app",
    render: h => h(App)
});