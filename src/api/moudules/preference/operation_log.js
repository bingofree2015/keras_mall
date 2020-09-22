import axios from '../../axios'
/*
 * 设置模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/preference/operation_log/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/preference/operation_log/delete', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/preference/operation_log/get', method: 'post', data }) }
// 查询
const list = (data) => { return axios({ url: 'cms/preference/operation_log/list', method: 'post', data }) }

export default { save, destroy, get, list }
