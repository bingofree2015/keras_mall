/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.env 调用
 */
import _ from "lodash";
import moment from "moment";
import store from "@/store";
// 后台管理系统服务器地址
const baseUrl = "http://122.51.143.12:8080";
const baseImgUrl = `${baseUrl}/upload`;
const baseAssetsUrl = `${baseUrl}/assets`;
// 系统数据备份还原服务器地址
const backupBaseUrl = "http://122.51.143.12:8080";
const getImgUrl = (url, prefix = baseImgUrl) => {
    /*
    // 判断图片是否存在
    const _checkImgExists = (imgUrl) => {
        const _imgObj = new Image(); // 判断图片是否存在
        _imgObj.src = imgUrl;
        if (_imgObj.fileSize > 0 || (_imgObj.width > 0 && _imgObj.height > 0)) {
            return true;
        } else {
            return false;
        }
    }
    */
    const _checkImgUrl = imgUrl => {
        return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(imgUrl);
    };
    const _checkVideoUrl = imgUrl => {
        return /\.(mp4|ogg|flv|avi|wmv|rmvb|mov)(\?.*)?$/.test(imgUrl);
    };

    let _url = url && url.startsWith("http") ? url : prefix + "/" + url;
    _url =
        _checkImgUrl(_url) || _checkVideoUrl(_url)
            ? _url
            : baseAssetsUrl + "/images/blank.png";
    return _url;
};
const formatDateTime = dateTime => {
    return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
};
const formatBoolean = val => {
    return val ? "是" : "否";
};
const formatState = state => {
    return state ? "启用" : "禁用";
};

// 列内容格式化
const columnFormatter = (value, aliasName, column) => {
    const _mapAlias = store.state.mapAlias;
    let _formatText = "";
    if (_mapAlias && aliasName && !_.isNil(value) && column) {
        _formatText =
            _mapAlias[aliasName] &&
            _mapAlias[aliasName][column] &&
            _mapAlias[aliasName][column][value];
    } else if (_mapAlias && aliasName && !_.isNil(value)) {
        _formatText = _mapAlias[aliasName][value];
    }
    return _formatText;
};

export {
    baseUrl,
    baseImgUrl,
    backupBaseUrl,
    getImgUrl,
    baseAssetsUrl,
    formatDateTime,
    formatBoolean,
    formatState,
    columnFormatter
};
