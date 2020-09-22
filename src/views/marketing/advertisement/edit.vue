<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-14 16:41:57
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
            <el-col :span="16">
                <el-form :model="formData" :rules="formDataRules" :size="normalSize" label-width="80px" ref="formData">
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="广告名称" prop="name">
                                <el-input v-model="formData.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="广告位" prop="positionId">
                                <el-select placeholder="请选择" v-model="formData.positionId">
                                    <el-option :key="advertPosition.id" :label="advertPosition.name"
                                        :value="advertPosition.id" v-for="advertPosition in advertPositions">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="广告类型" prop="type">
                                <el-select placeholder="请选择" v-model="formData.type">
                                    <el-option :key="linkType.key" :label="linkType.value" :value="linkType.key"
                                        v-for="linkType in linkTypes"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="广告商品" prop="val">
                                <el-input placeholder="请选择" v-model="formData.val">
                                    <pick-goods :selectionType="0" @chosedGoods="(goods)=>{chosedGoods(formData,goods)}"
                                        slot="append" v-if="formData.type === 2"></pick-goods>
                                    <pick-article :selectionType="0"
                                        @chosedArticles="(articles)=>{chosedArticles(formData,'val',articles,'id')}"
                                        slot="append" v-else-if="formData.type === 3"></pick-article>
                                    <pick-articleType :selectionType="0"
                                        @chosedArticleTypes="(articleTypes)=>{chosedArticleTypes(formData,'val',articleTypes)}"
                                        slot="append" v-else-if="formData.type === 4"></pick-articleType>
                                    <pick-form :selectionType="0" @chosedForms="(forms)=>{chosedForms(formData,forms)}"
                                        slot="append" v-else-if="formData.type === 5"></pick-form>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="广告排序" prop="sort">
                                <el-input-number :min="0" controls-position="right" label="排序" style="width:100px"
                                    v-model="formData.sort"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="封面图" prop="attachment">
                                <change-image-icon :imgUrl="formData.attachment ? formData.attachment.path : ''"
                                    :initStyle="{height: '180px', width: '180px',border: '1px dashed #d9d9d9', borderRadius: '4px'}"
                                    @chosedImageIcon="chosedImage"></change-image-icon>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="footer">
                            <el-button :size="miniSize" @click="resetForm('formData')" round>{{$t('action.cancel')}}
                            </el-button>
                            <el-button :loading="editLoading" :size="miniSize" @click.native="submitForm" round
                                type="primary">{{$t('action.submit')}}</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import breadCrumb from '@/components/bread_crumb'

import pickGoods from '@/components/pick_goods'
import pickArticle from '@/components/pick_article'
import pickArticleType from '@/components/pick_articleType'
import pickForm from '@/components/pick_form'
import changeImageIcon from '@/components/change_image_icon'

export default {
    components: {
        breadCrumb,
        pickGoods,
        pickArticle,
        pickArticleType,
        pickForm,
        changeImageIcon
    },
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',
            advertPositions: [],
            isCreating: false, // true:新增, false:编辑
            editLoading: false,

            // 新增编辑界面数据
            formData: {
                id: 0, // 广告ID
                positionId: '', // 广告位置id
                name: '', // 广告名称
                attachment: {
                    id: 0,
                    path: ''
                }, // 广告图片id
                val: '', // 链接属性值
                sort: 0, // 从小到大 越小越靠前
                code: '', // 广告位置编码
                type: 1 // 类型(1 url 2 商品 3 文章)
            },
            linkTypes: [
                { key: 1, value: 'URL链接' },
                { key: 2, value: '商品' },
                { key: 3, value: '文章' },
                { key: 4, value: '文章分类' },
                { key: 5, value: '智能表单' }
            ],
            formDataRules: {
                name: [
                    { required: true, message: '请输入广告名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        chosedImage (chosen) {
            this.formData.attachmentId = chosen.id
            this.formData.attachment = chosen
        },
        chosedGoods (item, goods) {
            if (item && Array.isArray(goods) && goods.length > 0) {
                item.val = goods[0].id
            }
        },
        chosedArticles (item, descColumn, articles, srcColumn) {
            if (item && Array.isArray(articles) && articles.length > 0) {
                item[descColumn] = articles[0][srcColumn]
            }
        },
        chosedArticleTypes (item, column, articleTypes) {
            if (item && Array.isArray(articleTypes) && articleTypes.length > 0) {
                item[column] = articleTypes[0].id
            }
        },
        chosedForms (item, forms) {
            if (item && Array.isArray(forms) && forms.length > 0) {
                item.val = forms[0].id
            }
        },
        // 编辑
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, this.formData)
                        if (Array.isArray(data.positionId) && data.positionId.length > 0) {
                            data.positionId = data.positionId.pop()
                        }
                        const _result = await this.$api.advertisement.save(data)
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

                        this.$router.push({ path: '/marketing/advertisement' })
                    })
                }
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        async getAdvertPositions () {
            const _result = await this.$api.advertPosition.list()
            if (_result.succeed === 1 && _result.code === 200) {
                this.advertPositions = _result.data.list
            }
        },
        async getAdvertment (id) {
            const _result = await this.$api.advertisement.get({ id })
            if (_result.succeed === 1 && _result.code === 200) {
                this.formData = Object.assign(this.formData, _result.data)
            }
        }
    },
    async mounted () {
        this.isCreating = this.$route.query.isCreating
        const _id = this.$route.query.id
        await this.getAdvertPositions()
        if (_id) {
            await this.getAdvertment(_id)
        }
    }
}
</script>

<style scoped lang="scss">
</style>
