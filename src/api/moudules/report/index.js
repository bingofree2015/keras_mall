import axios from '../../axios'
/*
 * 统计模块
 */
// 商品收藏
const getGoodsCollections = (data) => { return axios({ url: 'cms/report/get_goods_collections', method: 'post', data }) }
const getOrderData = (data) => { return axios({ url: 'cms/report/get_order_data', method: 'post', data }) }
const getPayData = (data) => { return axios({ url: 'cms/report/get_pay_data', method: 'post', data }) }
const getGoods = (data) => { return axios({ url: 'cms/report/get_goods', method: 'post', data }) }

export default { getGoodsCollections, getOrderData, getPayData, getGoods }
