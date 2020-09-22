import axios from '../../axios'
/*
 * 订单模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/order/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/order/delete', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/order/get', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/order/list', method: 'post', data }) }
// 完成
const complate = (data) => { return axios({ url: 'cms/order/complate', method: 'post', data }) }
// 取消
const cancel = (data) => { return axios({ url: 'cms/order/cancel', method: 'post', data }) }

export default { save, destroy, get, list, complate, cancel }
