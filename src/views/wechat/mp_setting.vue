<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-19 19:23:30
-->
<template>
    <div class="page-container">
        <!--导航-->
        <el-row>
            <el-col :span="10">
                <bread-crumb></bread-crumb>
            </el-col>
        </el-row>
        <!--表单-->
        <el-form :model="formData" :rules="formDataRules" :size="normalSize" class="edit-dialog-container"
            label-width="150px" ref="formData">
            <el-row>
                <el-col :span="16">
                    <el-form-item label="接口地址">http://localhost:8085/wechat</el-form-item>
                    <el-form-item label="公众号名称" prop="wx_official_name">
                        <el-col :span="12">
                            <el-input placeholder="请输入公众号名称" v-model="formData.wx_official_name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="微信号" prop="wx_official_id">
                        <el-col :span="12">
                            <el-input placeholder="请输入微信号" v-model="formData.wx_official_id"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="AppId" prop="wx_official_appid">
                        <el-col :span="12">
                            <el-input placeholder="请输入AppId" v-model="formData.wx_official_appid"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="AppSecret" prop="wx_official_app_secret">
                        <el-col :span="12">
                            <el-input placeholder="请输入AppSecret" v-model="formData.wx_official_app_secret"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="公众号原始ID" prop="wx_official_source_id">
                        <el-col :span="12">
                            <el-input placeholder="请输入公众号原始ID" v-model="formData.wx_official_source_id"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="微信验证TOKEN" prop="wx_official_token">
                        <el-col :span="12">
                            <el-input placeholder="请输入微信验证TOKEN" v-model="formData.wx_official_token"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="EncodingAESKey" prop="wx_official_encodeaeskey">
                        <el-col :span="10">
                            <el-input placeholder="请输入EncodingAESKey" v-model="formData.wx_official_encodeaeskey">
                            </el-input>
                        </el-col>
                        <span class="tip-info">
                            <i class="el-icon-ali-tishi"></i> 如公众号中消息加解密方式为安全模式，此项必填
                        </span>
                    </el-form-item>
                    <el-form-item label="公众号类型" prop="wx_official_type">
                        <el-radio-group v-model="formData.wx_official_type">
                            <el-radio label="service">服务号</el-radio>
                            <el-radio label="subscribe">订阅号</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="16" class="footer">
                    <el-button :size="miniSize" @click="resetForm('formData')" round>{{$t('action.cancel')}}</el-button>
                    <el-button :loading="editLoading" :size="miniSize" @click.native="submitForm" round type="primary">
                        {{$t('action.submit')}}</el-button>
                </el-col>
            </el-row>
        </el-form>
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
                wx_official_name: '', // 公众号名称
                wx_official_id: '', // 微信号
                wx_official_appid: '', // AppId
                wx_official_app_secret: '', // AppSecret
                wx_official_source_id: '', // 公众号原始ID
                wx_official_token: '', // 微信验证TOKEN
                wx_official_encodeaeskey: '', // EncodingAESKey
                wx_official_type: 'formData' // 公众号类型
            },
            formDataRules: {
                wx_official_name: [
                    { required: true, message: '请输入公众号名称', trigger: 'blur' }
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

                        const _result = await this.$api.setting.save({ key: 'mp_setting', value: data })
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
            const _result = await this.$api.setting.get({ key: 'mp_setting' })
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
