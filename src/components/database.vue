<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <!--备份还原界面-->
    <el-dialog :close-on-click-modal="false" :modal="false" :title="$t('common.backupRestore')" v-bind="$attrs"
        v-on="$listeners" width="40%">
        <el-divider></el-divider>
        <el-table :data="paginatedData.list" :element-tableLoading-text="$t('action.loading')" :size="normalSize"
            @selection-change="selectionChange" v-loading="loading">
            <el-table-column minWidth="40" type="selection"></el-table-column>
            <el-table-column label="路径" minWidth="180" prop="path" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="env.formatDateTime" label="时间" minWidth="140" prop="createdAt">
            </el-table-column>
            <el-table-column :label="$t('action.operation')" fixed="right" minWidth="140">
                <template slot-scope="scope">
                    <el-button :size="miniSize" @click="handleRestore(scope.row)" round type="primary">
                        {{$t('common.restore')}}</el-button>
                    <el-button :size="miniSize" @click="handleDelete(scope.row)" round type="danger">
                        {{$t('action.delete')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页栏-->
        <div style="padding:10px;">
            <el-button :disabled="this.selections.length === 0" :size="miniSize" @click="handleBatchDelete" round
                style="float:left;" type="danger">{{$t('action.batchDelete')}}</el-button>
            <el-pagination :current-page="paginatedAttr.currPage" :page-size="pageSize" :total="paginatedData.count"
                @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" style="float:right;">
            </el-pagination>
        </div>
        <span class="dialog-footer" slot="footer">
            <el-button @click.native="$emit('update:visible', false)" round size="small">{{$t('action.cancel')}}
            </el-button>
            <el-button @click="handleBackup" round size="small" type="primary">{{$t('common.backup')}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    components: {},
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',
            paginatedAttr: { searchKey: {}, currPage: 1, offset: 0, limit: 9 },
            paginatedData: { list: [], count: 0 },
            pageSize: 5,

            loading: false, // 表内容加载标识
            selections: [] // 列表选中列
        }
    },
    methods: {
        // 获取分页数据
        async queryForPaginatedList (data) {
            this.loading = true
            if (data && data.paginatedAttr) {
                this.paginatedAttr = data.paginatedAttr
            }
            this.paginatedAttr.searchKey = {}
            const _result = await this.$api.db.list(this.paginatedAttr)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginatedData = _result.data
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
            this.paginatedAttr.currPage = currPage
            this.paginatedAttr.offset = (currPage - 1) * this.pageSize
            this.queryForPaginatedList()
        },

        // 选择切换
        selectionChange (selections) {
            this.selections = selections
        },

        // 删除
        async handleDelete (row) {
            this.loading = true
            const _result = await this.$api.db.destroy({ ids: [row.id] })
            if (_result.succeed === 1 && _result.code === 200) {
                this.$notify({
                    title: '成功',
                    message: _result.description,
                    type: 'success'
                })
                this.queryForPaginatedList()
            } else {
                this.$notify.error({
                    title: '错误',
                    message: _result.description
                })
            }
            this.loading = false
        },

        // 批量删除
        async handleBatchDelete () {
            this.loading = true
            const _ids = []
            this.selections.map((item) => {
                _ids.push(item.id)
            })
            const _result = await this.$api.db.destroy({ ids: _ids })
            if (_result.succeed === 1 && _result.code === 200) {
                this.$notify({
                    title: '成功',
                    message: _result.description,
                    type: 'success'
                })
                this.queryForPaginatedList()
            } else {
                this.$notify.error({
                    title: '错误',
                    message: _result.description
                })
            }
            this.loading = false
        },

        // 数据备份
        async handleBackup () {
            this.loading = true
            const _result = await this.$api.db.backup()
            if (_result.succeed === 1 && _result.code === 200) {
                this.$notify({
                    title: '成功',
                    message: '备份成功',
                    type: 'success'
                })
                await this.queryForPaginatedList()
            } else {
                this.$notify.error({
                    title: '错误',
                    message: _result.description
                })
            }
            this.loading = false
        },

        // 数据还原
        async handleRestore (row) {
            this.loading = true
            const _result = await this.$api.db.restore({ id: row.id })
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
            this.loading = false
        }
    },
    mounted () {
        this.queryForPaginatedList()
    }
}
</script>

<style scoped lang="scss">
.el-dialog__body {
    padding: 5px 10px;
}
</style>
