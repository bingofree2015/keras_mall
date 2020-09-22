import axios from '../../axios'
/*
 * 公告模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/marketing/notice/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/marketing/notice/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/marketing/notice/list', method: 'post', data }) }

export default { save, destroy, list }
