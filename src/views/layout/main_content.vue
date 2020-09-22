<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-27 11:13:25
-->
<template>
    <div :class="$store.state.app.collapse?'position-collapse-left':'position-left'" class="main-container"
        id="main-container">
        <!-- 标签页 -->
        <div class="tab-container">
            <el-tabs :class="$store.state.app.collapse?'position-collapse-left':'position-left'" @tab-click="clickTab"
                @tab-remove="removeTab" class="tabs" type="card" v-model="mainActiveTab.name">
                <el-dropdown :show-timeout="0" :size="miniSize" class="tabs-tools">
                    <i class="el-icon-arrow-down"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="closeCurrentTab" icon="el-icon-ali-dangqianweizhi2">关闭当前
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="closeOtherTabs" icon="el-icon-ali-qita2">关闭其它
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="closeAllTabs" icon="el-icon-ali-quanbu1">全部关闭
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="refreshCurrentTab" divided icon="el-icon-ali-shuaxin1">刷新当前
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-tab-pane :closable="item.closable" :key="item.name" :label="item.name" :name="item.name"
                    :style="{'background':themeColor}" v-for="item in mainTabs">
                    <span slot="label">
                        <i :class="item.icon"></i>
                        {{item.name}}
                    </span>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 主内容区域 -->
        <div class="main-content">
            <keep-alive>
                <transition mode="out-in" name="fade">
                    <router-view v-if="isRouterAlive" />
                </transition>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    provide () {
        return {
            reload: this.reload
        }
    },
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',
            isRouterAlive: true
        }
    },
    computed: {
        ...mapState({
            themeColor: state => state.app.themeColor
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
    methods: {
        reload () {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        },
        // tabs, 选中tab
        clickTab (tab) {
            tab = this.mainTabs.find(item => item.name === tab.name)
            if (tab) {
                this.$router.push({ name: tab.name, query: tab.query })
            }
        },
        // tabs, 删除tab
        removeTab (tabName) {
            this.mainTabs = this.mainTabs.filter(item => item.name !== tabName || item.closable === false)
            let _tabsLength = this.mainTabs.length
            if (_tabsLength >= 1) {
                // 当前选中tab被删除
                if (tabName === this.mainActiveTab.name) {
                    this.$router.push({ name: this.mainTabs[_tabsLength - 1].name }, () => {
                        this.mainActiveTab = this.$route
                    })
                }
            } else {
                this.$router.push('/')
            }
        },
        // tabs, 关闭当前
        closeCurrentTab () {
            if (this.mainActiveTab.closable) {
                this.removeTab(this.mainActiveTab.name)
            }
        },
        // tabs, 关闭其它
        closeOtherTabs () {
            this.mainTabs = this.mainTabs.filter(item => item.name === this.mainActiveTab.name || item.closable === false)
        },
        // tabs, 关闭全部
        closeAllTabs () {
            this.mainTabs = this.mainTabs.filter(item => item.closable === false)
            //this.$router.push('/')
        },
        // tabs, 刷新当前
        refreshCurrentTab () {
            this.reload()
        }
    }
}
</script>

<style scoped lang="scss">
.el-icon-arrow-down {
    font-size: 15px;
    width: 40px;
    text-align: center;
}

.tabs /deep/ .el-tabs__item {
    //background: #ccc;
    //width: 130px;
    border-radius: 4px 4px 0 0;
}

.main-container {
    padding: 0 5px 5px;
    position: absolute;
    top: 60px;
    left: 1px;
    right: 1px;
    bottom: 0px;
    .tabs {
        position: fixed;
        top: 60px;
        right: 39px;
    }
    .tabs-tools {
        position: fixed;
        top: 60px;
        right: 0;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        border-color: rgba(200, 206, 206, 0.5);
        border-left-width: 1px;
        border-left-style: solid;
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }
    .tabs-tools:hover {
        background: rgba(200, 206, 206, 1);
    }
    .main-content {
        position: absolute;
        top: 45px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        padding: 5px;
        overflow-y: scroll;
    }
}
.position-left {
    left: 200px;
}
.position-collapse-left {
    left: 65px;
}
//消失时间持续0.5s
.fade-enter-active {
    transition: all 0.5s;
}
//显示时间持续0.25s
.fade-leave-active {
    transition: all 0.25s;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
