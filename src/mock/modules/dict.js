/*
 * 字典管理模块
 */
// 保存
export function save () {
    return {
        url: 'cms/system/dict/save',
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
        url: 'cms/system/dict/delete',
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
        url: 'cms/system/dict/list',
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
        obj.value = 'value' + index
        obj.label = 'label' + index
        obj.type = 'type' + index
        obj.description = 'description' + index
        obj.sort = 0
        obj.name = 'dict' + index
        obj.name = 'dict' + index
        obj.name = 'dict' + index
        obj.name = 'dict' + index
        obj.remark = 'remark' + index
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
