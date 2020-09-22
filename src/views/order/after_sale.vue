<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-13 14:15:30
-->
<template>
    <div class="page-container">
        <!--导航与工具栏-->
        <el-row>
            <el-col :span="10">
                <bread-crumb></bread-crumb>
            </el-col>
            <el-col :span="14" class="top-bar">
                <el-form :inline="true" :model="filters" :size="miniSize">
                    <el-form-item>
                        <el-input placeholder="请输入内容" v-model="filters.value">
                            <el-select class="search-prepend" placeholder="请选择" slot="prepend" v-model="filters.key">
                                <el-option :key="item.prop" :label="item.label" :value="item.prop"
                                    v-for="item in props"></el-option>
                            </el-select>
                            <ext-button :label="$t('action.search')" @click="queryForPaginatedList()"
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="order:after_sale:view" slot="append"
                                type="primary" />
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button-group>
                            <el-tooltip content="刷新" placement="top">
                                <el-button @click="queryForPaginatedList()" icon="el-icon-ali-shuaxin" round>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="导出" placement="top">
                                <el-button icon="el-icon-ali-daochu" round></el-button>
                            </el-tooltip>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <!--表格内容栏-->
        <ext-table :columns="columns" :count="paginated.attrs.count" :data="paginated.list" :operations="operations"
            :operationWidth="operationWidth" :pageSize="paginated.attrs.limit"
            @queryForPaginatedList="queryForPaginatedList"></ext-table>

        <!--售后单查看界面-->
        <el-dialog :close-on-click-modal="false" :visible.sync="viewDialogVisible" title="售后单查看" width="40%">
            <el-form :model="formData" :size="miniSize" label-width="80px" ref="formData" class="dialog-container">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="售后单号:" prop="afterSaleId">{{formData.afterSaleId}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单号:" prop="orderId">{{formData.orderId}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名:" prop="user">{{formData.user.username}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="退款金额:" prop="refund">{{formData.refund}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="售后类型:" prop="type">{{formData.type}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="退款状态:" prop="status">{{formData.status}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="原因:" prop="reason">{{formData.reason}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注:" prop="mark">{{formData.mark}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-table :data="formData.billAfterSaleItems" :size="miniSize" stripe style="width: 100%">
                            <el-table-column label="货品名称" min-width="360" prop="name" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column label="发货数量" min-width="100" prop="num"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button :size="miniSize" @click.native="viewDialogVisible = false" round type="primary">
                    {{$t('action.comfirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import extTable from '@/components/core/ext_table'
import extButton from '@/components/core/ext_button'
import breadCrumb from '@/components/bread_crumb'

export default {
    components: {
        extTable,
        extButton,
        breadCrumb
    },
    computed: {
        operationWidth: {
            get () {
                let _operationWidth = 0
                if (Array.isArray(this.operations)) {
                    _operationWidth += this.operations.length * 100
                }
                return _operationWidth
            }
        }
    },
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',
            filters: {
                key: 'afterSaleId',
                value: ''
            },
            props: [
                { prop: 'afterSaleId', label: '售后单号' }
            ],
            columns: [
                { prop: 'id', label: 'ID', minWidth: 60 },
                { prop: 'afterSaleId', label: '售后单号', minWidth: 120 },
                { prop: 'orderId', label: '订单号', minWidth: 120 },
                { prop: 'status', label: '状态', minWidth: 90 },
                { prop: 'type', label: '售后类型', minWidth: 90 },
                { prop: 'user.username', label: '用户', minWidth: 110 },
                { prop: 'refund', label: '退款金额', minWidth: 100 },
                { prop: 'reason', label: '原因', minWidth: 180, showOverflowTooltip: true },
                { prop: 'createdAt', label: '申请时间', minWidth: 130, formatter: this.env.formatDateTime }
            ],
            paginated: {
                attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                list: []
            },
            operations: [
                {
                    label: 'action.view', // 按钮上显示的文字
                    icon: 'el-icon-ali-bianji', // 按钮文字前面的图标
                    perms: 'order:after_sale:view', // 权限标识
                    size: this.size, // 按钮大小
                    // type: 'primary',            // 按钮类型
                    func: (row) => {
                        this.viewDialogVisible = true
                        this.formData = Object.assign(this.formData, row)
                    }
                }
            ],
            viewDialogVisible: false, // 编辑界面是否显示
            // 浏览界面数据
            formData: {
                id: 0,
                afterSaleId: '', // 售后单号
                orderId: '', // 订单号
                userId: 0,
                user: {
                    id: 0,
                    username: '' // 用户名
                }, // 用户
                refund: 0, // 退款金额
                type: 1, // 售后类型
                status: 1, // 退款状态
                reason: '', // 原因
                attachments: [], // 图片
                shopItems: [], // 退货商品
                mark: '', // 备注
                billAfterSaleItems: []
            }
        }
    },
    methods: {
        // 获取分页数据
        async queryForPaginatedList (data) {
            if (data && data.attrs) {
                this.paginated.attrs = data.attrs
            }
            this.paginated.attrs.searchKey = {}
            if (this.filters.key && this.filters.value) {
                this.paginated.attrs.searchKey[this.filters.key] = this.filters.value
            }
            const _result = await this.$api.afterSale.list(this.paginated.attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginated.list = _result.data.list
                this.paginated.attrs.count = _result.data.count
            }
            if (data && data.cb) data.cb()
        }
    },
    mounted () { }
}
</script>

<style scoped lang="scss">
</style>
