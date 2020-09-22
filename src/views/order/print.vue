<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-09-29 09:24:31
-->
<template>
    <div class="print-container">
        <template v-if="type=='shopping'">
            <table class="header">
                <tr>
                    <td class="title">
                        <h3>{{shopName}}购物清单</h3>
                    </td>
                </tr>
                <tr>
                    <td class="summary">客户：{{printData.shipName}}，地址：{{printData.shipAreaName}} -
                        {{printData.shipAddress}}，电话：{{printData.shipMobile}}</td>
                </tr>
            </table>
            <table class="items-container">
                <colgroup>
                    <col width="50%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th class="text-left" colspan="2">
                            <b>订单号：{{printData.orderId}}</b>
                        </th>
                        <th class="text-right" colspan="4">
                            <b>订购日期：{{printData.createdAt}}</b>
                        </th>
                    </tr>
                    <tr>
                        <th>商品名称</th>
                        <th>货号</th>
                        <th>单价</th>
                        <th>重量</th>
                        <th>数量</th>
                        <th>小计</th>
                    </tr>
                    <tr :key="idx" v-for="(item,idx) in printData.orderItems">
                        <td>{{item.name}}</td>
                        <td>{{item.bn}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.weight*item.num}}g</td>
                        <td>{{item.num}}</td>
                        <td>{{item.amount}}</td>
                    </tr>
                </tbody>
            </table>
            <table class="footer-total">
                <tr>
                    <td>商品总价：￥{{printData.goodsAmount}}</td>
                </tr>
                <tr>
                    <td>订单优惠：￥{{printData.orderPmt}}</td>
                </tr>
                <tr>
                    <td>运费价格：￥{{printData.costFreight}}</td>
                </tr>
                <tr>
                    <td>订单价格：￥{{printData.orderAmount}}</td>
                </tr>
                <tr>
                    <td class="text-left">订单附言：{{printData.memo}}</td>
                </tr>
            </table>
            <table class="footer-summary">
                <tr>
                    <td class="text-left">商家：{{shopName}}</td>
                    <td class="text-left">手机：{{shopMobile}}</td>
                </tr>
            </table>
        </template>
        <template v-else-if="type=='distribution'">
            <table class="header">
                <colgroup>
                    <col width="40%" />
                    <col width="45%" />
                    <col width="15%" />
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            <p>订单号:{{printData.orderId}}</p>
                            <p>日期:{{printData.createdAt}}</p>
                        </td>
                        <td class="title">
                            <h3>配货清单</h3>
                        </td>
                        <td class="text-right">
                            <p>客户:{{printData.user.nickname}}</p>

                            <p>电话:{{printData.user.mobile}}</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table class="items-container">
                <colgroup>
                    <col width="50%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>商品名称</th>
                        <th>货号</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>小计</th>
                    </tr>
                    <tr :key="idx" v-for="(item,idx) in printData.orderItems">
                        <td>{{item.name}}</td>
                        <td>{{item.bn}}</td>
                        <td>￥{{item.price}}</td>
                        <td>{{item.num}}</td>
                        <td>￥{{item.amount}}</td>
                    </tr>
                </tbody>
            </table>

            <table class="footer-summary">
                <colgroup>
                    <col width="50%" />
                    <col width="50%" />
                </colgroup>
                <tr>
                    <td class="text-left">订单附言： {{printData.memo}}</td>
                    <td class="text-left">配送： {{printData.logisticsName}}</td>
                </tr>
                <tr>
                    <td class="text-left">地址：{{printData.shipAreaName}} - {{printData.shipAddress}}</td>
                    <td class="text-left">收货人：{{printData.shipName}}</td>
                </tr>
                <tr>
                    <td class="text-left">手机：{{printData.shipMobile}}</td>
                    <td class="text-left">订单备注：{{printData.mark}}</td>
                </tr>
            </table>

            <table class="table table-condensed">
                <tr>
                    <td>
                        <h4>
                            <strong>签字：</strong>
                        </h4>
                    </td>
                </tr>
            </table>
        </template>
        <template v-else-if="type=='union'">
            <table class="header">
                <tr>
                    <td class="title">
                        <h3>{{shopName}}购物清单</h3>
                    </td>
                </tr>
                <tr>
                    <td class="text-left">客户：{{printData.shipName}}，地址：{{printData.shipAreaName}} -
                        {{printData.shipAddress}}，电话：{{printData.shipMobile}}</td>
                </tr>
            </table>
            <table class="items-container">
                <colgroup>
                    <col width="50%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th class="text-left" colspan="2">
                            <b>订单号：{{printData.orderId}}</b>
                        </th>
                        <th class="text-right" colspan="4">
                            <b>订购日期：{{printData.createdAt}}</b>
                        </th>
                    </tr>
                    <tr>
                        <th>商品名称</th>
                        <th>货号</th>
                        <th>单价</th>
                        <th>重量</th>
                        <th>数量</th>
                        <th>小计</th>
                    </tr>
                    <tr :key="idx" v-for="(item,idx) in printData.orderItems">
                        <td>{{item.name}}</td>
                        <td>{{item.bn}}</td>
                        <td>￥{{item.price}}</td>
                        <td>{{item.weight*item.num}}g</td>
                        <td>{{item.num}}</td>
                        <td>￥{{item.amount}}</td>
                    </tr>
                </tbody>
            </table>
            <table class="footer-total">
                <tr>
                    <td>商品总价：￥{{printData.goodsAmount}}</td>
                </tr>
                <tr>
                    <td>订单优惠：￥{{printData.orderPmt}}</td>
                </tr>
                <tr>
                    <td>运费价格：￥{{printData.costFreight}}</td>
                </tr>
                <tr>
                    <td>订单价格：￥{{printData.orderAmount}}</td>
                </tr>
                <tr>
                    <td align="left">订单附言：{{printData.memo}}</td>
                </tr>
            </table>

            <table class="footer-summary">
                <tr>
                    <td>商家：{{shopName}}</td>
                    <td>手机：{{shopMobile}}</td>
                </tr>
            </table>
            <br />
            <br />
            <br />
            <!--配货清单-->
            <table class="items-container">
                <colgroup>
                    <col width="40%" />
                    <col width="20%" />
                    <col width="40%" />
                </colgroup>
                <tbody>
                    <tr>
                        <td>
                            <p>订单号:{{printData.orderId}}</p>
                            <p>日期:{{printData.createdAt}}</p>
                        </td>
                        <td class="title">
                            <h3>配货清单</h3>
                        </td>
                        <td class="text-right">
                            <p>客户:{{printData.user.nickname}}</p>
                            <p>电话:{{printData.user.mobile}}</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table class="items-container">
                <colgroup>
                    <col width="50%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th>商品名称</th>
                        <th>货号</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>小计</th>
                    </tr>
                    <tr :key="idx" v-for="(item,idx) in printData.orderItems">
                        <td>{{item.name}}</td>
                        <td>{{item.bn}}</td>
                        <td>￥{{item.price}}</td>
                        <td>{{item.num}}</td>
                        <td>￥{{item.amount}}</td>
                    </tr>
                </tbody>
            </table>
            <table class="items-container">
                <colgroup>
                    <col width="50%" />
                    <col width="50%" />
                </colgroup>
                <tr>
                    <td>订单附言： {{printData.memo}}</td>
                    <td>配送： {{printData.logistics}}</td>
                </tr>
                <tr>
                    <td>地址：{{printData.shipAreaName}} - {{printData.shipAddress}}</td>
                    <td>收货人：{{printData.shipName}}</td>
                </tr>
                <tr>
                    <td>手机：{{printData.shipMobile}}</td>
                    <td>订单备注：{{printData.mark}}</td>
                </tr>
            </table>
            <!--配货清单-->
        </template>

        <div class="print-footer">
            <el-button :loading="loading" :size="miniSize" @click.native="window.print()" round type="primary">
                {{$t('action.print')}}</el-button>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    components: {},
    computed: {

    },
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',

            loading: false,

            // 全局变量
            shopName: '', // 商家名称
            shopMobile: '', // 商家电话

            // 编辑界面数据
            printData: {
                id: 0,
                orderId: '', // 订单号
                goodsAmount: 0, // 商品总价
                payed: 0, // 已支付的金额
                orderAmount: 0, // 订单实际销售总额
                payStatus: 1, // 支付状态 1:未付款 2:已付款 3:部分付款 4:部分退款 5:已退款
                shipStatus: 1, // 发货状态 1:未发货 2:部分发货 3:已发货 4:部分退货 5:已退货
                status: 1, // 订单状态 1:正常 2:完成 3:取消
                orderType: 1, // 订单类型 1:是普通订单 2:是拼团订单
                paymentCode: '', // 支付方式代码
                paymentTime: null, // 支付时间
                logisticsId: 0, // 配送方式id
                logisticsName: '', // 配送方式名称
                costFreight: 0, // 配送费用
                userId: 0, // 用户id
                user: {

                }, // 用户信息
                sellerId: 0, // 店铺id
                confirm: 1, // 售后状态 1:未确认收货 2:已确认收货
                confirmTime: null, // 确认收货时间
                storeId: 0, // 自提门店id 0:就是不门店自提
                shipAreaId: 0, // 收货地区id
                shipDddress: '', // 收货详细地址
                shipName: '', // 收货人姓名
                shipMobile: '', // 收货电话
                weight: 0, // 商品总重量
                taxType: 1, // 是否开发票 1:不发票 2:个人发票 3:公司发票
                taxContent: '', // 商品详情 发票内容
                taxCode: '', // 税号
                taxTitle: '', // 发票抬头
                point: 0, // 使用积分
                pointMoney: 0, // 积分抵扣金额
                orderPmt: 0, // 订单优惠金额
                goodsPmt: 0, // 商品优惠金额
                couponPmt: 0, // 优惠券优惠额度
                coupon: '', // 优惠券信息
                promotionList: '', // 优惠信息
                memo: '', // 买家备注
                ip: '', // 下单IP
                mark: '', // 卖家备注
                source: 2, // 订单来源 1:PC页面 2:H5页面 3:微信小程序
                isComment: 1, // 是否评论，1:未评论 2:已评论

                orderItems: [] // 商品信息
            },

            orderId: '',
            type: 'shopping'
        }
    },
    // 监听,当路由发生变化的时候执行
    watch: {
        $route: {
            handler (to, from) {
                this.type = to.query.type
                this.orderId = to.query.orderId
                // 更新路由中的 path 参数
                if (to && to.query && this.$router && this.$router.options && this.$router.options.routes[0] && Array.isArray(this.$router.options.routes[0].children)) {
                    const _route = this.$router.options.routes[0].children.find(v => v.name === to.name)
                    Object.assign(_route, _.pick(to, ['path', 'query']))
                }
            },
            deep: true,
            immediate: true
        },
        orderId: {
            handler (val, oldval) {
                this.getOrderDetail()
            },
            immediate: true
            // 进入立即执行一次
        }
    },
    methods: {
        async getOrderDetail () {
            const _result = await this.$api.order.get({ orderId: this.orderId })
            if (_result.succeed === 1 && _result.code === 200) {
                Object.assign(this.printData, _result.data)
            }
        }
    },
    async mounted () { }
}
</script>

<style scoped lang="scss">
.print-container {
    font-size: 13px;
    text-align: left;
    .header {
        width: 98%;
        .title {
            text-align: center;
        }
        summary {
            font-weight: 700;
        }
        td {
            padding: 8px;
            border-bottom: 1px solid #e4e7ed;
        }
    }

    .items-container {
        width: 98%;
        td,
        th {
            padding: 8px;
            border-bottom: 1px solid #e4e7ed;
        }
        .text-left {
            text-align: left;
        }
        .text-right {
            text-align: right;
        }
    }
    .footer-total,
    .footer-summary {
        width: 98%;
        td {
            font-weight: 500;
            padding: 8px;
            border-bottom: 1px solid #e4e7ed;
            text-align: right;
        }
        .text-left {
            text-align: left;
        }
        .text-right {
            text-align: right;
        }
    }
    .print-footer {
        margin: 10px 20px;
        float: right;
    }
}
</style>
