import axios from '../../axios'
/*
 * 商品参数管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/goods/goods_param/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/goods/goods_param/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/goods/goods_param/list', method: 'post', data }) }

export default { save, destroy, list }
