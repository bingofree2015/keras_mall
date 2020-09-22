<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-09-26 16:34:08
-->
<template>
    <el-container>
        <!--表格栏-->
        <el-main>
            <el-table :align="align" :border="border" :data="orderData" :element-loading-text="$t('action.loading')"
                :highlight-current-row="highlightCurrentRow" :max-height="maxHeight" :size="miniSize" :stripe="stripe"
                @current-change="handleCurrentRowChange" @selection-change="selectionChange" style="width:100%;"
                v-loading="loading">
                <el-table-column minWidth="60" type="selection"></el-table-column>
                <el-table-column label="订单号" minWidth="130" prop="orderId"></el-table-column>
                <el-table-column align="center" label="打印" minWidth="180" prop="orderId">
                    <template slot-scope="scope">
                        <el-link @click="handlePrint(scope.row,'shopping')" icon="el-icon-ali-mai">购</el-link>
                        <el-link @click="handlePrint(scope.row,'distribution')" icon="el-icon-ali-icon209">配</el-link>
                        <el-link @click="handlePrint(scope.row,'union')" icon="el-icon-ali-lian">联</el-link>
                        <el-link @click="handlePrint(scope.row,'express')" icon="el-icon-ali-send">递</el-link>
                    </template>
                </el-table-column>
                <el-table-column :formatter="(row,column)=>{return env.formatDateTime(row[column.property])}"
                    label="下单时间" minWidth="150" prop="createdAt"></el-table-column>
                <el-table-column label="订单状态" minWidth="90" prop="progress"></el-table-column>
                <el-table-column label="售后状态" minWidth="180" prop="afterSaleState" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="用户名" minWidth="90" prop="user.username"></el-table-column>
                <el-table-column label="收货人手机号" minWidth="120" prop="shipMobile"></el-table-column>
                <el-table-column label="收货地址" minWidth="240" prop="shipAddress" show-overflow-tooltip></el-table-column>
                <el-table-column label="支付状态" minWidth="90" prop="payState"></el-table-column>
                <el-table-column label="发货状态" minWidth="90" prop="shipState"></el-table-column>
                <el-table-column label="订单总额" minWidth="90" prop="orderAmount"></el-table-column>
                <el-table-column label="订单来源" minWidth="90" prop="source"></el-table-column>

                <el-table-column :label="$t('action.operation')" :minWidth="operationWidth" fixed="right">
                    <template slot-scope="scope">
                        <template v-for="(item,idx) in scope.row['operatings']">
                            <ext-button :icon="item.icon" :key="idx" :label="$t(item.action)" :perms="item.perms"
                                @click="handleAction(scope.row,item.action)" />
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <!--分页栏-->
        <el-footer style="height:42px">
            <ext-button :disabled="this.selections.length===0" :label="$t('action.batchDelete')"
                :perms="permsBatchDelete" :size="miniSize" @click="handleBatchDelete()" style="float:left;"
                type="danger" v-if="batchDelete" />
            <el-pagination :current-page="attrs.currPage" :page-size="pageSize" :total="count"
                @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" style="float:right;">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
import extButton from '@/components/core/ext_button'
export default {
    name: 'OrderTable',
    components: {
        extButton
    },
    computed: {

    },
    props: {
        orderData: Array, // 表格分页数据
        operationWidth: {
            type: Number,
            default: 0
        }, // 列宽
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
        batchDelete: { // 批删除操作
            type: Function,
            default: null,
            required: false
        },
        permsBatchDelete: String,
        type: { // 订单类型
            type: String,
            default: 'all'
        },
        pageSize: { // 每页记录数
            type: Number,
            default: 9
        },
        count: { // 总记录数
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            actions: 0,
            // 分页信息
            attrs: { type: this.type, searchKey: {}, currPage: 1, offset: 0, limit: this.pageSize },
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
        },
        // 调用打印方法
        handlePrint (row, type) {
            this.$emit('handlePrint', { row, type })
        },
        // 执行方法
        handleAction (row, action) {
            this.$emit('handleAction', { row, action })
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
        }
    },
    mounted () {
        this.handleCurrentChange(1)
    }
}
</script>

<style scoped lang="scss">
</style>
