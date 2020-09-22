import axios from '../../axios'
/*
 * 品牌管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/goods/brand/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/goods/brand/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/goods/brand/list', method: 'post', data }) }

export default { save, destroy, list }
