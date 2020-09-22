<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-28 10:59:51
-->
<template>
    <!--修改密码界面-->
    <el-dialog :close-on-click-modal="false" :modal="false" title="修改密码" v-bind="$attrs" v-on="$listeners" width="30%">
        <el-form :model="formData" :rules="formDataRules" :size="size" label-position="right" label-width="80px"
            ref="formData">
            <el-form-item label="ID" prop="id" v-if="false">
                <el-input :disabled="true" auto-complete="off" v-model="formData.id"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">{{formData.username}}</el-form-item>
            <el-form-item label="原密码" prop="oldPwd">
                <el-input placeholder="请输入密码" show-password type="password" v-model="formData.pwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
                <el-input placeholder="请输入新密码" show-password type="password" v-model="formData.newPwd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="reNewPwd">
                <el-input placeholder="确认密码" show-password type="password" v-model="formData.reNewPwd"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer" slot="footer">
            <el-button :size="size" @click.native="$emit('update:visible', false)" round>{{$t('action.cancel')}}
            </el-button>
            <el-button :loading="editLoading" :size="size" @click.native="submitForm" round type="primary">
                {{$t('action.submit')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
    props: {
        size: {
            type: String,
            default: 'mini'
        }
    },
    data () {
        const validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新密码'))
            } else if (value.toString().length < 6 || value.toString().length > 18) {
                callback(new Error('密码长度为6 - 18个字符'))
            } else {
                callback()
            }
        }
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.formData.newPwd) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            editLoading: false,
            // 新增编辑界面数据
            formData: {
                pwd: '',
                newPwd: '',
                reNewPwd: ''
            },
            formDataRules: {
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                newPwd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                reNewPwd: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState(['loginUser'])
    },
    methods: {
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, _.pick(this.formData, 'id', 'pwd', 'newPwd'))

                        const _result = await this.$api.sysUser.resetPwd(data)
                        this.editLoading = false
                        if (_result.succeed === 1 && _result.code === 200) {
                            this.$notify({
                                title: '成功',
                                message: _result.description,
                                type: 'success'
                            })
                            this.$refs.formData.resetFields()
                            this.$emit('update:visible', false)
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: _result.description
                            })
                        }
                    })
                }
            })
        }
    },
    mounted () {
        this.formData = _.pick(this.loginUser, 'id', 'username', 'pwd')
    }
}
</script>

<style lang="scss">
.el-form-item__content {
    text-align: left;
}
</style>
