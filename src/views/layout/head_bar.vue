<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-27 11:13:12
-->
<template>
    <div :class="collapse?'position-collapse-left':'position-left'" :style="{'background':themeColor}" class="headbar">
        <!-- 导航收缩 -->
        <span class="hamburg">
            <el-menu :background-color="themeColor" active-text-color="#ffd04b" class="el-menu-demo" mode="horizontal"
                text-color="#fff">
                <el-menu-item @click="onCollapse" index="1">
                    <hamburger :isActive="collapse"></hamburger>
                </el-menu-item>
            </el-menu>
        </span>
        <!-- 导航菜单 -->
        <span class="navbar">
            <el-menu :background-color="themeColor" :default-active="activeIndex" @select="selectNavBar()"
                active-text-color="#ffd04b" class="el-menu-demo" mode="horizontal" text-color="#fff">
                <el-menu-item @click="$router.push('/')" index="1">
                    <i class="el-icon-ali-kongzhimianban"></i>
                </el-menu-item>
            </el-menu>
        </span>
        <!-- 工具栏 -->
        <span class="toolbar">
            <el-menu :background-color="themeColor" active-text-color="#ffd04b" class="el-menu-demo" mode="horizontal"
                text-color="#fff">
                <el-menu-item index="1">
                    <!-- 主题切换 -->
                    <theme-picker :default="themeColor" @onThemeChange="onThemeChange" class="theme-picker">
                    </theme-picker>
                </el-menu-item>
                <el-menu-item index="2" v-popover:popover-lang>
                    <!-- 语言切换 -->
                    <i class="el-icon-ali-shangjiafuwu_duoyuyanyunfanyi" style="font-size: 32px"></i>
                    <el-popover placement="bottom-start" ref="popover-lang" trigger="click" v-model="langVisible">
                        <div @click="changeLanguage('zh_cn')" class="lang-item">简体中文</div>
                        <div @click="changeLanguage('en_us')" class="lang-item">English</div>
                    </el-popover>
                </el-menu-item>
                <el-menu-item index="3" style="padding-right:8px" v-popover:popover-personal>
                    <!-- 用户信息 -->
                    <span class="user-info">
                        <img :src="this.env.getImgUrl(loginUser.attachment.path)" v-if="loginUser.attachment" />
                        {{loginUser.username}}
                    </span>
                    <el-popover :visible-arrow="false" placement="bottom-end" ref="popover-personal" trigger="click">
                        <personal-panel></personal-panel>
                    </el-popover>
                </el-menu-item>
            </el-menu>
        </span>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import hamburger from '@/components/hamburger'
import themePicker from '@/components/theme_picker'
import personalPanel from '@/components/personal_panel'
export default {
    components: {
        hamburger,
        themePicker,
        personalPanel
    },
    data () {
        return {
            activeIndex: '1',
            langVisible: false
        }
    },
    methods: {
        openWindow (url) {
            window.open(url)
        },
        selectNavBar (key, keyPath) {
            console.log(key, keyPath)
        },
        // 折叠导航栏
        onCollapse: function () {
            this.$store.commit('onCollapse')
        },
        // 切换主题
        onThemeChange: function (themeColor) {
            this.$store.commit('setThemeColor', themeColor)
        },
        // 语言切换
        changeLanguage (lang) {
            const _lang = lang === '' ? 'zh_cn' : lang
            this.$i18n.locale = _lang
            this.langVisible = false
        }
    },
    mounted () { },
    computed: {
        ...mapState({
            loginUser: state => state.loginUser,
            themeColor: state => state.app.themeColor,
            collapse: state => state.app.collapse
        })
    }
}
</script>

<style scoped lang="scss">
.headbar {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1030;
    height: 60px;
    line-height: 60px;
    border-color: rgba(180, 190, 190, 0.8);
    border-left-width: 1px;
    border-left-style: solid;
}
.hamburg,
.navbar {
    float: left;
}
.toolbar {
    float: right;
}
.lang-item {
    font-size: 12px;
    padding-left: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: pointer;
}
.lang-item:hover {
    font-size: 14px;
    background: #b0d6ce4d;
}
.user-info {
    font-size: 18px;
    color: #fff;
    cursor: pointer;
    img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin: 10px 0px 10px 10px;
        float: right;
    }
}
.badge {
    line-height: 18px;
}
.position-left {
    left: 200px;
}
.position-collapse-left {
    left: 65px;
}
</style>
