import axios from '../../axios'
/*
 * 页面管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/page/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/page/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/page/list', method: 'post', data }) }

export default { save, destroy, list }
