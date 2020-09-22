import axios from '../../axios'
/*
 * 促销管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/promotion/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/promotion/delete', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/promotion/get', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/promotion/list', method: 'post', data }) }

export default { save, destroy, get, list }
