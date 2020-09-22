<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'App',
    components: {},
    computed: {
        ...mapState({
            loginUser: state => state.loginUser,
            themeColor: state => state.app.themeColor,
            collapse: state => state.app.collapse
        })
    },
    methods: {
        ...mapMutations(['setGlobalVariables']),

        async getGlobalVariables () {
            const _result = await this.$api.setting.get({ key: 'global_variables' })
            if (_result.succeed === 1 && _result.code === 200) {
                this.setGlobalVariables(_result.data)
            }
        }
    },
    mounted () {
        this.getGlobalVariables()
    },
    created () {
        // 在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('store')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
        }
        // 在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state))
        })
    }
}
</script>

<style lang="scss">
.page-container {
    margin: 8px;
    .top-bar {
        text-align: right;
    }
}

.dialog-container {
    .el-form-item {
        margin-bottom: 0px;
        padding: 3px;
        border-bottom: 1px dashed #e4e7ed;
        border-left: 1px dashed #e4e7ed;
        .el-form-item__label {
            font-weight: 450;
            font-size: 13px;
        }
    }
    .footer {
        text-align: right;
        margin: 10px 0px;
    }
}

.edit-dialog-container {
    .el-form-item__label {
        font-weight: 450;
        font-size: 13px;
    }
    .footer {
        text-align: right;
        margin: 10px 0px;
    }
}
.search-prepend {
    min-width: 100px;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #484a4d;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
}
[class^='el-icon-ali'],
[class*='el-icon-ali'] {
    font-family: 'ali-icons' !important;
}
</style>
