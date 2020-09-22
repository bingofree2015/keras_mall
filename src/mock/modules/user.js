/*
 * 注册用户模块
 */
// 保存
export function save () {
    return {
        url: 'cms/user/save',
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
        url: 'cms/user/delete',
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
    let pageNum = 1
    let pageSize = 8
    if (params !== null) {
        pageNum = params.pageNum
    }
    if (params !== null) {
        pageSize = params.pageSize
    }
    const content = this.getContent(pageNum, pageSize)
    findPageData.data.pageNum = pageNum
    findPageData.data.pageSize = pageSize
    findPageData.data.totalSize = 50
    findPageData.data.list = content
    return {
        url: 'cms/user/list',
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
        obj.name = 'name' + index
        obj.icon = 'icon' + index
        obj.range = 1
        obj.qty = 5
        content.push(obj)
    }
    return content
}
