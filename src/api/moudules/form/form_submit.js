import axios from '../../axios'
/*
 * 管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/form/form_submit/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/form/form_submit/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/form/form_submit/list', method: 'post', data }) }
// 统计查询
const report = (data) => { return axios({ url: 'cms/form/form_submit/report', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/form/form_submit/get', method: 'post', data }) }
export default { save, destroy, list, report, get }
