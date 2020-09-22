/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
/**
 * 嵌套页面IFrame模块
 */
import { baseUrl } from "@/env";

/**
 * 嵌套页面URL地址
 * @param {*} url
 */
export function getIFramePath(url) {
    let iframeUrl = "";
    if (/^iframe:.*/.test(url)) {
        iframeUrl = url.replace("iframe:", "");
    } else if (/^http[s]?:\/\/.*/.test(url)) {
        iframeUrl = url.replace("http://", "");
        if (iframeUrl.indexOf(":") !== -1) {
            iframeUrl = iframeUrl.substring(iframeUrl.lastIndexOf(":") + 1);
        }
    }
    return iframeUrl;
}

/**
 * 嵌套页面路由路径
 * @param {*} url
 */
export function getIFrameUrl(url) {
    let iframeUrl = "";
    if (/^iframe:.*/.test(url)) {
        iframeUrl = baseUrl + url.replace("iframe:", "");
    } else if (/^http[s]?:\/\/.*/.test(url)) {
        iframeUrl = url;
    }
    return iframeUrl;
}
