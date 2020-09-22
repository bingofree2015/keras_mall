import axios from '../../axios'
/*
 * 菜单管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/preference/area/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/preference/area/delete', method: 'post', data }) }
// 查找菜单树
const getTree = (data) => { return axios({ url: 'cms/preference/area/get_tree', method: 'post', data }) }
// 列表
const list = (data) => { return axios({ url: 'cms/preference/area/list', method: 'post', data }) }
export default { save, destroy, getTree, list }
