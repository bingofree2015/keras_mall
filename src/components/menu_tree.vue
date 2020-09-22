<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <el-submenu :index="'' + menu.id" class="submenu" v-if="menu.children && menu.children.length >= 1">
        <template slot="title">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
        </template>
        <menu-tree :key="item.id" :menu="item" v-for="item in menu.children"></menu-tree>
    </el-submenu>
    <el-menu-item :index="'' + menu.id" @click="handleRoute(menu)" class="menuitem" v-else>
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
    </el-menu-item>
</template>

<script>
import { mapState } from 'vuex'
import { getIFramePath } from '@/utils/iframe'
export default {
    components: {},
    name: 'MenuTree',
    props: {
        menu: {
            type: Object,
            required: true
        }
    },
    mounted () {
        console.log(this.menu)
    },
    computed: {
        ...mapState({
            themeColor: state => state.app.themeColor
        })
    },
    methods: {
        handleRoute (menu) {
            // 如果是嵌套页面，转换成iframe的path
            console.log(`url: ${menu.url}`)
            let path = getIFramePath(menu.url)
            if (!path) {
                path = menu.url
            }
            console.log(`path: ${path}`)
            // 通过菜单URL跳转至指定路由
            this.$router.push('/' + path)
        }
    }
}
</script>

<style scoped lang="scss">
.submenu /deep/ .el-submenu__title {
    height: 42px;
    line-height: 42px;
}

.menuitem {
    font-size: 13px;
    height: 32px;
    line-height: 32px;
}
</style>
