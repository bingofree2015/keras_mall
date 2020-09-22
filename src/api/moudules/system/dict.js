import axios from '../../axios'
/*
 * 字典管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/system/dict/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/system/dict/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/system/dict/list', method: 'post', data }) }

export default { save, destroy, list }
