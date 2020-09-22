import axios from '../../axios'
/*
 * 提现单模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/pay/user_to_cash/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/pay/user_to_cash/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/pay/user_to_cash/list', method: 'post', data }) }

export default { save, destroy, list }
