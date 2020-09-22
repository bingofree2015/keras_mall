import axios from '../../axios'
/*
 * 任务模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/preference/message_center/save', method: 'post', data }) }
// 查询
const list = (data) => { return axios({ url: 'cms/preference/message_center/list', method: 'post', data }) }

export default { save, list }
