import axios from '../../axios'
/*
 * 设置模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/preference/setting/save', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/preference/setting/get', method: 'post', data }) }

export default { save, get }
