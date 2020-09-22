<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-09-21 18:04:31
-->
<template>
    <div>
        <ext-button :size="miniSize" @click="handlePickArticleType()" icon="el-icon-ali-Newxuanzeshangpinxuanzhong"
            label="选择文章分类" type="primary" />
        <el-dialog :close-on-click-modal="false" :modal-append-to-body="false" :size="miniSize"
            :visible.sync="dialogVisible" title="文章分类选择窗" width="40%">
            <el-table :data="articleTypeData" :size="miniSize" @selection-change="multipleChoiceChange"
                element-loading-text="$t('action.loading')" stripe v-loading="loading">
                <el-table-column minWidth="80" type="selection" v-if="selectionType==1"></el-table-column>
                <el-table-column align="center" label="选择" minWidth="80" v-else-if="selectionType === 0">
                    <template slot-scope="scope">
                        <el-radio :label="scope.$index" @change.native="choiceChange(scope.$index,scope.row)"
                            v-model="radio">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column label="分类名称" min-width="210" property="typeName" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="创建时间" min-width="130" :formatter="env.formatDateTime" property="createdAt">
                </el-table-column>
            </el-table>
            <span class="dialog-footer" slot="footer">
                <el-button :size="miniSize" @click="dialogVisible = false" round>取 消</el-button>
                <el-button :size="miniSize" @click="chosedArticleTypes" round type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import extButton from '@/components/core/ext_button'
export default {
    name: 'PickArticleTypes',
    components: {
        extButton
    },
    data () {
        return {
            miniSize: 'mini',
            normalSize: 'small',
            loading: false,
            dialogVisible: false,
            articleTypeData: [],

            radio: '',
            selectArticleTypes: []
        }
    },
    props: {
        articleTypes: {
            type: Array,
            default: () => {
                return []
            }
        },
        selectionType: {
            type: Number,
            default: 1 // 1 多选; 0 单选
        }
    },
    methods: {
        // 获取分页数据
        async queryForPaginatedList () {
            this.loading = true

            const _result = await this.$api.articleType.getTree()
            if (_result.succeed === 1 && _result.code === 200) {
                this.articleTypeData = _result.data.list
            } else {
                this.$notify.error({
                    title: '错误',
                    message: _result.description
                })
            }
            this.loading = false
        },
        // 选择切换(多选)
        multipleChoiceChange (selectArticleTypes) {
            console.log(selectArticleTypes)
            this.selectArticleTypes = selectArticleTypes
        },
        // 选择切换(单选)
        choiceChange (index, row) {
            this.radio = index
            this.selectArticleTypes = [row]
        },
        handlePickArticleType () {
            this.dialogVisible = true
        },
        chosedArticleTypes () {
            this.$emit('chosedArticleTypes', this.selectArticleTypes)
            this.dialogVisible = false
        }
    },
    mounted () {
        this.queryForPaginatedList()
    }
}
</script>
<style scoped lang="scss">
</style>
