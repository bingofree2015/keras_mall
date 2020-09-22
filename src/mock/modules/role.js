/*
 * 角色管理模块
 */

// 保存
export function save () {
    return {
        url: 'cms/system/role/save',
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
        url: 'cms/system/role/delete',
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
    const listData = {
        succeed: 1,
        code: 200,
        description: '成功',
        data: {}
    }
    let pageNum = 1
    let pageSize = 8
    if (params !== null) {
        pageNum = params.pageNum
    }
    if (params !== null) {
        pageSize = params.pageSize
    }
    const content = this.getContent(pageNum, pageSize)
    listData.data.pageNum = pageNum
    listData.data.pageSize = pageSize
    listData.data.totalSize = 50
    listData.data.list = content
    return {
        url: 'cms/system/role/list',
        type: 'post',
        data: listData
    }
}
export function getContent (pageNum, pageSize) {
    const content = []
    for (let i = 0; i < pageSize; i++) {
        const obj = {}
        const index = ((pageNum - 1) * pageSize) + i + 1
        obj.id = index
        obj.name = 'role' + index
        obj.remark = 'remark role' + index
        if (i % 2 === 0) {

        }
        obj.createBy = 'admin'
        obj.createTime = '2018-08-14 11:11:11'
        obj.createBy = 'admin'
        obj.createTime = '2018-09-14 12:12:12'
        content.push(obj)
    }
    return content
}
// 查询角色菜单集合
export function getMenusByRoleId (params) {
    const findRoleMenuData = {
        succeed: 1,
        code: 200,
        description: '成功',
        data: {}
    }
    return {
        url: 'cms/system/role/get_menus_by_roleid',
        type: 'post',
        data: findRoleMenuData
    }
}
