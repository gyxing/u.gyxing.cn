import Vue from 'vue';
import App from './App.vue';

import Promise from 'promise-polyfill';
window.Promise = Promise;

new Vue({
    el: "#app",
    render: h => h(App)
});