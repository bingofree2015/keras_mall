<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-27 11:13:21
-->
<template>
    <div class="menu-bar-container">
        <!-- logo -->
        <div :class="collapse?'menu-bar-collapse-width':'menu-bar-width'" :style="{'background-color':themeColor}"
            @click="$router.push('/')" class="logo">
            <img src="@/assets/image/logo.png" v-if="collapse" />
            <div v-else>{{appName}}</div>
        </div>
        <!-- 导航菜单 -->
        <el-menu :background-color="themeTintColor" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
            :collapse="collapse" :collapse-transition="false" :unique-opened="true" @close="closeMenu" @open="openMenu"
            @select="selectMenu" active-text-color="#ffd04b" default-active="1" ref="navMenu" text-color="#fff">
            <!-- 导航菜单树组件，动态加载菜单 -->
            <menu-tree :key="item.id" :menu="item" v-for="item in navTree"></menu-tree>
        </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import menuTree from '@/components/menu_tree'
export default {
    components: {
        menuTree
    },
    computed: {
        ...mapState({
            appName: state => state.app.appName,
            themeColor: state => state.app.themeColor,
            themeTintColor: state => state.app.themeTintColor,
            collapse: state => state.app.collapse,
            navTree: state => state.menu.navTree
        }),
        mainTabs: {
            get () { return this.$store.state.tab.mainTabs },
            set (val) { this.$store.commit('updateMainTabs', val) }
        },
        mainActiveTab: {
            get () { return this.$store.state.tab.mainActiveTab },
            set (val) { this.$store.commit('updateMainActiveTab', val) }
        }
    },
    watch: {
        $route: 'openTab'
    },
    mounted () {
        this.openTab(this.$route)
    },
    methods: {
        openMenu () {
            console.log('openMenu')
        },
        closeMenu () {
            console.log('closeMenu')
        },
        selectMenu (a, b) {
            console.log('selectMenu')
        },
        // 路由操作处理
        openTab (route) {
            // tab标签页选中, 如果不存在则先添加
            let _activeTab = this.mainTabs.find(item => item.name === route.name)
            if (!_activeTab) {
                _activeTab = {
                    name: route.name,
                    path: route.path,
                    icon: route.meta.icon,
                    closable: (route.name !== '控制面板'),
                    query: route.query
                }
                this.mainTabs = this.mainTabs.concat(_activeTab)
            }
            this.mainActiveTab = _activeTab
            // 切换标签页时同步更新高亮菜单
            if (this.$refs.navMenu !== null) {
                this.$refs.navMenu.activeIndex = '' + route.meta.index
                this.$refs.navMenu.initOpenedMenu()
            }
        }
    }
}
</script>

<style scoped lang="scss">
.menu-bar-container {
    position: fixed;
    top: 0px;
    left: 0;
    bottom: 0;
    z-index: 1020;
    .el-menu {
        position: absolute;
        top: 60px;
        bottom: 0px;
        text-align: left;
        overflow-y: auto;
        overflow-x: hidden;

        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        overflow: -moz-scrollbars-none;
        overflow: -moz-scrollbars-none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .logo {
        position: absolute;
        top: 0px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        img {
            width: 40px;
            height: 40px;
            border-radius: 0px;
            margin: 10px 10px 10px 10px;
            float: left;
        }
        div {
            font-size: 25px;
            color: white;
            text-align: left;
            padding-left: 20px;
        }
    }
    .menu-bar-width {
        width: 200px;
    }
    .menu-bar-collapse-width {
        width: 65px;
    }
}
</style>
