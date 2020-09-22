<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-19 20:08:54
-->
<template>
    <div class="page-container edit-dialog-container">
        <!--导航-->
        <el-row>
            <el-col :span="10">
                <bread-crumb></bread-crumb>
            </el-col>
        </el-row>

        <!--表单-->
        <el-row>
            <el-col :span="16">
                <el-form :model="formData" :rules="formDataRules" :size="normalSize" label-width="200px" ref="formData">
                    <el-form-item label="request合法域名">http://localhost:8085</el-form-item>
                    <el-form-item label="socket合法域名">http://localhost:8085</el-form-item>
                    <el-form-item label="uploadFile合法域名">http://localhost:8085</el-form-item>
                    <el-form-item label="downloadFile合法域名">http://localhost:8085</el-form-item>
                    <el-form-item label="小程序名称" prop="wx_nick_name">
                        <el-col :span="12">
                            <el-input placeholder="请输入小程序名称" v-model="formData.wx_nick_name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="AppId" prop="wx_appid">
                        <el-col :span="8">
                            <el-input placeholder="请输入AppId" v-model="formData.wx_appid"></el-input>
                        </el-col>
                        <span class="tip-info">
                            <i class="el-icon-ali-tishi"></i> 请至微信小程序平台 设置》基本设置 中复制粘贴过来
                        </span>
                    </el-form-item>
                    <el-form-item label="AppSecret" prop="wx_app_secret">
                        <el-col :span="8">
                            <el-input placeholder="请输入AppSecret" v-model="formData.wx_app_secret"></el-input>
                        </el-col>
                        <span class="tip-info">
                            <i class="el-icon-ali-tishi"></i> 请至微信小程序平台 设置》基本设置 中复制粘贴过来
                        </span>
                    </el-form-item>
                    <el-form-item label="原始Id" prop="wx_user_name">
                        <el-col :span="8">
                            <el-input placeholder="请输入原始Id" v-model="formData.wx_user_name"></el-input>
                        </el-col>
                        <span class="tip-info">
                            <i class="el-icon-ali-tishi"></i> 请至微信小程序平台 设置》基本设置 中复制粘贴过来
                        </span>
                    </el-form-item>
                    <el-form-item label="主体信息" prop="wx_principal_name">
                        <el-col :span="8">
                            <el-input placeholder="请输入主体信息" v-model="formData.wx_principal_name"></el-input>
                        </el-col>
                        <span class="tip-info">
                            <i class="el-icon-ali-tishi"></i> 请至微信小程序平台 设置》基本设置 中复制粘贴过来
                        </span>
                    </el-form-item>
                    <el-form-item label="简介" prop="wx_signature">
                        <el-input :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入简介" type="textarea"
                            v-model="formData.wx_signature"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16" class="footer">
                <el-button :size="miniSize" @click="resetForm('formData')" round>{{$t('action.cancel')}}</el-button>
                <el-button :loading="editLoading" :size="miniSize" @click.native="submitForm" round type="primary">
                    {{$t('action.submit')}}</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import breadCrumb from '@/components/bread_crumb'
export default {
    components: {
        breadCrumb
    },
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',

            editLoading: false,
            // 编辑界面数据
            formData: {
                wx_nick_name: '', // 小程序名称
                wx_appid: '', // AppId
                wx_app_secret: '', // AppSecret
                wx_user_name: '', // 原始Id
                wx_principal_name: '', // 主体信息
                wx_signature: '' // 简介
            },
            formDataRules: {
                wx_nick_name: [
                    { required: true, message: '请输入小程序名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 提交表单
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, this.formData)

                        const _result = await this.$api.setting.save({ key: 'miniprogram_setting', value: data })
                        if (_result.succeed === 1 && _result.code === 200) {
                            this.$notify({
                                title: '成功',
                                message: _result.description,
                                type: 'success'
                            })
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: _result.description
                            })
                        }

                        this.editLoading = false
                    })
                }
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        async getSettings () {
            const _result = await this.$api.setting.get({ key: 'miniprogram_setting' })
            if (_result.succeed === 1 && _result.code === 200) {
                Object.assign(this.formData, _result.data)
                console.log(this.formData)
            }
        }
    },
    async mounted () {
        await this.getSettings()
    }
}
</script>

<style scoped lang="scss">
.tip-info {
    margin-left: 10px;
    font-size: 12px;
    color: #909399;
}
</style>
