import axios from '../../axios'
/*
 * 发货单管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/order/bill_after_sale/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/order/bill_after_sale/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/order/bill_after_sale/list', method: 'post', data }) }

export default { save, destroy, list }
