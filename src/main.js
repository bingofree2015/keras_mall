/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
import Vue from "vue";
import app from "./app";
import router from "./router";
import vueApi from "./api/vue_api";
import i18n from "./i18n";
import store from "./store";
import * as env from "@/env";
import elementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入vue-amap
import AMap from "vue-amap";
Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
    // 高德的key
    key: "9a592976bd79ff285350f616bfe43c8f",
    // 插件集合 （插件按需引入）
    plugin: [
        "AMap.Geolocation",
        "AMap.Autocomplete",
        "AMap.PlaceSearch",
        "AMap.Scale",
        "AMap.OverView",
        "AMap.ToolBar",
        "AMap.MapType",
        "AMap.PolyEditor",
        "AMap.CircleEditor",
        "AMap.Geocoder"
    ]
});

Vue.use(elementUI);
Vue.use(vueApi);

Vue.prototype.env = env;

// eslint-disable-next-line no-unused-vars
const vm = new Vue({
    el: "#app",
    i18n,
    router,
    store,
    render: h => h(app)
});
