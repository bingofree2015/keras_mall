import axios from '../../axios'
/*
 * 角色管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/permission/role/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/permission/role/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/permission/role/list', method: 'post', data }) }
// 查询角色菜单集合
const getMenusByRoleId = (data) => { return axios({ url: 'cms/permission/role/get_menus_by_roleid', method: 'post', data }) }
// 保存角色菜单集合
const saveRoleMenus = (data) => { return axios({ url: 'cms/permission/role/save_role_menus', method: 'post', data }) }

export default { save, destroy, list, getMenusByRoleId, saveRoleMenus }
