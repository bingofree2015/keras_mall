/*
 * 接口统一集成模块
 */
import axios from './axios'

import attachGroup from './moudules/attach/attach_group'
import attachment from './moudules/attach/attachment'

import brand from './moudules/goods/brand'
import goods from './moudules/goods'
import goodsCat from './moudules/goods/goods_cat'
import goodsSpec from './moudules/goods/goods_spec'
import goodsParam from './moudules/goods/goods_param'
import goodsType from './moudules/goods/goods_type'
import goodsComment from './moudules/goods/goods_comment'

import sysUser from './moudules/permission/sys_user'
import role from './moudules/permission/role'
import menu from './moudules/permission/menu'

import setting from './moudules/preference/setting'
import operationLog from './moudules/preference/operation_log'
import ship from './moudules/preference/ship'
import store from './moudules/preference/store'
import task from './moudules/preference/task'
import messageCenter from './moudules/preference/message_center'
import area from './moudules/preference/area'
import logistics from './moudules/preference/logistics'

import userGrade from './moudules/user/user_grade'
import user from './moudules/user'

import order from './moudules/order'
import delivery from './moudules/order/bill_delivery'
import lading from './moudules/order/bill_lading'
import afterSale from './moudules/order/bill_after_sale'
import reship from './moudules/order/bill_reship'

import balance from './moudules/pay/balance'
import pay from './moudules/pay'
import billPayment from './moudules/pay/bill_payment'
import billRefund from './moudules/pay/bill_refund'
import userToCash from './moudules/pay/user_to_cash'

import dict from './moudules/system/dict'
import log from './moudules/system/log'
import db from './moudules/system/db'

import articleType from './moudules/marketing/article_type'
import article from './moudules/marketing/article'
import advertPosition from './moudules/marketing/advert_position'
import advertisement from './moudules/marketing/advertisement'
import notice from './moudules/marketing/notice'

import promotion from './moudules/promotion'
import spTarget from './moudules/promotion/sp_target'
import spRule from './moudules/promotion/sp_rule'
import coupon from './moudules/promotion/coupon'

import report from './moudules/report'

import weixinMessage from './moudules/wechat/weixin_message'
import weixinMediaMessage from './moudules/wechat/weixin_media_message'

import page from './moudules/page'

import form from './moudules/form'
import formSubmit from './moudules/form/form_submit'

const mapAlias = () => { return axios({ url: 'cms/map_alias', method: 'get' }) }

// 默认全部导出
export default {
    attachGroup,
    attachment,
    sysUser,
    role,
    menu,
    dict,
    setting,
    operationLog,
    ship,
    store,
    task,
    messageCenter,
    area,
    logistics,
    log,
    userGrade,
    user,
    db,
    brand,
    goods,
    goodsCat,
    goodsSpec,
    goodsParam,
    goodsType,
    goodsComment,
    order,
    delivery,
    lading,
    afterSale,
    reship,
    pay,
    balance,
    billPayment,
    billRefund,
    userToCash,
    articleType,
    article,
    advertPosition,
    advertisement,
    notice,
    promotion,
    spTarget,
    spRule,
    coupon,
    report,
    weixinMessage,
    weixinMediaMessage,
    page,
    form,
    formSubmit,
    mapAlias
}
