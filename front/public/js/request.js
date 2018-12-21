import axios from "axios";

// axios 配置

axios.defaults.timeout = 6000;
axios.defaults.transformRequest = [
    data => {
        let str = [];
        for (let i in data) {
            str.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
        }
        return str.join("&");
    }
];

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;