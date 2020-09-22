import axios from '../../axios'
/*
 * 退货单模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/pay/bill_refund/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/pay/bill_refund/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/pay/bill_refund/list', method: 'post', data }) }

export default { save, destroy, list }
