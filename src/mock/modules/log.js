/*
 * 日志管理模块
 */

// 分页查询
export function findPage (params) {
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
        url: 'cms/system/log/find_page',
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
        obj.userName = 'admin' + index
        obj.operation = 'operation'
        obj.method = 'com.louis.controller.SysUserController.findPage'
        obj.params = '{"pageNum":"1","pageSize":"8"}'
        obj.time = 12
        obj.ip = '127.0.0.1'
        obj.remark = 'remark log' + index
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
