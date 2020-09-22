/*
 * 用户管理模块
 */
export function login () {
    const loginData = {
        succeed: 1,
        code: 200,
        description: '成功',
        data: {
            id: 1,
            userId: 1,
            token: '77ae89be36504adfb5c09ef71409ea0e',
            expireTime: '2018-09-01T16:24:50.473+0000',
            createBy: null,
            createTime: null,
            lastUpdateBy: null,
            lastUpdateTime: '2018-09-01T04:24:50.473+0000'
        }
    }
    return {
        url: 'cms/system/login',
        type: 'post',
        data: loginData
    }
}

export function resetPwd () {
    const resetPwdData = {
        succeed: 1,
        code: 200,
        description: '成功',
        data: {
            id: 1,
            pwd: '122222',
            newPwd: '111111'
        }
    }
    return {
        url: 'cms/system/resetPwd',
        type: 'post',
        data: resetPwdData
    }
}

// 登出接口
export function logout () {
    const logoutData = {
        succeed: 1,
        code: 200,
        description: '成功',
        data: {}
    }
    return {
        url: 'cms/system/logout',
        type: 'post',
        data: logoutData
    }
}

// 保存
export function save () {
    return {
        url: 'cms/system/save',
        type: 'post',
        data: {
            succeed: 1,
            code: 200,
            description: '成功',
            data: 1
        }
    }
}
// 批量删除
export function destroy () {
    return {
        url: 'cms/system/delete',
        type: 'post',
        data: {
            succeed: 1,
            code: 200,
            description: '成功',
            data: 1
        }
    }
}
// 分页查询
export function list (params) {
    const findPageData = {
        succeed: 1,
        code: 200,
        description: '成功',
        data: {}
    }
    const pageNum = 1
    const pageSize = 8
    if (params !== null) {
    // pageNum = params.pageNum
    }
    if (params !== null) {
    // pageSize = params.pageSize
    }
    const content = this.getContent(pageNum, pageSize)
    findPageData.data.pageNum = pageNum
    findPageData.data.pageSize = pageSize
    findPageData.data.totalSize = 50
    findPageData.data.list = content
    return {
        url: 'cms/system/list',
        type: 'post',
        data: findPageData
    }
}
export function getContent (pageNum, pageSize) {
    const content = []
    for (let i = 0; i < pageSize; i++) {
        const obj = {}
        const index = ((pageNum - 1) * pageSize) + i + 1
        obj.id = index
        obj.name = 'coupon_mall' + index
        obj.password = '9ec9750e709431dad22365cabc5c625482e574c74adaebba7dd02f1129e4ce1d'
        obj.salt = 'YzcmCZNvbXocrsz9dm8e'
        obj.email = 'coupon_mall' + index + '@qq.com'
        obj.mobile = '18688982323'
        obj.status = 1

        obj.createBy = 'admin'
        obj.createTime = '2018-08-14 11:11:11'
        obj.createBy = 'admin'
        obj.createTime = '2018-09-14 12:12:12'
        content.push(obj)
    }
    return content
}
// 查找用户的菜单权限标识集合
export function getPermits () {
    const permsData = {
        succeed: 1,
        code: 200,
        description: '',
        data: {
            list: [
                null,
                'sys:user:view',
                'sys:menu:delete',
                'sys:dict:edit',
                'sys:dict:delete',
                'sys:menu:add',
                'sys:user:add',
                'sys:log:view',
                'sys:role:edit',
                'sys:role:view',
                'sys:dict:view',
                'sys:user:edit',
                'sys:user:delete',
                'sys:role:delete',
                'sys:menu:view',
                'sys:menu:edit',
                'sys:dict:add',
                'sys:role:add'
            ]
        }
    }
    return {
        url: 'cms/system/get_permits',
        type: 'post',
        data: permsData
    }
}
