import axios from '../../axios'
/*
 * 注册用户模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/user/user_grade/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/user/user_grade/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/user/user_grade/list', method: 'post', data }) }

export default { save, destroy, list }
