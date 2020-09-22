<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-13 15:31:44
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
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="order:reship:view" slot="append"
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

        <!--退货单查看界面-->
        <el-dialog :close-on-click-modal="false" :visible.sync="viewDialogVisible" title="退货单查看" width="40%">
            <el-form :model="formData" :size="miniSize" label-width="80px" ref="formData" class="dialog-container">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="退货单号:" prop="reshipId">{{formData.reshipId}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单号:" prop="orderId">{{formData.orderId}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名:" prop="user.username">{{formData.user.username}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态:" prop="refund">{{formData.refund}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="快递公司:" prop="logistics">
                            {{formData.logistics ? formData.logistics.logiName:''}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="快递单号:" prop="logiNo">{{formData.logiNo}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-table :data="formData.billReshipItems" :size="miniSize" stripe style="width: 100%">
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
        const self = this
        return {
            normalSize: 'small',
            miniSize: 'mini',
            filters: {
                key: 'reshipId',
                value: ''
            },
            props: [
                { prop: 'reshipId', label: '退货单号' }
            ],
            columns: [
                { prop: 'id', label: 'ID', minWidth: 60 },
                { prop: 'reshipId', label: '退货单号', minWidth: 120 },
                { prop: 'orderId', label: '订单号', minWidth: 120 },
                { prop: 'user.username', label: '用户', minWidth: 120 },
                { prop: 'status', label: '状态', minWidth: 100 },
                { prop: 'logistics.logiName', label: '快递公司', minWidth: 100 },
                { prop: 'logiNo', label: '快递单号', minWidth: 120 },
                { prop: 'createdAt', label: '创建时间', minWidth: 140, formatter: this.env.formatDateTime }
            ],
            paginated: {
                attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                list: []
            },
            operations: [
                {
                    label: 'action.view', // 按钮上显示的文字
                    icon: 'el-icon-ali-bianji', // 按钮文字前面的图标
                    perms: 'order:reship:view', // 权限标识
                    size: this.size, // 按钮大小
                    func: (row) => {
                        self.viewDialogVisible = true
                        self.formData = Object.assign(self.formData, row)
                    }
                }
            ],
            viewDialogVisible: false, // 编辑界面是否显示
            // 浏览界面数据
            formData: {
                id: 0,
                reshipId: '', // 退货单号
                orderId: '', // 订单号
                userId: 0,
                user: {
                    id: '',
                    username: '' // 用户名
                }, // 用户
                status: 1, // 退款状态
                logiCode: '',
                logistics: {
                    logiCode: '',
                    logiName: '' // 快递公司
                }, // 快递
                logiNo: '', // 快递单号
                billReshipItems: [] // 退货商品
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
            const _result = await this.$api.reship.list(this.paginated.attrs)
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
