import axios from '../../axios'
/*
 * 商品评论管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/goods/goods_comment/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/goods/goods_comment/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/goods/goods_comment/list', method: 'post', data }) }

export default { save, destroy, list }
