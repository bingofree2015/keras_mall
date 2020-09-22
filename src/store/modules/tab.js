/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
export default {
    state: {
        // 主入口标签页
        mainTabs: [],
        // 当前标签页名
        mainActiveTab: {}
    },
    mutations: {
        updateMainTabs(state, tabs) {
            state.mainTabs = tabs;
        },
        updateMainActiveTab(state, activeTab) {
            state.mainActiveTab = activeTab;
        }
    },
    actions: {
        updateMainTabs({ commit }, tabs) {
            commit("updateMainTabs", tabs);
        },
        updateMainActiveTab({ commit }, activeTab) {
            commit("updateMainActiveTab", activeTab);
        }
    }
};
