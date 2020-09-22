import axios from '../../axios'

// 备份
const backup = (data) => { return axios({ url: 'cms/system/db/backup', method: 'post', data }) }
// 还原
const restore = (data) => { return axios({ url: 'cms/system/db/restore', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/system/db/delete', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/system/db/list', method: 'post', data }) }

export default { backup, restore, destroy, list }
