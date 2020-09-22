import axios from '../../axios'
/*
 * 支付方式模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/pay/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/pay/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/pay/list', method: 'post', data }) }

export default { save, destroy, list }
