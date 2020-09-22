import axios from '../../axios'
/*
 * 菜单管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/goods/goods_cat/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/goods/goods_cat/delete', method: 'post', data }) }
// 树
const getTree = (data) => { return axios({ url: 'cms/goods/goods_cat/get_tree', method: 'post', data }) }

export default { save, destroy, getTree }
