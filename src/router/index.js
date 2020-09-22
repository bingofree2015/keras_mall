/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
import Vue from "vue";
import Router from "vue-router";
import login from "@/views/login";
import notFound from "@/views/404";
import home from "@/views/home";
import dashboard from "@/views/dashboard";
import api from "@/api";
import store from "@/store";
import { getIFramePath, getIFrameUrl } from "@/utils/iframe";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "首页",
            component: home,
            children: [
                {
                    path: "",
                    name: "控制面板",
                    component: dashboard,
                    meta: {
                        icon: "el-icon-ali-kongzhimianban",
                        index: 0
                    }
                }
            ]
        },
        {
            path: "/login",
            name: "登录",
            component: login
        },
        {
            path: "/404",
            name: "notFound",
            component: notFound
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    // 登录界面登录成功之后，会把用户信息保存在会话
    // 存在时间为会话生命周期，页面关闭即失效
    let loginUser = sessionStorage.getItem("loginUser");
    loginUser = loginUser ? JSON.parse(loginUser) : loginUser;

    if (loginUser && loginUser.id && !store.state.loginUser) {
        store.commit("setLoginUser", loginUser);
    }

    if (to.path === "/login") {
        // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
        if (loginUser && loginUser.id) {
            next({ path: "/" });
        } else {
            next();
        }
    } else {
        if (loginUser && loginUser.id) {
            // 加载动态菜单和路由
            await addDynamicMenuAndRoutes(loginUser.id, to, from);
            next();
        } else {
            // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
            next({ path: "/login" });
        }
    }
});

/**
 * 加载动态菜单和路由
 */
async function addDynamicMenuAndRoutes(sysUserId, to, from) {
    // 处理IFrame嵌套页面
    handleIFrameUrl(to.path);
    if (!store.state.app.menuRouteLoaded) {
        try {
            let _result = await api.menu.getRouteTree({ sysUserId });
            if (_result.succeed === 1 && _result.code === 200) {
                const _routeMenu = _result.data.list;
                // 添加动态路由
                const _dynamicRoutes = addDynamicRoutes(_routeMenu);
                // 处理静态组件绑定路由
                mergeStaticComponent(router, _dynamicRoutes);
                router.addRoutes(router.options.routes);
                // 保存加载状态
                store.commit("menuRouteLoaded", true);
                // 保存菜单树
                _result = await api.menu.getNavTree({ sysUserId });
                if (_result.succeed === 1 && _result.code === 200) {
                    store.commit("setNavTree", _result.data.list);
                }
                // 保存用户权限标识集合
                _result = await api.sysUser.getPermits({ sysUserId });
                if (_result.succeed === 1 && _result.code === 200) {
                    store.commit("setPerms", _result.data);
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    } else {
        console.log("动态菜单和路由已经存在.");
    }
}

/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function mergeStaticComponent(router, dynamicRoutes) {
    for (let j = 0; j < dynamicRoutes.length; j++) {
        if (dynamicRoutes[j].name === "代码生成") {
            // dynamicRoutes[j].component = Generator
            break;
        }
    }
    router.options.routes[0].children = router.options.routes[0].children.concat(
        dynamicRoutes
    );
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
    // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
    let url = path;
    const length = store.state.iframe.iframeUrls.length;
    for (let i = 0; i < length; i++) {
        const iframe = store.state.iframe.iframeUrls[i];
        if (path !== null && path.endsWith(iframe.path)) {
            url = iframe.url;
            store.commit("setIFrameUrl", url);
            break;
        }
    }
}

/**
 * 添加动态(菜单)路由
 * @param {*} menus 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes(menus) {
    const _routers = [];
    const menu2Router = (menu, nav = [], routers = []) => {
        nav[menu.level - 1] = {
            path: menu.url ? "/" + menu.url : "",
            name: menu.name
        };
        nav = nav.slice(0, menu.level);
        const _nav = [...nav];
        const _router = {
            path: menu.url ? menu.url : "/",
            name: menu.name,
            component: null,
            meta: {
                icon: menu.icon,
                index: menu.id,
                nav: _nav
            }
        };

        const _path = getIFramePath(menu.url);
        if (_path) {
            _router.path = _path;
            _router.component = resolve =>
                require(["@/views/layout/iframe"], resolve);
            const _url = getIFrameUrl(menu.url);
            const _iFrameUrl = { path: _path, url: _url };
            store.commit("addIFrameUrl", _iFrameUrl);
        } else {
            if (menu.url) {
                _router.component = resolve =>
                    require([`@/views/${menu.url}`], resolve);
            }
        }

        if (menu.children && menu.children.length > 0) {
            for (const _subMenu of menu.children) {
                menu2Router(_subMenu, nav, routers);
            }
        }
        routers.push(_router);
    };

    for (const _menu of menus) {
        menu2Router(_menu, [], _routers);
    }
    return _routers;
}

export default router;
