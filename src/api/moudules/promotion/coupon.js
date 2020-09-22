import axios from '../../axios'
/*
 * 优惠券模块
 */
// 保存
const save = (data) => { return axios({ url: 'cms/promotion/coupon/save', method: 'post', data }) }
// 删除
const destroy = (data) => { return axios({ url: 'cms/promotion/coupon/delete', method: 'post', data }) }
// 明细
const get = (data) => { return axios({ url: 'cms/promotion/coupon/get', method: 'post', data }) }
// 分页查询
const list = (data) => { return axios({ url: 'cms/promotion/coupon/list', method: 'post', data }) }
// 批量生成优惠券
const build = (data) => { return axios({ url: 'cms/promotion/coupon/build', method: 'post', data }) }
export default { save, destroy, get, list, build }
