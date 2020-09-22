<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-09-26 20:52:40
-->
<template>
    <el-dialog :close-on-click-modal="false" :modal="false" @open="openDialog" title="订单详情" v-bind="$attrs"
        v-on="$listeners" width="60%">
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="basicInfo">
                <el-form :size="miniSize" class="dialog-container" label-width="100px">
                    <div class="group-container">
                        <el-divider content-position="left">订单信息</el-divider>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="订单号:">{{viewData.orderId}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="总金额:">{{viewData.orderAmount}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="支付状态:">{{mapAlias.order.pay_state[viewData.payState]}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="发货状态:">{{mapAlias.order.ship_state[viewData.shipState]}}
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="订单状态:">{{mapAlias.order.state[viewData.state]}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="已支付金额:">{{viewData.payed}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="支付方式:">{{mapAlias.payment_type[viewData.paymentCode]}}
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="配送方式:">{{viewData.logiName}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="发票类型:">{{mapAlias.order.tax_type[viewData.taxType]}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="发票内容:">{{viewData.taxContent}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="税号:">{{viewData.taxCode}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="发票抬头:">{{viewData.taxTitle}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="订单优惠金额:">{{viewData.orderPmt}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="商品优惠金额:">{{viewData.goodsPmt}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="优惠券优惠:">{{viewData.couponPmt}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="积分优惠:">{{viewData.pointMoney}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="商品总重量:">{{viewData.weight}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="商品总价:">{{viewData.goodsAmount}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="下单来源:">{{mapAlias.order.source[viewData.source]}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="时间:">{{viewData.createdAt}}</el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="配送费用:">{{viewData.costFreight}}</el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="收货状态:">{{mapAlias.order.confirm[viewData.confirm]}}</el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="group-container">
                        <el-divider content-position="left">收货人信息</el-divider>
                        <template v-if="viewData.store">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="自提店铺名:">{{viewData.store.storeName}}</el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="联系人:">{{viewData.store.linkman}}</el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="店铺地址:">{{viewData.store.allAddress}}</el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="店铺联系电话:">{{viewData.store.mobile}}</el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="提货人姓名:">{{viewData.store.shipName}}</el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="提货人电话:">{{viewData.store.shipMobile}}</el-form-item>
                                </el-col>
                            </el-row>
                        </template>
                        <template v-else>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="收货时间:">{{viewData.confirmTime}}</el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="收货人姓名:">{{viewData.shipName}}</el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="收货人电话:">{{viewData.shipMobile}}</el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="收货地址:">{{viewData.shipAddress}}</el-form-item>
                                </el-col>
                            </el-row>
                        </template>
                    </div>
                    <div class="group-container">
                        <el-divider content-position="left">买家备注</el-divider>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="买家备注:">{{viewData.memo}}</el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品信息" name="goodsInfo">
                <el-table :data="viewData.orderItems" :size="miniSize" stripe style="width: 100%">
                    <el-table-column label="商品名称" min-width="180" prop="name" show-overflow-tooltip></el-table-column>
                    <el-table-column label="单价" min-width="80" prop="price"></el-table-column>
                    <el-table-column label="数量" min-width="80" prop="num"></el-table-column>
                    <el-table-column label="总价" min-width="80" prop="amount"></el-table-column>
                    <el-table-column label="货品编码" min-width="130" prop="sn"></el-table-column>
                    <el-table-column label="商品编码" min-width="110" prop="bn"></el-table-column>
                    <el-table-column label="总重量" min-width="80" prop="weight"></el-table-column>
                    <el-table-column label="发货量" min-width="80" prop="sendNum"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="支付单/退款单" name="payRefundItem">
                <el-divider content-position="left">支付单</el-divider>
                <el-table :data="viewData.billPayments" :size="miniSize" stripe style="width: 100%">
                    <el-table-column label="支付单号" min-width="90" prop="paymentId"></el-table-column>
                    <el-table-column
                        :formatter="(row, column)=>{return env.columnFormatter(row[column.property], 'payment_type')}"
                        label="支付方式" min-width="80" prop="paymentCode"></el-table-column>
                    <el-table-column label="第三方支付单号" min-width="80" prop="tradeNo"></el-table-column>
                    <el-table-column label="支付金额" min-width="80" prop="money"></el-table-column>
                    <el-table-column
                        :formatter="(row, column)=>{return env.columnFormatter(row[column.property], 'bill_payment', column.property)}"
                        align="center" label="支付状态" min-width="80" prop="state"></el-table-column>
                    <el-table-column label="支付时间" min-width="120" prop="createdAt"></el-table-column>
                </el-table>
                <el-divider content-position="left">退款单</el-divider>
                <el-table :data="viewData.billRefunds" :size="miniSize" stripe style="width: 100%">
                    <el-table-column label="退款单号" min-width="90" prop="refundId"></el-table-column>
                    <el-table-column
                        :formatter="(row, column)=>{return env.columnFormatter(row[column.property], 'payment_type')}"
                        label="退款方式" min-width="80" prop="paymentCode"></el-table-column>
                    <el-table-column label="第三方支付单号" min-width="100" prop="tradeNo"></el-table-column>
                    <el-table-column label="退款金额" min-width="80" prop="money"></el-table-column>
                    <el-table-column
                        :formatter="(row, column)=>{return env.columnFormatter(row[column.property], 'bill_refund', column.property)}"
                        label="退款状态" min-width="80" prop="state"></el-table-column>
                    <el-table-column label="申请时间" min-width="120" prop="createdAt"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="发货单/退货单" name="deliveryRefundItem">
                <el-divider content-position="left">发货单</el-divider>
                <el-table :data="viewData.billDeliveries" :size="miniSize" stripe style="width: 100%">
                    <el-table-column label="发货单号" min-width="90" prop="deliveryId"></el-table-column>
                    <el-table-column label="快递公司" min-width="80" prop="logiCodeName"></el-table-column>
                    <el-table-column label="快递单号" min-width="90" prop="logiNo"></el-table-column>
                    <el-table-column label="收货人名" min-width="80" prop="shipName"></el-table-column>
                    <el-table-column label="收货电话" min-width="80" prop="shipMobile"></el-table-column>
                    <el-table-column label="收货地址" min-width="180" prop="shipAddress"></el-table-column>
                </el-table>
                <el-divider content-position="left">提货单</el-divider>
                <el-table :data="viewData.billLadings" :size="miniSize" stripe style="width: 100%">
                    <el-table-column label="提货单号" min-width="90" prop="id"></el-table-column>
                    <el-table-column label="提货门店" min-width="120" prop="storeIdName"></el-table-column>
                    <el-table-column label="提货人姓名" min-width="100" prop="name"></el-table-column>
                    <el-table-column label="提货电话" min-width="100" prop="mobile"></el-table-column>
                    <el-table-column label="提货状态" min-width="80" prop="state"></el-table-column>
                    <el-table-column label="提货时间" min-width="120" prop="updatedAt"></el-table-column>
                    <el-table-column label="接待店员" min-width="100" prop="clerkIdName"></el-table-column>
                </el-table>
                <el-divider content-position="left">退货单</el-divider>
                <el-table :data="viewData.billReships" :size="miniSize" stripe style="width: 100%">
                    <el-table-column label="退货单号" min-width="90" prop="reshipId"></el-table-column>
                    <el-table-column label="快递公司" min-width="110" prop="logiCodeName"></el-table-column>
                    <el-table-column label="快递单号" min-width="90" prop="logiNo"></el-table-column>
                    <el-table-column label="退货状态" min-width="80" prop="state"></el-table-column>
                    <el-table-column label="退货时间" min-width="120" prop="updatedAt"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="订单记录" name="orderRecord">
                <el-table :data="viewData.orderLogs" :size="miniSize" stripe style="width: 100%">
                    <el-table-column label="订单号" min-width="90" prop="orderId"></el-table-column>
                    <el-table-column
                        :formatter="(row, column)=>{ return env.columnFormatter(row[column.property], 'order_log', column.property)}"
                        label="操作类型" min-width="80" prop="type"></el-table-column>
                    <el-table-column label="描述" min-width="280" prop="msg"></el-table-column>
                    <el-table-column :formatter="(row,column)=>{return env.formatDateTime(row[column.property])}"
                        label="时间" min-width="110" prop="createdAt"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="订单备注" name="orderRemark">
                <el-form :model="formData" :rules="formDataRules" :size="normalSize" label-width="80px" ref="formData">
                    <el-form-item label="备注内容" prop="mark">
                        <el-input :autosize="{ minRows: 8, maxRows: 16}" :rows="8" placeholder="请输入内容" type="textarea"
                            v-model="formData.mark"></el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer">
                    <el-button :size="miniSize" @click.native="$emit('update:visible', false)" round>
                        {{$t('action.cancel')}}</el-button>
                    <el-button :loading="loading" :size="miniSize" @click.native="submitForm" round type="primary">
                        {{$t('action.submit')}}</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'OrderDetailDialog',
    components: {},
    props: {
        orderId: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState(['mapAlias'])
    },
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',

            loading: false,

            activeName: 'basicInfo',
            // 界面显示数据
            viewData: {
                orderId: '', // 订单号
                orderAmount: '', // 总金额
                payState: '', // 支付状态
                shipState: '', // 发货状态
                state: '', // 订单状态
                payed: '', // 已支付金额
                paymentCode: '', // 支付方式
                logiName: '', // 配送方式
                taxType: '', // 发票类型
                taxContent: '', // 发票内容
                taxCode: '', // 税号
                taxTitle: '', // 发票抬头
                orderPmt: '', // 订单优惠金额
                goodsPmt: '', // 商品优惠金额

                couponPmt: '', // 优惠券优惠
                pointMoney: '', // 积分优惠
                weight: '', // 商品总重量
                goodsAmount: '', // 商品总价
                source: '', // 下单来源
                createdAt: '', // 时间

                costFreight: '', // 配送费用
                confirm: '', // 收货状态
                store: {
                    storeName: '', // 自提店铺名
                    linkman: '', // 联系人
                    allAddress: '', // 店铺地址
                    mobile: '', // 店铺联系电话
                    shipName: '', // 提货人姓名
                    shipMobile: '' // 提货人电话
                },
                confirmTime: '', // 收货时间
                shipName: '', // 收货人姓名

                shipMobile: '', // 收货人电话
                shipAddress: '', // 收货地址
                memo: '', // 买家备注

                orderItems: [], // 商品信息
                billPayments: [], // 支付单
                billRefunds: [], // 退款单
                billDeliveries: [], // 发货单
                billLadings: [], // 提货单
                billReships: [], // 退货单
                orderLogs: [] // 订单记录
            },
            // 编辑数据
            formData: {
                id: 0,
                mark: '' // 备注内容
            },
            formDataRules: {
                mark: [
                    { required: true, message: '请输入备注内容', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        openDialog () {
            this.$nextTick(async () => {
                // 基于 orderId  向服务器请求 订单明细数据
                if (this.orderId) {
                    await this.getOrderDetail(this.orderId)
                }
            })
        },
        async getOrderDetail (orderId) {
            const _result = await this.$api.order.get({ orderId })
            if (_result.succeed === 1 && _result.code === 200) {
                Object.assign(this.viewData, _result.data)
                Object.assign(this.formData, _.pick(_result.data, ['id', 'mark']))
            }
        },
        // 编辑
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.loading = true
                        const data = Object.assign({}, this.formData)
                        const _result = await this.$api.order.save(data)
                        this.loading = false
                        if (_result.succeed === 1 && _result.code === 200) {
                            this.$notify({
                                title: '成功',
                                message: _result.description,
                                type: 'success'
                            })
                            this.$refs.formData.resetFields()
                            this.$emit('update:visible', false)
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: _result.description
                            })
                        }
                    })
                }
            })
        }
    },
    async mounted () { }
}
</script>

<style scoped lang="scss">
.dialog-footer {
    float: right;
}
</style>
