import axios from '../../axios'
/*
 * 用户管理模块
 */
// 登录
const login = data => { return axios({ url: 'cms/permission/login', method: 'post', data }) }
// 登出
const logout = () => { return axios({ url: 'cms/permission/logout', method: 'post' }) }
// 保存
const save = (data) => { return axios({ url: 'cms/permission/save', method: 'post', data }) }
// 修改密码
const resetPwd = (data) => { return axios({ url: 'cms/permission/resetPwd', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/permission/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/permission/list', method: 'post', data }) }
// 查找用户的菜单权限标识集合
const getPermits = (data) => { return axios({ url: 'cms/permission/get_permits', method: 'post', data }) }

export default { login, logout, save, resetPwd, destroy, list, getPermits }
