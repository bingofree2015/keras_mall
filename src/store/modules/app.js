/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
export default {
    state: {
        appName: "KerasMall", // 应用名称
        themeColor: "#131214", // 主题颜色
        themeTintColor: "#131214", // 主题辅助颜色
        oldThemeColor: "#14889A", // 上一次主题颜色
        collapse: false, // 导航栏收缩状态
        menuRouteLoaded: false, // 菜单和路由是否已经加载
        globalVariables: null // 全局变量
    },
    getters: {
        collapse(state) {
            // 对应着上面state
            return state.collapse;
        }
    },
    mutations: {
        onCollapse(state) {
            // 改变收缩状态
            state.collapse = !state.collapse;
        },
        setThemeColor(state, themeColor) {
            // 改变主题颜色
            const _tintColor = (color, tint) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);

                if (tint === 0) {
                    // when primary color is in its rgb space
                    return [red, green, blue].join(",");
                } else {
                    red += Math.round(tint * (255 - red));
                    green += Math.round(tint * (255 - green));
                    blue += Math.round(tint * (255 - blue));

                    red = red.toString(16);
                    green = green.toString(16);
                    blue = blue.toString(16);

                    return `#${red}${green}${blue}`;
                }
            };

            state.oldThemeColor = state.themeColor;
            state.themeColor = themeColor;
            state.themeTintColor = _tintColor(themeColor.replace("#", ""), 0.2);
        },
        menuRouteLoaded(state, menuRouteLoaded) {
            // 改变菜单和路由的加载状态
            state.menuRouteLoaded = menuRouteLoaded;
        },
        setGlobalVariables(state, globalVariables) {
            // 设置环境变量
            state.globalVariables = globalVariables;
        }
    },
    actions: {
        onCollapse({ commit }) {
            commit("onCollapse");
        },
        setThemeColor({ commit }, themeColor) {
            commit("setThemeColor", themeColor);
        },
        menuRouteLoaded({ commit }, menuRouteLoaded) {
            commit("menuRouteLoaded", menuRouteLoaded);
        }
    }
};
