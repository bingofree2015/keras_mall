/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
import Vue from "vue";
import vuex from "vuex";

import app from "./modules/app";
import tab from "./modules/tab";
import iframe from "./modules/iframe";
import menu from "./modules/menu";

Vue.use(vuex);

const state = {
    loginUser: {
        perms: [] // 用户权限标识集合
    },
    mapAlias: {}
};

const getters = {};

const mutations = {
    setPerms(state, perms) {
        // 用户权限标识集合
        state.loginUser.perms = perms;
    },
    setLoginUser(state, loginUser) {
        state.loginUser = loginUser;
    },
    setMapAlias(state, mapAlias) {
        state.mapAlias = mapAlias;
    }
};

const actions = {
    setPerms({ commit }, perms) {
        commit("setPerms", perms);
    },
    setLoginUser({ commit }, loginUser) {
        commit("setLoginUser", loginUser);
    },
    setMapAlias({ commit }, mapAlias) {
        commit("setMapAlias", mapAlias);
    }
};

const store = new vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: { app, tab, iframe, menu }
});

export default store;
