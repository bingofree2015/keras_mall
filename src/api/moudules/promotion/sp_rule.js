import axios from '../../axios'
/*
 * 促销结果模块
 */
// 结果模板
const getRuleTypes = (data) => { return axios({ url: 'cms/promotion/sp_rule/get_rule_types', method: 'post', data }) }
// 保存
const save = (data) => { return axios({ url: 'cms/promotion/sp_rule/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/promotion/sp_rule/delete', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/promotion/sp_rule/get', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/promotion/sp_rule/list', method: 'post', data }) }

export default { getRuleTypes, save, destroy, get, list }
