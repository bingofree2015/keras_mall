<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <div class="container">
        <!-- 导航菜单栏 -->
        <nav-bar></nav-bar>
        <!-- 头部区域 -->
        <head-bar></head-bar>
        <!-- 主内容区域 -->
        <main-content></main-content>
    </div>
</template>

<script>
import headBar from './layout/head_bar'
import navBar from './layout/nav_bar'
import mainContent from './layout/main_content'
export default {
    components: {
        headBar,
        navBar,
        mainContent
    }
}
</script>

<style scoped lang="scss">
.container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}
</style>
