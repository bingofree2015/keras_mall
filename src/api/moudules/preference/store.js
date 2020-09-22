import axios from '../../axios'
/*
 * 模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/preference/store/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/preference/store/delete', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/preference/store/get', method: 'post', data }) }
// 查询
const list = (data) => { return axios({ url: 'cms/preference/store/list', method: 'post', data }) }

export default { save, destroy, get, list }
