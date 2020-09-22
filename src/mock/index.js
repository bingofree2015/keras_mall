import Mock from 'mockjs'
import { baseUrl } from '@/env'
import * as sysUser from './modules/sys_user'
import * as role from './modules/role'
import * as menu from './modules/menu'
import * as dict from './modules/dict'
import * as log from './modules/log'

// 1. 开启/关闭[所有模块]拦截, 通过调[openMock参数]设置.
// 2. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 3. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
// let openMock = true
const openMock = false
fnCreate(sysUser, openMock)
fnCreate(role, openMock)
fnCreate(openMock)
fnCreate(menu, openMock)
fnCreate(dict, openMock)
fnCreate(log, openMock)

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen = true) {
    if (isOpen) {
        for (var key in mod) {
            ((res) => {
                if (res.isOpen !== false) {
                    let url = baseUrl
                    if (!url.endsWith('/')) {
                        url = url + '/'
                    }
                    url = url + res.url
                    Mock.mock(new RegExp(url), res.type, (opts) => {
                        opts.data = opts.body ? JSON.parse(opts.body) : null
                        delete opts.body
                        console.log('\n')
                        console.log('%cmock拦截, 请求: ', 'color:blue', opts)
                        console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
                        return res.data
                    })
                }
            })(mod[key]() || {})
        }
    }
}
