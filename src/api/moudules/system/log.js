import axios from '../../axios'
/*
 * 日志管理模块
 */
// 分页查询
const list = (data) => { return axios({ url: 'cms/system/log/list', method: 'post', data }) }
export default { list }
