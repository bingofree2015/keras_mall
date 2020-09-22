<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <el-form :model="loginForm" :rules="fieldRules" class="demo-ruleForm login-container" label-position="left"
        label-width="0px" ref="loginForm">
        <span class="tool-bar">
            <!-- 主题切换 -->
            <theme-picker :default="themeColor" @onThemeChange="onThemeChange" class="theme-picker"
                style="float:right;"></theme-picker>
        </span>
        <h2 class="title" style="padding-left:22px;">系统登录</h2>
        <el-form-item prop="username">
            <el-input auto-complete="off" placeholder="账号" type="text" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input auto-complete="off" placeholder="密码" show-password type="password" v-model="loginForm.pwd">
            </el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button @click.native.prevent="reset" round style="width:48%;" type="primary">重 置</el-button>
            <el-button :loading="loading" @click.native.prevent="login" round style="width:48%;" type="primary">登 录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import themePicker from '@/components/theme_picker'
export default {
    name: 'Login',
    components: {
        themePicker
    },
    data () {
        return {
            loading: false,
            loginForm: {
                username: 'admin',
                pwd: '111111'
            },
            fieldRules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            checked: true
        }
    },
    methods: {
        ...mapActions(['setLoginUser', 'menuRouteLoaded', 'setThemeColor']),
        async login () {
            try {
                this.loading = true
                const _loginUser = {
                    username: this.loginForm.username,
                    pwd: this.loginForm.pwd
                }
                const _result = await this.$api.sysUser.login(_loginUser)
                if (_result.succeed === 1 && _result.code === 200) {
                    Cookies.set('token', _result.data.token) // 放置token到Cookie
                    Object.assign(_loginUser, _result.data)
                    sessionStorage.setItem(
                        'loginUser',
                        JSON.stringify(_loginUser)
                    ) // 保存用户到本地会话
                    this.$store.commit('setLoginUser', _loginUser)

                    const _mapAlias = await this.$api.mapAlias()
                    this.$store.commit('setMapAlias', _mapAlias)
                    //Vue.prototype.mapAlias = _mapAlias

                    this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                    this.$router.push('/') // 登录成功，跳转到主页
                } else {
                    this.$notify({
                        title: '失败',
                        message: _result.description,
                        type: 'error'
                    })
                }
                this.loading = false
            } catch (err) {
                this.$notify({
                    title: '失败',
                    message: err.message,
                    type: 'error'
                })
                this.loading = false
            }
        },
        refreshCaptcha: function () {
            this.loginForm.src =
                this.env.baseUrl + '/captcha.jpg?t=' + new Date().getTime()
        },
        reset () {
            this.$refs.loginForm.resetFields()
        },
        // 切换主题
        onThemeChange: function (themeColor) {
            this.$store.commit('setThemeColor', themeColor)
        }
    },
    mounted () {
        this.refreshCaptcha()
    },
    computed: {
        ...mapState({
            themeColor: state => state.app.themeColor
        })
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
}
</style>
