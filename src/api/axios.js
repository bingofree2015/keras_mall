/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
 */
import axios from 'axios'
import config from './config'
import Cookies from 'js-cookie'
import router from '@/router'

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const _headers = options.headers ? options.headers : config.headers
        console.log(`请求地址: ${options.url} method:[${options.method}] headers:[${JSON.stringify(_headers)}]`)
        const instance = axios.create({
            headers: _headers,
            timeout: config.timeout,
            withCredentials: config.withCredentials
        })
        // request 拦截器
        instance.interceptors.request.use(
            config => {
                const token = Cookies.get('token')
                if (token) {
                    config.headers.authorization = 'Bearer ' + token
                }
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )
        // response 拦截器
        instance.interceptors.response.use(
            response => {
                let data
                if (response.data === undefined) {
                    data = JSON.parse(response.request.responseText)
                } else {
                    data = response.data
                }
                return data
            },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误'
                            break
                        case 401:
                            err.message = '未授权，请登录'
                            // 返回 401 清除token信息并跳转到登录页面
                            sessionStorage.removeItem('loginUser')
                            router.replace({
                                path: '/login',
                                query: { redirect: router.currentRoute.fullPath }
                            })
                            break
                        case 403:
                            err.message = '拒绝访问'
                            break
                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`
                            break
                        case 408:
                            err.message = '请求超时'
                            break
                        case 500:
                            err.message = '服务器内部错误'
                            break
                        case 501:
                            err.message = '服务未实现'
                            break
                        case 502:
                            err.message = '网关错误'
                            break
                        case 503:
                            err.message = '服务不可用'
                            break
                        case 504:
                            err.message = '网关超时'
                            break
                        case 505:
                            err.message = 'HTTP版本不受支持'
                            break
                        default:
                    }
                }
                console.debug(err)
                return Promise.reject(err) // 返回接口返回的错误信息
            }
        )
        // 请求处理
        instance(options).then(res => {
            resolve(res)
            return false
        }).catch(err => {
            console.log('请求参数:', options)
            console.error(err)
            reject(err)
        })
    })
}
