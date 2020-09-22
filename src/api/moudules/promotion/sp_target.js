import axios from '../../axios'
/*
 * 促销条件模块
 */
// 条件模板
const getTargetTypes = (data) => { return axios({ url: 'cms/promotion/sp_target/get_target_types', method: 'post', data }) }
// 保存
const save = (data) => { return axios({ url: 'cms/promotion/sp_target/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/promotion/sp_target/delete', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/promotion/sp_target/get', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/promotion/sp_target/list', method: 'post', data }) }

export default { getTargetTypes, save, destroy, get, list }
