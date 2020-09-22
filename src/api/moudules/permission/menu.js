import axios from '../../axios'
/*
 * 菜单管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/permission/menu/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/permission/menu/delete', method: 'post', data }) }
// 查找导航路由树
const getRouteTree = (data) => { return axios({ url: 'cms/permission/menu/get_route_tree', method: 'post', data }) }
// 查找导航菜单树
const getNavTree = (data) => { return axios({ url: 'cms/permission/menu/get_nav_tree', method: 'post', data }) }
// 查找菜单树
const getMenuTree = (data) => { return axios({ url: 'cms/permission/menu/get_menu_tree', method: 'post', data }) }

export default { save, destroy, getRouteTree, getNavTree, getMenuTree }
