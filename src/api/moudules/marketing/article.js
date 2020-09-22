import axios from '../../axios'
/*
 * 文章模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/marketing/article/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/marketing/article/delete', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/marketing/article/get', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/marketing/article/list', method: 'post', data }) }

export default { save, destroy, get, list }
