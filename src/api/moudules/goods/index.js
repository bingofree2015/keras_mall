import axios from '../../axios'
/*
 * 商品模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/goods/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/goods/delete', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/goods/get', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/goods/list', method: 'post', data }) }

export default { save, destroy, get, list }
