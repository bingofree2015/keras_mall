import axios from '../../axios'
/*
 * 文章模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/marketing/advert_position/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/marketing/advert_position/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/marketing/advert_position/list', method: 'post', data }) }

export default { save, destroy, list }
