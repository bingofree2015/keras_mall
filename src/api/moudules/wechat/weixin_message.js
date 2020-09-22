import axios from '../../axios'
/*
 * 品牌管理模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/wechat/weixin_message/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/wechat/weixin_message/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/wechat/weixin_message/list', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/wechat/weixin_message/get', method: 'post', data }) }

export default { save, destroy, list, get }
