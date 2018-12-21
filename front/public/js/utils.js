export default {
    // 操作系统类型
    os: () => {
        let ua = navigator.userAgent,
            isWindowsPhone = /(?:Windows Phone)/.test(ua),
            isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
            isAndroid = /(?:Android)/.test(ua),
            isFireFox = /(?:Firefox)/.test(ua),
            isChrome = /(?:Chrome|CriOS)/.test(ua),
            isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
            isPhone = /(?:iPhone)/.test(ua) && !isTablet,
            isPc = !isPhone && !isAndroid && !isSymbian;
        return {
            isTablet: isTablet,
            isPhone: isPhone,
            isAndroid : isAndroid,
            isPc : isPc
        };
    },
    // 随机字符 去掉了 字母l、O，数字0、1
    randomCode: (count) => {
        let all = "azxcvbnmsdfghjkqwertyuiopZXCVBNMASDFGHJKLQWERTYUIP23456789";
        let b = "";
        for (let i = 0; i < count; i++) {
            let index = Math.floor(Math.random() * 58);
            b += all.charAt(index);
        }
        return b;
    },
    // 随机6位数字
    randomDigitCode: (count=6) => {
        return Math.random().toString().slice(-count)
    },
    // 时间格式化
    dateFormat: function(date, fmt) {
        if(!date) { date = new Date() }
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    isEmptyObject: (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    },
    isIOS() {
        return /ip(hone|od|ad)/i.test(window.navigator.userAgent);
    },
    setDocumentTitle(title) {
        let doc = window.document;
        doc.title = title;
        if (this.isIOS()) {
            let i = doc.createElement('iframe');
            i.src = '/favicon.ico';
            i.style.display = 'none';
            i.onload = function () {
                setTimeout(function () {
                    i.remove();
                    i = null;
                }, 9);
            };
            doc.body.appendChild(i);
        }
    }
}
