// 导入所有接口
import axios from './axios'
import api from '.'

const install = Vue => {
    if (install.installed) return

    install.installed = true
    Object.defineProperties(Vue.prototype, {
    // 注意,此处挂载在 Vue 原型的 $api 对象上
        $api: {
            get () { return api }
        },
        $axios: {
            get () { return axios }
        }
    })
}

export default install
