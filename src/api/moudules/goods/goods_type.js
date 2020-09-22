import axios from '../../axios'
/*
 * 商品类型管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/goods/goods_type/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/goods/goods_type/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/goods/goods_type/list', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/goods/goods_type/get', method: 'post', data }) }
export default { save, destroy, list, get }
