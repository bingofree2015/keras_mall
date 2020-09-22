import axios from '../../axios'
/*
 * 支付单模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/pay/bill_payment/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/pay/bill_payment/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/pay/bill_payment/list', method: 'post', data }) }

export default { save, destroy, list }
