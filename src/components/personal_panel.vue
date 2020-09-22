<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <div class="personal-panel">
        <div :style="{'background':themeColor}" class="personal-desc">
            <div class="avatar-container">
                <img :src="this.env.getImgUrl(loginUser.attachment.path)" class="avatar" v-if="loginUser.attachment" />
            </div>
            <div class="name-role">
                <span class="sender">{{ loginUser.username }} -
                    {{ loginUser.roles?loginUser.roles.map((v)=>v.remark).toString():'' }}</span>
            </div>
        </div>
        <div class="main-operation">
            <span class="main-operation-item">
                <el-button @click="showEditUserInfoDialog" icon="el-icon-ali-ziyuan" round size="small">个人中心</el-button>
            </span>
            <span class="main-operation-item">
                <el-button @click="showResetUserPwdDialog" icon="el-icon-ali-changeadmin" round size="small">修改密码
                </el-button>
            </span>
        </div>
        <div class="other-operation">
            <div class="other-operation-item">
                <li class="el-icon-ali-qingchuhuancun"></li>清除缓存
            </div>
            <div @click="showBackupDialog" class="other-operation-item">
                <li class="el-icon-ali-beifenhuanyuan1"></li>
                {{$t("common.backupRestore")}}
            </div>
        </div>
        <div @click="logout" class="personal-footer">
            <li class="el-icon-ali-tuichu"></li>
            {{$t("common.logout")}}
        </div>
        <!--备份还原界面-->
        <database :visible.sync="databaseDialogVisible" @afterRestore="afterRestore"></database>
        <edit-user-info :visible.sync="editUserInfoDialogVisible"></edit-user-info>
        <reset-user-pwd :visible.sync="resetUserPwdDialogVisible"></reset-user-pwd>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import database from './database'
import editUserInfo from './edit_user_info'
import resetUserPwd from './reset_user_pwd'
export default {
    name: 'PersonalPanel',
    components: {
        database,
        editUserInfo,
        resetUserPwd
    },
    data () {
        return {
            editUserInfoDialogVisible: false,
            databaseDialogVisible: false,
            resetUserPwdDialogVisible: false
        }
    },
    methods: {
        // 退出登录
        logout () {
            this.$confirm('确认退出吗?', '提示', {
                type: 'warning'
            }).then(() => {
                sessionStorage.removeItem('loginUser')
                this.$router.push('/login')
                this.$api.sysUser.logout().then((result) => { }).catch((result) => { })
            }).catch(() => { })
        },
        // 打开备份还原界面
        showBackupDialog () {
            this.databaseDialogVisible = true
        },
        showEditUserInfoDialog () {
            this.editUserInfoDialogVisible = true
        },
        showResetUserPwdDialog () {
            this.resetUserPwdDialogVisible = true
        },
        // 成功还原之后，重新登录
        afterRestore () {
            this.resetUserPwdDialogVisible = false
            sessionStorage.removeItem('loginUser')
            this.$router.push('/login')
            this.$api.sysUser.logout().then((result) => { }).catch(function (result) { })
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
.personal-panel {
    font-size: 14px;
    width: 280px;
    text-align: center;
    border-color: rgba(180, 190, 190, 0.2);
    border-width: 1px;
    border-style: solid;
    background: rgba(182, 172, 172, 0.1);
    margin: -14px;
}
.personal-desc {
    padding: 15px;
    color: #fff;
}
.avatar {
    width: 80px;
    height: 80px;
    border-radius: 90px;
}
.name-role {
    font-size: 16px;
    padding: 5px;
}
.personal-relation {
    font-size: 16px;
    padding: 12px;
    margin-right: 1px;
    background: rgba(200, 209, 204, 0.3);
}
.relation-item {
    padding: 12px;
}
.relation-item:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
}
.main-operation {
    padding: 8px;
    margin-right: 1px;
    border-color: rgba(201, 206, 206, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
}
.main-operation-item {
    margin: 10px;
}
.other-operation {
    padding: 15px;
    margin-right: 1px;
    text-align: left;
    border-color: rgba(180, 190, 190, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
}
.other-operation-item {
    padding: 12px;
}
.other-operation-item:hover {
    cursor: pointer;
    background: #9e94941e;
    color: rgb(19, 138, 156);
}
.personal-footer {
    margin-right: 1px;
    font-size: 14px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-color: rgba(180, 190, 190, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
}
.personal-footer:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
    background: #b1a6a61e;
}
</style>
