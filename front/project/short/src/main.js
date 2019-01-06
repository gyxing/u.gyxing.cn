import Vue from 'vue';
import App from './App.vue';

import Promise from 'promise-polyfill';
window.Promise = Promise;

require('promise.prototype.finally').shim();

new Vue({
    el: "#app",
    render: h => h(App)
});
