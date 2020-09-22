/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
import Vue from "vue";
import VueI18n from "vue-i18n";
import locale from "element-ui/lib/locale";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";

Vue.use(VueI18n);

// 注册i18n实例并引入语言文件，文件格式等下解析
const i18n = new VueI18n({
    locale: "zh_cn",
    messages: {
        zh_cn: Object.assign(
            require("@/assets/languages/zh_cn.json"),
            zhLocale
        ),
        en_us: Object.assign(require("@/assets/languages/en_us.json"), enLocale)
    }
});

locale.i18n((key, value) => i18n.t(key, value)); // 为了实现element插件的多语言切换

export default i18n;
