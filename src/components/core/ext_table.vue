<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <el-container>
        <!--表格栏-->
        <el-main>
            <el-table :align="align" :border="border" :data="data" :element-loading-text="$t('action.loading')"
                :highlight-current-row="highlightCurrentRow" :max-height="maxHeight" :size="miniSize" :stripe="stripe"
                @current-change="handleCurrentRowChange" @selection-change="selectionChange" style="width:100%;"
                v-loading="loading">
                <el-table-column :selectable="selectable" type="selection" v-if="batchDelete && showOperation"
                    width="48"></el-table-column>
                <el-table-column :align="column.align" :fixed="column.fixed" :key="idx" :label="column.label"
                    :min-width="column.minWidth" :prop="column.prop" :show-overflow-tooltip="column.showOverflowTooltip"
                    :sortable="column.sortable===null?true:column.sortable" :type="column.type" :width="column.width"
                    v-for="(column,idx) in columns">
                    <template slot-scope="scope">
                        <el-avatar :size="23" :src="env.getImgUrl(getColumnValue(scope.row,column.prop))"
                            v-if="column.propType === 'image'"></el-avatar>
                        <el-switch @change="column.clickFlag && column.func(scope.row.id,scope.row[column.prop])"
                            v-else-if="column.propType === 'bool'" v-model="scope.row[column.prop]"></el-switch>
                        <span
                            v-else-if="column.formatter">{{column.formatter(scope.row[column.prop],aliasName,column.prop)}}</span>
                        <span v-else>{{getColumnValue(scope.row,column.prop)}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('action.operation')" :width="operationWidth" align="center" fixed="right"
                    header-align="center" v-if="showOperation">
                    <template slot-scope="scope">
                        <ext-button :disabled="!selectable(scope.row)" :icon="operation.icon" :key="idx"
                            :label="$t(operation.label)" :perms="operation.perms" :size="miniSize"
                            :type="operation.type" @click="operation.func(scope.row)"
                            v-for="(operation,idx) in operations" />
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <!--分页栏-->
        <el-footer style="height:42px">
            <ext-button :disabled="this.selections.length===0" :label="$t('action.batchDelete')"
                :perms="permsBatchDelete" :size="miniSize" @click="handleBatchDelete()" style="float:left;"
                type="danger" v-if="batchDelete && showOperation" />
            <el-pagination :current-page="attrs.currPage" :page-size="pageSize" :total="count"
                @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" style="float:right;"
                v-if="isPaging"></el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
import extButton from '@/components/core/ext_button'
export default {
    name: 'ExtTable',
    components: {
        extButton
    },
    computed: {
        getColumnValue () {
            return function (row, prop) {
                const _props = prop.split('.')
                let _value = row[_props[0]]
                if (_value) {
                    for (let i = 1; i < _props.length; i++) {
                        _value = _value[_props[i]]
                        if (!_value) { break }
                    }
                }
                return _value
            }
        }
    },
    props: {
        columns: {
            type: Array,
            default: () => { return [] }
        }, // 表格列配置
        operations: {
            type: Array,
            default: () => { return [] }
        }, // 扩展动作
        data: {
            type: Array,
            default: () => { return [] }
        }, // 表格分页数据
        normalSize: {
            type: String,
            default: 'small'
        },
        miniSize: { // 尺寸样式
            type: String,
            default: 'mini'
        },
        align: { // 文本对齐方式
            type: String,
            default: 'left'
        },
        maxHeight: { // 表格最大高度
            type: Number,
            default: 480
        },
        showOperation: { // 是否显示操作组件
            type: Boolean,
            default: true
        },
        operationWidth: {
            type: Number,
            default: 205
        },
        border: { // 是否显示边框
            type: Boolean,
            default: false
        },
        stripe: { // 是否显示斑马线
            type: Boolean,
            default: true
        },
        highlightCurrentRow: { // 是否高亮当前行
            type: Boolean,
            default: true
        },
        showOverflowTooltip: { // 是否单行显示
            type: Boolean,
            default: true
        },
        batchDelete: { // 是否显示批删除操作组件
            type: Function,
            default: () => { return null },
            required: false
        },
        permsBatchDelete: String,
        disableIds: {
            type: Array,
            default: () => { return [] }
        },   // 不可操作的行
        tabName: {
            type: String,
            default: 'all',
            required: false
        },
        isPaging: {
            type: Boolean,
            default: true
        }, // 是否分页
        pageSize: { // 表格最大高度
            type: Number,
            default: 9
        },
        count: { // 总记录数
            type: Number,
            default: 0
        },
        aliasName: {
            type: String,
            default: '',
            required: false
        }
    },
    data () {
        return {
            // 分页信息
            attrs: { tabName: this.tabName, searchKey: {}, currPage: 1, offset: 0, limit: this.pageSize },
            loading: false, // 加载标识
            selections: [] // 列表选中列
        }
    },
    methods: {
        // 分页查询
        queryForPaginatedList () {
            this.loading = true
            const cb = () => {
                this.loading = false
            }
            this.$emit('queryForPaginatedList', { attrs: this.attrs, cb })
        },
        // 当选择项发生变化时会触发该事件
        selectionChange (selections) {
            this.selections = selections
            this.$emit('selectionChange', { selections })
        },
        // 当表格的当前行发生变化的时候会触发该事件
        handleCurrentRowChange (row) {
            this.$emit('handleCurrentRowChange', row)
        },
        // 换页刷新
        handleCurrentChange (currPage) {
            this.attrs.currPage = currPage
            this.attrs.offset = (currPage - 1) * this.pageSize
            this.queryForPaginatedList()
        },
        // 批量删除
        handleBatchDelete () {
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                const _ids = []
                this.selections.map((item) => {
                    _ids.push(item.id)
                })
                if (this.batchDelete) {
                    this.batchDelete(_ids)
                }
            })
        },
        selectable (row) {
            if (this.disableIds && this.disableIds.includes(row.id)) {
                return false
            } else {
                return true
            }
        }
    },
    mounted () {
        this.handleCurrentChange(1)
    }
}
</script>

<style scoped lang="scss">
</style>
