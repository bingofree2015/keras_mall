<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-01 08:52:27
-->
<template>
    <div class="page-container">
        <!--导航-->
        <el-row>
            <el-col :span="10">
                <bread-crumb></bread-crumb>
            </el-col>
        </el-row>
        <!--表单-->
        <el-form :model="formData" :rules="formDataRules" :size="normalSize" class="edit-dialog-container"
            label-width="150px" ref="formData">
            <el-row>
                <el-col :span="18">
                    <el-tabs v-model="activeName">
                        <el-tab-pane label="平台设置" name="platform">
                            <span slot="label">
                                <i class="el-icon-ali-platform-setting"></i> 平台设置
                            </span>
                            <el-form-item label="平台名称" prop="shopName">
                                <el-col :span="8">
                                    <el-input placeholder="请输入平台名称" v-model="formData.shopName"></el-input>
                                </el-col>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 平台名称会显示到前台，请合理输入此名称
                                </span>
                            </el-form-item>
                            <el-form-item label="平台描述" prop="shopDesc">
                                <el-col :span="16">
                                    <el-input :rows="2" placeholder="请输入平台描述" type="textarea"
                                        v-model="formData.shopDesc"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="备案信息" prop="shopFiling">
                                <el-col :span="16">
                                    <el-input :rows="2" placeholder="请输入备案信息" type="textarea"
                                        v-model="formData.shopFiling"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="联系手机号" prop="shopMobile">
                                <el-col :span="8">
                                    <el-input placeholder="请输入联系手机号" v-model="formData.shopMobile"></el-input>
                                </el-col>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 前台下单时发送短信通知
                                </span>
                            </el-form-item>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="平台logo" prop="shopLogo">
                                        <change-image-icon :imgUrl="formData.shopLogo"
                                            @chosedImageIcon="chosedShopLogo"></change-image-icon>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="默认图" prop="shopDefaultImage">
                                        <change-image-icon :imgUrl="formData.shopDefaultImage"
                                            @chosedImageIcon="chosedShopDefaultImage"></change-image-icon>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="自提" prop="selfService">
                                        <el-switch active-text="开启" inactive-text="关闭" v-model="formData.selfService">
                                        </el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="发票" prop="invoicesNeed">
                                        <el-switch active-text="开启" inactive-text="关闭" v-model="formData.invoicesNeed">
                                        </el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="搜索发现关键词" prop="searchKeywords">
                                <el-input placeholder="请输入搜索发现关键词" v-model="formData.searchKeywords"></el-input>
                            </el-form-item>
                            <el-form-item label="分类样式" prop="cateStyle">
                                <el-radio-group v-model="formData.cateStyle">
                                    <el-radio :label="0">
                                        一级大图
                                        <el-card class="card-item">
                                            <el-image :src="env.getImgUrl('template/style-1.png',env.baseAssetsUrl)">
                                                <div slot="error">
                                                    <i class="el-icon-ali-tupianshibai"></i>
                                                </div>
                                            </el-image>
                                            <div class="summary">尺寸建议：350px*150px</div>
                                        </el-card>
                                    </el-radio>
                                    <el-radio :label="1">
                                        一级小图
                                        <el-card class="card-item">
                                            <el-image :src="env.getImgUrl('template/style-2.png',env.baseAssetsUrl)">
                                                <div slot="error">
                                                    <i class="el-icon-ali-tupianshibai"></i>
                                                </div>
                                            </el-image>
                                            <div class="summary">尺寸建议：105px*105px</div>
                                        </el-card>
                                    </el-radio>
                                    <el-radio :label="2">
                                        二级小图
                                        <el-card class="card-item">
                                            <el-image :src="env.getImgUrl('template/style-3.png',env.baseAssetsUrl)">
                                                <div slot="error">
                                                    <i class="el-icon-ali-tupianshibai"></i>
                                                </div>
                                            </el-image>
                                            <div class="summary">尺寸建议：60px*60px</div>
                                        </el-card>
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="H5分类样式" prop="cateType">
                                <el-radio-group style="width:100%" v-model="formData.cateType">
                                    <el-radio :label="0">
                                        类型一
                                        <el-card class="card-item">
                                            <el-image :src="env.getImgUrl('template/h5-style-1.png',env.baseAssetsUrl)">
                                                <div slot="error">
                                                    <i class="el-icon-ali-tupianshibai"></i>
                                                </div>
                                            </el-image>
                                            <div class="summary">此设置只在H5端有效</div>
                                        </el-card>
                                    </el-radio>

                                    <el-radio :label="1">
                                        类型二
                                        <el-card class="card-item">
                                            <el-image :src="env.getImgUrl('template/h5-style-2.png',env.baseAssetsUrl)">
                                                <div slot="error">
                                                    <i class="el-icon-ali-tupianshibai"></i>
                                                </div>
                                            </el-image>
                                            <div class="summary">此功能只在 "分类样式" 为 "二级小图" 的时候生效,小程序请忽略</div>
                                        </el-card>
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="商品设置" name="goods">
                            <span slot="label">
                                <i class="el-icon-ali-shangpin-copy"></i> 商品设置
                            </span>
                            <el-form-item label="库存警报数量" prop="goodsStocksWarn">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入库存警报数量"
                                    v-model="formData.goodsStocksWarn"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 商品中只要有货品库存低于报警数量，就会在后台提示
                                </span>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="订单设置" name="order">
                            <span slot="label">
                                <i class="el-icon-ali-dd"></i> 订单设置
                            </span>
                            <el-form-item label="取消时间" prop="orderCancelTime">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入订单取消时间"
                                    v-model="formData.orderCancelTime"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 未付款订单取消的时间间隔，单位为 天
                                </span>
                            </el-form-item>
                            <el-form-item label="完成时间" prop="orderCompleteTime">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入订单完成时间"
                                    v-model="formData.orderCompleteTime"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 已付款的订单完成的时间间隔，单位为 天
                                </span>
                            </el-form-item>
                            <el-form-item label="确认收货时间" prop="orderAutoSignTime">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入订单确认收货时间"
                                    v-model="formData.orderAutoSignTime"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 发货后的订单自动确认收货时间,单位为 天
                                </span>
                            </el-form-item>
                            <el-form-item label="自动评价时间" prop="orderAutoEvalTime">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入订单自动评价时间"
                                    v-model="formData.orderAutoEvalTime"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 确认收货后的订单自动评价时间间隔,单位为 天
                                </span>
                            </el-form-item>
                            <el-form-item label="提醒付款时间" prop="reminderPaymentTime">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入订单提醒付款时间"
                                    v-model="formData.reminderPaymentTime"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 订单催付款时间,单位为 小时
                                </span>
                            </el-form-item>
                            <el-form-item label="退货联系人" prop="returnContact">
                                <el-col :span="8">
                                    <el-input placeholder="请输入退货联系人" v-model="formData.returnContact"></el-input>
                                </el-col>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 用户退货时的收货人姓名
                                </span>
                            </el-form-item>
                            <el-form-item label="退货联系方式" prop="returnContactInformation">
                                <el-col :span="8">
                                    <el-input placeholder="请输入退货联系方式" v-model="formData.returnContactInformation">
                                    </el-input>
                                </el-col>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 用户退货时的收货人联系方式
                                </span>
                            </el-form-item>
                            <el-form-item label="退货区域" prop="returnAreaId">
                                <el-cascader :options="areaList" :props="cascaderProps" :show-all-levels="false"
                                    v-model="formData.returnAreaId"></el-cascader>
                            </el-form-item>
                            <el-form-item label="退货详细地址" prop="returnAddress">
                                <el-col :span="18">
                                    <el-input placeholder="请输入退货详细地址" v-model="formData.returnAddress">
                                        <el-button @click="changePosition" icon="el-icon-ali-dakai" slot="append">
                                        </el-button>
                                    </el-input>
                                </el-col>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 用户退货时的收货人联系方式
                                </span>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="积分设置" name="point">
                            <span slot="label">
                                <i class="el-icon-ali-jifen1"></i> 积分设置
                            </span>
                            <el-form-item label="开启积分功能" prop="openPoint">
                                <el-switch active-text="开启" inactive-text="关闭" v-model="formData.openPoint"></el-switch>
                            </el-form-item>
                            <el-form-item label="订单积分折现比例" prop="pointDiscountedProportion">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入订单积分折现比例"
                                    v-model="formData.pointDiscountedProportion"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 未付款订单取消的时间间隔，单位为 天
                                </span>
                            </el-form-item>
                            <el-form-item label="订单积分使用比例" prop="orderPointProportion">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入订单积分使用比例"
                                    v-model="formData.orderPointProportion"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 未付款订单取消的时间间隔，单位为 天
                                </span>
                            </el-form-item>
                            <el-form-item label="订单积分奖励比例" prop="orderRewardProportion">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入订单积分奖励比例"
                                    v-model="formData.orderRewardProportion"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 未付款订单取消的时间间隔，单位为 天
                                </span>
                            </el-form-item>
                            <el-form-item label="签到奖励类型" prop="signPointType">
                                <el-radio-group v-model="formData.signPointType">
                                    <el-radio :label="1">固定奖励</el-radio>
                                    <el-radio :label="2">随机奖励</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <div v-if="formData.signPointType== 1">
                                <el-form-item label="首次奖励积分" prop="firstSignPoint">
                                    <el-input-number :max="10" :min="1" controls-position="right"
                                        placeholder="请输入首次奖励积分" v-model="formData.firstSignPoint"></el-input-number>
                                    <span class="tip-info">
                                        <i class="el-icon-ali-tishi"></i> 起始签到奖励积分
                                    </span>
                                </el-form-item>
                                <el-form-item label="连续签到追加" prop="continuitySignAdditional">
                                    <el-input-number :max="10" :min="1" controls-position="right"
                                        placeholder="请输入连续签到追加" v-model="formData.continuitySignAdditional">
                                    </el-input-number>
                                    <span class="tip-info">
                                        <i class="el-icon-ali-tishi"></i> 连续签到追加积分
                                    </span>
                                </el-form-item>
                                <el-form-item label="单日最大奖励" prop="dailySignMaxPoint">
                                    <el-input-number :max="10" :min="1" controls-position="right"
                                        placeholder="请输入单日最大奖励" v-model="formData.dailySignMaxPoint"></el-input-number>
                                    <span class="tip-info">
                                        <i class="el-icon-ali-tishi"></i> 连续签到奖励积分单日上限
                                    </span>
                                </el-form-item>
                            </div>
                            <div v-else-if="formData.signPointType== 2">
                                <el-form-item label="随机奖励积分最小值" prop="signMinRandomPoint">
                                    <el-input-number :max="10" :min="1" controls-position="right"
                                        placeholder="请输入随机奖励积分最小值" v-model="formData.signMinRandomPoint">
                                    </el-input-number>
                                    <span class="tip-info">
                                        <i class="el-icon-ali-tishi"></i> 签到随机最小奖励积分
                                    </span>
                                </el-form-item>
                                <el-form-item label="随机奖励积分最大值" prop="signMaxRandomPoint">
                                    <el-input-number :max="10" :min="1" controls-position="right"
                                        placeholder="请输入随机奖励积分最大值" v-model="formData.signMaxRandomPoint">
                                    </el-input-number>
                                    <span class="tip-info">
                                        <i class="el-icon-ali-tishi"></i> 签到随机最大奖励积分
                                    </span>
                                </el-form-item>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="提现设置" name="cash">
                            <span slot="label">
                                <i class="el-icon-ali-tixian-copy"></i> 提现设置
                            </span>
                            <el-form-item label="最低提现金额" prop="toCashLowMoney">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入最低提现金额"
                                    v-model="formData.tocashLowMoney"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 最低提现标准，默认0不限制
                                </span>
                            </el-form-item>
                            <el-form-item label="提现服务费率" prop="toCashRateMoney">
                                <el-input-number :max="10" :min="1" controls-position="right" label="请输入提现服务费率"
                                    v-model="formData.tocashRateMoney"></el-input-number>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 提现费率，默认0% 没有费率
                                </span>
                            </el-form-item>
                        </el-tab-pane>
                        <el-tab-pane label="其他设置" name="other">
                            <span slot="label">
                                <i class="el-icon-ali-qita"></i> 其他设置
                            </span>
                            <el-divider content-position="left">腾讯地图</el-divider>
                            <el-form-item label="腾讯地图key" prop="qqMapKey">
                                <el-col :span="12">
                                    <el-input placeholder="请输入腾讯地图key" v-model="formData.qqMapKey"></el-input>
                                </el-col>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 腾讯地图key，申请地址：https://lbs.qq.com/
                                </span>
                            </el-form-item>
                            <el-divider content-position="left">快递100</el-divider>
                            <el-form-item label="公司编号" prop="kuaidi100CorpCode">
                                <el-col :span="8">
                                    <el-input placeholder="请输入公司编号" v-model="formData.kuaidi100CorpCode"></el-input>
                                </el-col>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 快递100公司编码，申请地址：https://www.kuaidi100.com
                                </span>
                            </el-form-item>
                            <el-form-item label="授权key" prop="kuaidi100Key">
                                <el-col :span="8">
                                    <el-input placeholder="请输入授权key" v-model="formData.kuaidi100Key"></el-input>
                                </el-col>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i> 快递100授权key，申请地址：https://www.kuaidi100.com
                                </span>
                            </el-form-item>
                            <el-divider content-position="left">图片存储</el-divider>

                            <el-form-item label="图片存储引擎" prop="imageStorageType">
                                <el-radio-group v-model="formData.imageStorageType">
                                    <el-radio label="local">本地</el-radio>
                                    <el-radio label="aliyun">阿里云OSS</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <div v-if="formData.imageStorageType === 'local'">
                                <el-form-item label="绑定域名" prop="domain">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-input placeholder="请输入绑定域名" v-model="formData.domain"></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24" style="text-align:left;">
                                            <span class="tip-info">
                                                <i class="el-icon-ali-tishi"></i>
                                                图片分离时使用，使用阿里云OSS时也尽量绑定域名，例如：https://image.couponmall.com
                                            </span>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </div>
                            <div v-else-if="formData.imageStorageType === 'aliyun'">
                                <el-form-item label="绑定域名" prop="domain">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-input placeholder="请输入绑定域名" v-model="formData.domain"></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24" style="text-align:left;">
                                            <span class="tip-info">
                                                <i class="el-icon-ali-tishi"></i>
                                                图片分离时使用，使用阿里云OSS时也尽量绑定域名，例如：https://image.couponmall.com
                                            </span>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="AccessKeyId" prop="accessKeyId">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-input placeholder="请输入AccessKeyId" v-model="formData.accessKeyId">
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24" style="text-align:left;">
                                            <span class="tip-info">
                                                <i class="el-icon-ali-tishi"></i>
                                                阿里云AccessKeyId，申请地址：阿里云用户AccessKey控制台地址：https://usercenter.console.aliyun.com/#/manage/ak
                                            </span>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="AccessKeySecret" prop="accessKeySecret">
                                    <el-col :span="8">
                                        <el-input placeholder="请输入AccessKeySecret" v-model="formData.accessKeySecret">
                                        </el-input>
                                    </el-col>
                                    <span class="tip-info">
                                        <i class="el-icon-ali-tishi"></i> 阿里云accessKeySecret
                                    </span>
                                </el-form-item>
                                <el-form-item label="存储节点" prop="endPoint">
                                    <el-col :span="8">
                                        <el-input placeholder="请输入存储节点" v-model="formData.endPoint"></el-input>
                                    </el-col>
                                    <span class="tip-info">
                                        <i class="el-icon-ali-tishi"></i> 阿里云OSS的
                                        endpoint，例如：oss-cn-beijing.aliyuncs.com
                                    </span>
                                </el-form-item>
                                <el-form-item label="空间名称" prop="bucket">
                                    <el-col :span="8">
                                        <el-input placeholder="请输入空间名称" v-model="formData.bucket"></el-input>
                                    </el-col>
                                    <span class="tip-info">
                                        <i class="el-icon-ali-tishi"></i> 阿里云OSS的 bucket，例如：coupon-mall
                                    </span>
                                </el-form-item>
                            </div>

                            <el-divider content-position="left">统计代码</el-divider>
                            <el-form-item label="百度统计代码" prop="baiduStatisticalCode">
                                <el-input :rows="4" placeholder="请输入百度统计代码" type="textarea"
                                    v-model="formData.baiduStatisticalCode"></el-input>
                                <span class="tip-info">
                                    <i class="el-icon-ali-tishi"></i>
                                    只需要粘贴&gt;script&lt;&gt;/script&lt;内的代码，只统计H5端。微信小程序请使用"小程序数据助手"
                                </span>
                            </el-form-item>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="18" class="footer">
                    <el-button :size="miniSize" @click="resetForm('formData')" round>{{$t('action.cancel')}}</el-button>
                    <el-button :loading="editLoading" :size="miniSize" @click.native="submitForm" round type="primary">
                        {{$t('action.submit')}}</el-button>
                </el-col>
            </el-row>
        </el-form>
        <map-position @chosedLocation="chosedLocation" ref="mapPositionDialog"></map-position>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import breadCrumb from '@/components/bread_crumb'
import changeImageIcon from '@/components/change_image_icon'
import mapPosition from '@/components/map_position'
export default {
    components: {
        breadCrumb,
        changeImageIcon,
        mapPosition
    },
    data () {
        const checkPrice = (rule, value, callback) => {
            var reg = /^-?\d{1,5}(?:\.\d{1,3})?$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入大于零小于十万不超过三位小数的数字'))
            }
        }
        return {
            normalSize: 'small',
            miniSize: 'mini',
            activeName: 'platform',

            cascaderProps: {
                label: 'name',
                value: 'id',
                children: 'children'
            },
            areaList: [],

            editLoading: false,
            // 编辑界面数据
            formData: {
                shopName: '我的平台', // 平台名称
                shopDesc: '平台描述会展示在前台及微信分享店铺描述', // 平台描述
                shopAddress: '我的平台地址', // 平台地址
                shopFiling: '网站备案信息', // 备案信息
                shopLogo: '', // 平台logo
                shopFavicon: '', // Favicon图标
                shopDefaultImage: '', // 默认图
                shopMobile: '', // 联系手机号
                selfService: '2', // 开启门店自提
                cateStyle: 3, // 分类样式
                cateType: 1, // H5分类样式
                orderCancelTime: '1', // 订单取消时间
                orderCompleteTime: '30', // 订单完成时间
                orderAutoSignTime: '20', // 订单确认收货时间
                orderAutoEvalTime: '30', // 订单自动评价时间
                reminderPaymentTime: '1', // 订单提醒付款时间
                goodsStocksWarn: '10', // 库存警报数量
                returnContact: '', // 退货联系人
                returnContactInformation: '', // 退货联系方式
                returnAreaId: '', // 退货区域
                returnAddress: '', // 退货详细地址
                signPointType: 2, // 签到奖励类型
                signMinRandomPoint: 1, // 随机奖励积分最小值
                signMaxRandomPoint: 10, // 随机奖励积分最大值
                firstSignPoint: 1, // 首次奖励积分
                continuitySignAdditional: 1, // 连续签到追加
                dailySignMaxPoint: 10, // 单日最大奖励
                openPoint: 1, // 开启积分功能
                pointDiscountedProportion: 100, // 订单积分折现比例
                orderPointProportion: 10, // 订单积分使用比例
                orderRewardProportion: 1, // 订单积分奖励比例

                signAppointDateState: false, // 指定特殊日期状态
                signAppointDate: [], // 指定特殊日期
                signAppointDateType: 1, // 指定日期奖励类型
                signAppointDateRate: 2, // 指定日期倍率
                signAppointDateAdditional: 10, // 指定日期追加
                wxNickName: 'KerasMall', // 小程序名称

                // 小程序设置
                wxAppId: '', // AppId
                wxAppSecret: '', // AppSecret
                wxUserName: '', // 原始Id
                wxPrincipalName: '科技有限公司', // 主体信息
                wxSignature: '一款标准B2C商城小程序', // 简介

                // 公众号设置
                wxOfficialName: '', // 公众号名称
                wxOfficialId: '', // 微信号
                wxOfficialAppId: '', // AppId
                wxOfficialAppSecret: '', // AppSecret
                wxOfficialSourceId: '', // 公众号原始ID
                wxOfficialToken: '', // 微信验证TOKEN
                wxOfficialEncodingAESKey: '', // EncodingAESKey
                wxOfficialType: 'service', // 公众号类型

                // 提现设置
                toCashLowMoney: '0', // 最低提现金额
                toCashRateMoney: '0', // 提现服务费率

                // 其他设置
                qqMapKey: '', // 腾讯地图key
                kuaidi100CorpCode: '', // 公司编号
                kuaidi100Key: '', // 授权key
                imageStorageType: 'local', // 图片存储引擎
                imageStorageParams: '', // 图片存储配置参数

                // 搜索发现关键字
                searchKeywords: '羽绒服 iphone 小米mix', // 搜索发现关键词

                // 统计代码
                baiduStatisticalCode: '', // 百度统计代码

                // 发票开关
                invoicesNeed: 1, // 发票功能

                // APP设置
                wxAppAppId: '' // 微信APP支付appid
            },
            formDataRules: {
                shopName: [
                    { required: true, message: '请输入平台名称', trigger: 'blur' }
                ],
                goodsStocksWarn: [
                    { required: true, message: '请输入库存警报数量', trigger: 'blur' },
                    { validator: checkPrice, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        /**
             * 地区列表
             */
        async getAreaList () {
            const _result = await this.$api.area.getTree()
            if (_result.succeed === 1 && _result.code === 200) {
                this.areaList = _result.data.list
            }
        },
        changePosition () {
            this.$refs.mapPositionDialog.setMapDialogVisible(true)
        },
        chosedLocation (position) {
            this.formData.returnAddress = position.address
            this.$refs.mapPositionDialog.setMapDialogVisible(false)
        },
        ...mapMutations(['setGlobalVariables']),
        chosedShopLogo (chosed) {
            if (chosed) {
                this.formData.shopLogo = chosed.path
            }
        },
        chosedShopDefaultImage (chosed) {
            this.formData.shopDefaultImage = chosed.path
        },
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, this.formData)

                        const _result = await this.$api.setting.save({ key: 'global_variables', value: data })
                        if (_result.succeed === 1 && _result.code === 200) {
                            this.setGlobalVariables(_result.data)
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

                        this.editLoading = false
                    })
                }
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        async getSettings () {
            const _result = await this.$api.setting.get({ key: 'global_variables' })
            if (_result.succeed === 1 && _result.code === 200) {
                Object.assign(this.formData, _result.data)
                console.log(this.formData)
            }
        }
    },
    mounted () {
        this.getSettings()
        this.getAreaList()
    }
}
</script>

<style scoped lang="scss">
.tip-info {
    margin-left: 10px;
    font-size: 12px;
    color: #909399;
}
.card-item {
    margin-top: 10px;
    width: 210px;
    height: 380px;
    i {
        font-size: 128px;
        color: #f2f6fc;
    }
    .summary {
        padding: 8px 5px;
        font-weight: 200;
        font-size: 12px;
        white-space: pre-wrap;
    }
}
</style>
