<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-09-21 15:33:54
-->
<template>
    <div>
        <ext-button :size="miniSize" @click="handlePickArticle()" icon="el-icon-ali-Newxuanzeshangpinxuanzhong"
            label="选择文章" type="primary" />
        <el-dialog :modal-append-to-body="false" :close-on-click-modal="false" :size="miniSize"
            :visible.sync="dialogVisible" title="商品选择窗" width="50%">
            <el-table :data="paginated.list" :size="miniSize" @selection-change="multipleChoiceChange"
                element-loading-text="$t('action.loading')" stripe v-loading="loading">
                <el-table-column minWidth="80" type="selection" v-if="selectionType==1"></el-table-column>
                <el-table-column align="center" label="选择" minWidth="80" v-else-if="selectionType === 0">
                    <template slot-scope="scope">
                        <el-radio @change.native="choiceChange(scope.$index,scope.row)" :label="scope.$index"
                            v-model="radio">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column label="文章标题" min-width="180" property="title" show-overflow-tooltip></el-table-column>
                <el-table-column label="类型" min-width="90" property="articleType.typeName"></el-table-column>
                <el-table-column label="状态" min-width="90" property="isPub"></el-table-column>
                <el-table-column label="创建时间" min-width="110" property="createdAt"></el-table-column>
            </el-table>
            <div style="padding:10px;">
                <el-pagination :current-page="paginated.attrs.currPage" :page-size="paginated.attrs.limit"
                    :total="paginated.attrs.count" @current-change="handleCurrentChange"
                    layout="total, prev, pager, next, jumper" style="float:right;"></el-pagination>
            </div>
            <span class="dialog-footer" slot="footer">
                <el-button :size="miniSize" @click="dialogVisible = false" round>取 消</el-button>
                <el-button :size="miniSize" @click="chosedArticles" round type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import extButton from '@/components/core/ext_button'
export default {
    name: 'PickArticles',
    components: {
        extButton
    },
    data () {
        return {
            miniSize: 'mini',
            normalSize: 'small',
            loading: false,
            dialogVisible: false,

            paginated: {
                attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 8, count: 0 },
                list: []
            },
            radio: '',
            selectArticles: []
        }
    },
    props: {
        articles: {
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

            const _result = await this.$api.article.list(this.paginated.attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginated.list = _result.data.list
                this.paginated.attrs.count = _result.data.count
            } else {
                this.$notify.error({
                    title: '错误',
                    message: _result.description
                })
            }
            this.loading = false
        },
        // 换页刷新
        handleCurrentChange (currPage) {
            this.paginated.attrs.currPage = currPage
            this.paginated.attrs.offset = (currPage - 1) * this.paginated.attrs.limit
            this.queryForPaginatedList()
        },
        // 选择切换(多选)
        multipleChoiceChange (selectArticles) {
            console.log(selectArticles)
            this.selectArticles = selectArticles
        },
        // 选择切换(单选)
        choiceChange (index, row) {
            this.radio = index
            this.selectArticles = [row]
        },
        handlePickArticle () {
            this.dialogVisible = true
        },
        chosedArticles () {
            this.$emit('chosedArticles', this.selectArticles)
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
