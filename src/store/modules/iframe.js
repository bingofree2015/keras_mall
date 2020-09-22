/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
export default {
    state: {
        iframeUrl: [], // 当前嵌套页面路由路径
        iframeUrls: [] // 所有嵌套页面路由路径访问URL
    },
    getters: {},
    mutations: {
        setIFrameUrl(state, iframeUrl) {
            // 设置iframeUrl
            state.iframeUrl = iframeUrl;
        },
        addIFrameUrl(state, iframeUrl) {
            // iframeUrls
            state.iframeUrls.push(iframeUrl);
        }
    },
    actions: {
        setIFrameUrl({ commit }, iframeUrl) {
            commit("setIFrameUrl", iframeUrl);
        },
        addIFrameUrl({ commit }, iframeUrl) {
            commit("addIFrameUrl", iframeUrl);
        }
    }
};
