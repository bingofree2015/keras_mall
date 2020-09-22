import axios from '../../axios'

// 保存
const save = (data) => { return axios({ url: 'cms/attach_group/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/attach_group/delete', method: 'post', data }) }
// 查询
const get = (data) => { return axios({ url: 'cms/attach_group/get', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/attach_group/list', method: 'post', data }) }

export default { save, destroy, get, list }
