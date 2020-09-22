<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-14 14:16:47
-->
<template>
    <div class="page-container">
        <!--新增编辑界面-->
        <el-row>
            <el-col :span="24">
                <bread-crumb></bread-crumb>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="18">
                <el-form :model="formData" :rules="formDataRules" :size="normalSize" label-width="80px" ref="formData">
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="formData.title"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="分类" prop="typeId">
                                <el-cascader :options="articleTypeOpts" :props="{ label: 'typeName',value:'id' }"
                                    :show-all-levels="false" v-model="formData.typeId"></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="封面图" prop="attachment">
                        <change-image-icon :imgUrl="formData.attachment ? formData.attachment.path : ''"
                            @chosedImageIcon="chosedLogo"></change-image-icon>
                    </el-form-item>
                    <el-form-item label="文章内容" prop="content">
                        <tinyEditor :content.sync="formData.content" url="/static/tinymce"></tinyEditor>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="18" class="footer">
                <el-button :size="miniSize" @click="resetForm('formData')" round>{{$t('action.cancel')}}</el-button>
                <el-button :loading="editLoading" :size="miniSize" @click.native="submitForm" round type="primary">
                    {{$t('action.submit')}}</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import tinyEditor from '@/components/tiny_editor'
import breadCrumb from '@/components/bread_crumb'
import changeImageIcon from '@/components/change_image_icon'

export default {
    components: {
        breadCrumb,
        tinyEditor,
        changeImageIcon
    },
    data () {
        return {

            normalSize: 'small',
            miniSize: 'mini',
            articleTypeOpts: [],
            isCreating: false, // true:新增, false:编辑
            editLoading: false,

            // 新增编辑界面数据
            formData: {
                id: 0, // 文章ID
                title: '', // 文章标题
                attachment: {
                    id: 0,
                    path: ''
                }, // 文章封面图
                content: '', // 文章内容
                typeId: 0, // 文章分类id
                articleType: {
                    id: 0,
                    typeName: ''
                },
                sort: 0, // 文章排序 从小到大
                isPub: 0 // 1 发布 2 不发布
            },
            formDataRules: {
                title: [
                    { required: true, message: '请输入文章', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        chosedLogo (chosen) {
            this.formData.attachmentId = chosen.id
            this.formData.attachment = chosen
        },
        // 编辑
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, this.formData)

                        if (Array.isArray(data.typeId) && data.typeId.length > 0) {
                            data.typeId = data.typeId.pop()
                        }
                        const _result = await this.$api.article.save(data)
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

                        this.$router.push({ path: '/marketing/article' })
                    })
                }
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        async getArticleTypes () {
            const _result = await this.$api.articleType.getTree()
            if (_result.succeed === 1 && _result.code === 200) {
                this.articleTypeOpts = _result.data.list
            }
        },
        async getArticle (articleId) {
            const _result = await this.$api.article.get({ id: articleId })
            if (_result.succeed === 1 && _result.code === 200) {
                this.formData = Object.assign({}, _result.data)
            }
        }
    },
    async mounted () {
        this.isCreating = this.$route.query.isCreating
        const _articleId = this.$route.query.id

        await this.getArticleTypes()
        await this.getArticle(_articleId)
    }
}
</script>

<style scoped lang="scss">
</style>
