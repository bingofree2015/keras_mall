import axios from '../../axios'
/*
 * 商品属性管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/goods/goods_spec/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/goods/goods_spec/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/goods/goods_spec/list', method: 'post', data }) }

export default { save, destroy, list }
