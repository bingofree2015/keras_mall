import axios from '../../axios'
/*
 * 文章分类模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/marketing/article_type/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/marketing/article_type/delete', method: 'post', data }) }
// 分页查询
const getTree = (data) => { return axios({ url: 'cms/marketing/article_type/get_tree', method: 'post', data }) }

export default { save, destroy, getTree }
