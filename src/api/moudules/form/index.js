import axios from '../../axios'
/*
 * 管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/form/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/form/delete', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/form/get', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/form/list', method: 'post', data }) }

export default { save, destroy, list, get }
