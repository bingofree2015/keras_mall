<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-04 20:14:13
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
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="order:view" slot="append"
                                type="primary" />
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <ext-button :label="$t('action.batchPay')" @click="handleBatchPay"
                            icon="el-icon-ali-piliangzhifu" perms="order:pay" type="primary" />
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

        <!--分页列表-->
        <el-tabs @tab-click="handleClick" class="tab-container" type="border-card" v-model="activeName">
            <el-tab-pane name="all">
                <span slot="label">
                    <el-badge :value="paginated['all'].attrs.count" class="item">
                        <i class="el-icon-ali-quanbushangpin"></i> 全部订单
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <order-table :batchDelete="batchDelete" :count="paginated['all'].attrs.count"
                    :operationWidth="operationWidth" :orderData="paginated['all'].list"
                    :pageSize="paginated['all'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @handleAction="handleAction" @handlePrint="handlePrint"
                    @queryForPaginatedList="queryForPaginatedList" type="all"></order-table>
            </el-tab-pane>
            <el-tab-pane name="payment">
                <span slot="label">
                    <el-badge :value="paginated['payment'].attrs.count" class="item">
                        <i class="el-icon-ali-daizhifu"></i> 待支付
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <order-table :batchDelete="batchDelete" :count="paginated['payment'].attrs.count"
                    :operationWidth="operationWidth" :orderData="paginated['payment'].list"
                    :pageSize="paginated['payment'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @handleAction="handleAction" @handlePrint="handlePrint"
                    @queryForPaginatedList="queryForPaginatedList" type="payment"></order-table>
            </el-tab-pane>
            <el-tab-pane name="delivered">
                <span slot="label">
                    <el-badge :value="paginated['delivered'].attrs.count" class="item">
                        <i class="el-icon-ali-daifahuo"></i> 待发货
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <order-table :batchDelete="batchDelete" :count="paginated['delivered'].attrs.count"
                    :operationWidth="operationWidth" :orderData="paginated['delivered'].list"
                    :pageSize="paginated['delivered'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @handleAction="handleAction" @handlePrint="handlePrint"
                    @queryForPaginatedList="queryForPaginatedList" type="delivered"></order-table>
            </el-tab-pane>
            <el-tab-pane name="receive">
                <span slot="label">
                    <el-badge :value="paginated['receive'].attrs.count" class="item">
                        <i class="el-icon-ali-daishouhuo"></i> 待收货
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <order-table :batchDelete="batchDelete" :count="paginated['receive'].attrs.count"
                    :operationWidth="operationWidth" :orderData="paginated['receive'].list"
                    :pageSize="paginated['receive'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @handleAction="handleAction" @handlePrint="handlePrint"
                    @queryForPaginatedList="queryForPaginatedList" type="receive"></order-table>
            </el-tab-pane>
            <el-tab-pane name="evaluated">
                <span slot="label">
                    <el-badge :value="paginated['evaluated'].attrs.count" class="item">
                        <i class="el-icon-ali-daipingjia"></i> 待评价
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <order-table :batchDelete="batchDelete" :count="paginated['evaluated'].attrs.count"
                    :operationWidth="operationWidth" :orderData="paginated['evaluated'].list"
                    :pageSize="paginated['evaluated'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @handleAction="handleAction" @handlePrint="handlePrint"
                    @queryForPaginatedList="queryForPaginatedList" type="evaluated"></order-table>
            </el-tab-pane>
            <el-tab-pane name="cancel">
                <span slot="label">
                    <el-badge :value="paginated['cancel'].attrs.count" class="item">
                        <i class="el-icon-ali-yiquxiao"></i> 已取消
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <order-table :batchDelete="batchDelete" :count="paginated['cancel'].attrs.count"
                    :operationWidth="operationWidth" :orderData="paginated['cancel'].list"
                    :pageSize="paginated['cancel'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @handleAction="handleAction" @handlePrint="handlePrint"
                    @queryForPaginatedList="queryForPaginatedList" type="cancel"></order-table>
            </el-tab-pane>
            <el-tab-pane name="complete">
                <span slot="label">
                    <el-badge :value="paginated['complete'].attrs.count" class="item">
                        <i class="el-icon-ali-yiwancheng"></i> 已完成
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <order-table :batchDelete="batchDelete" :count="paginated['complete'].attrs.count"
                    :operationWidth="operationWidth" :orderData="paginated['complete'].list"
                    :pageSize="paginated['complete'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @handleAction="handleAction" @handlePrint="handlePrint"
                    @queryForPaginatedList="queryForPaginatedList" type="complete"></order-table>
            </el-tab-pane>
        </el-tabs>

        <order-delivery-dialog :orderId="orderId" :visible.sync="deliveryDialogVisible"></order-delivery-dialog>
        <order-detail-dialog :orderId="orderId" :visible.sync="viewDialogVisible"></order-detail-dialog>
        <order-edit-dialog :orderId="orderId" :visible.sync="editDialogVisible"></order-edit-dialog>
    </div>
</template>

<script>
import extButton from '@/components/core/ext_button'
import breadCrumb from '@/components/bread_crumb'
import orderTable from '@/components/order_table'

import orderDeliveryDialog from '@/components/order_delivery_dialog'
import orderDetailDialog from '@/components/order_detail_dialog'
import orderEditDialog from '@/components/order_edit_dialog'

export default {
    components: {
        extButton,
        breadCrumb,
        orderTable,
        orderDeliveryDialog,
        orderDetailDialog,
        orderEditDialog
    },
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',
            filters: {
                key: 'orderId',
                value: ''
            },
            props: [
                { prop: 'orderId', label: '订单号' }
            ],
            activeName: 'all',

            paginated: {
                all: { // 全部订单
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                },
                payment: { // 待支付
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                },
                delivered: { // 待发货
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                },
                receive: { // 待收货
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                },
                evaluated: { // 待评价
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                },
                cancel: { // 已取消
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                },
                complete: { // 已完成
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                }
            },

            operationWidth: 0,
            permsBatchDelete: 'order:delete',

            orderId: '',

            viewDialogVisible: false, // 订单查看
            editDialogVisible: false, // 订单编辑
            deliveryDialogVisible: false // 订单发货
        }
    },
    methods: {
        handleClick () { },
        // 获取分页数据
        async queryForPaginatedList (data) {
            let _type = this.activeName
            if (data && data.attrs) {
                _type = data.attrs.type
                this.paginated[_type].attrs = data.attrs
            }

            this.paginated[_type].attrs.searchKey = {}

            if (_type === 'payment') { // 待付款
                this.paginated[_type].attrs.searchKey.state = 1 // 订单状态正常
                this.paginated[_type].attrs.searchKey.payState = 1 // 未付款
            } else if (_type === 'delivered') { // 待发货
                this.paginated[_type].attrs.searchKey.state = 1 // 订单状态正常
                this.paginated[_type].attrs.searchKey.payState = 2 // 已付款
                this.paginated[_type].attrs.searchKey.shipState = 1 // 未发货
            } else if (_type === 'receive') { // 待收货
                this.paginated[_type].attrs.searchKey.state = 1 // 订单状态正常
                this.paginated[_type].attrs.searchKey.shipState = 3 // 已发货
                this.paginated[_type].attrs.searchKey.confirm = 1 // 未确认收货
            } else if (_type === 'evaluated') { // 待评价
                this.paginated[_type].attrs.searchKey.state = 1 // 订单状态正常
                this.paginated[_type].attrs.searchKey.payState = { $gt: 1 } // 未付款
                this.paginated[_type].attrs.searchKey.shipState = 3 // 已发货
                this.paginated[_type].attrs.searchKey.confirm = 2 // 确认收货
                this.paginated[_type].attrs.searchKey.isComment = 1 // 没有评价
            } else if (_type === 'cancel') { // 已取消
                this.paginated[_type].attrs.searchKey.state = 3 // 订单状态取消
            } else if (_type === 'complete') { // 已完成
                this.paginated[_type].attrs.searchKey.state = 2 // 订单状态完成
            }

            if (this.filters.key && this.filters.value) {
                this.paginated[_type].attrs.searchKey[this.filters.key] = this.filters.value
            }
            console.log(`${_type} -> ${JSON.stringify(this.paginated[_type].attrs.searchKey)}`)

            const _result = await this.$api.order.list(this.paginated[_type].attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginated[_type].list = _result.data.list
                for (const item of this.paginated[_type].list) {
                    const _actions = Array.isArray(item.operatings) ? item.operatings.length : 0
                    if (_actions * 90 > this.operationWidth) {
                        this.operationWidth = _actions * 90
                    }
                }
                this.paginated[_type].attrs.count = _result.data.count
            }
            if (data && data.cb) data.cb()
        },
        // 批量删除
        async batchDelete (ids) {
            const _result = await this.$api.order.destroy({ ids })
            if (_result.succeed === 1 && _result.code === 200) {
                for (const id of ids) {
                    const _index = this.paginated[this.activeName].list.findIndex(v => v.id === id)
                    this.paginated[this.activeName].list.splice(_index, 1)
                }
            }
        },
        // 批量支付
        handleBatchPay () {
            this.$message({ message: '批量支付', type: 'info' })
        },
        handleAction (params) {
            const { row, action } = params
            this.orderId = row.orderId
            if (action === 'action.view') {
                this.viewDialogVisible = true
            } else if (action === 'action.edit') {
                this.editDialogVisible = true
            } else if (action === 'action.delivery') {
                this.deliveryDialogVisible = true
            } else if (action === 'action.finished') {
                this.$confirm(`确认设置订单号${this.orderId}为完成吗？`, '提示', {}).then(async () => {
                    const _result = await this.$api.order.complate({ orderId: this.orderId })
                    if (_result.succeed === 1 && _result.code === 200) {
                        this.queryForPaginatedList()
                    }
                    this.$notify.info({
                        title: '消息',
                        message: _result.description
                    })
                })
            } else if (action === 'action.cancel') {
                this.$confirm(`确认需要取消订单${this.orderId}吗？`, '提示', {}).then(async () => {
                    const _result = await this.$api.order.cancel({ orderIds: [this.orderId] })
                    if (_result.succeed === 1 && _result.code === 200) {
                        this.queryForPaginatedList()
                    }
                    this.$notify.info({
                        title: '消息',
                        message: _result.description
                    })
                })
            } else if (action === 'action.delete') {
                this.$confirm(`确认需要删除订单${this.orderId}吗？`, '提示', {}).then(async () => {
                    const _result = await this.$api.order.destroy({ ids: [this.orderId] })
                    if (_result.succeed === 1 && _result.code === 200) {
                        this.queryForPaginatedList()
                    }
                    this.$notify.info({
                        title: '消息',
                        message: _result.description
                    })
                })
            } else {
                this.$message({ message: action, type: 'info' })
            }
        },
        handlePrint (params) {
            const { row, type } = params
            if (['shopping', 'distribution', 'union'].includes(type)) {
                this.$router.push({ path: '/order/print', query: { orderId: row.orderId, type: type } })
            }
        }
    },
    mounted () { }
}
</script>

<style scoped lang="scss">
.tab-container /deep/ .el-tabs__item {
    padding: 10px 20px;
    height: 50px;
}
</style>
