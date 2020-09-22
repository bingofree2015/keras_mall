import axios from '../../axios'

// 保存
const save = (data) => { return axios({ url: 'cms/attachment/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/attachment/delete', method: 'post', data }) }
// 查询
const get = (data) => { return axios({ url: 'cms/attachment/get', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/attachment/list', method: 'post', data }) }
// 远程下载
const download = (data) => { return axios({ url: 'cms/attachment/download', method: 'post', data }) }

export default { save, destroy, get, list, download }
