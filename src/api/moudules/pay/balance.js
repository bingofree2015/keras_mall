import axios from '../../axios'
/*
 * 帐户资金管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/pay/balance/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/pay/balance/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/pay/balance/list', method: 'post', data }) }

export default { save, destroy, list }
