/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
export default {
    state: {
        navTree: [] // 导航菜单树
    },
    getters: {},
    mutations: {
        setNavTree(state, navTree) {
            // 设置导航菜单树
            state.navTree = navTree;
        }
    },
    actions: {
        setNavTree({ commit }, navTree) {
            commit("setNavTree", navTree);
        }
    }
};
