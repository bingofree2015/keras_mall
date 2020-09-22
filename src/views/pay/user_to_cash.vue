<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-13 19:10:06
-->
<template>
    <div class="page-container">
        <!--导航与工具栏-->
        <el-row>
            <el-col :span="10">
                <bread-crumb></bread-crumb>
            </el-col>
            <el-col :span="14" class="top-bar">
                <el-form :inline="true" :model="filters" :size="miniSize">
                    <el-form-item>
                        <el-input placeholder="请输入内容" v-model="filters.value">
                            <el-select class="search-prepend" placeholder="请选择" slot="prepend" v-model="filters.key">
                                <el-option :key="item.prop" :label="item.label" :value="item.prop"
                                    v-for="item in props"></el-option>
                            </el-select>
                            <ext-button :label="$t('action.search')" @click="queryForPaginatedList()"
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="pay:user_to_cash:view" slot="append"
                                type="primary" />
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button-group>
                            <el-tooltip content="刷新" placement="top">
                                <el-button @click="queryForPaginatedList()" icon="el-icon-ali-shuaxin" round>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="导出" placement="top">
                                <el-button icon="el-icon-ali-daochu" round></el-button>
                            </el-tooltip>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <!--表格内容栏-->
        <ext-table aliasName="user_to_cash" :columns="columns" :count="paginated.attrs.count" :data="paginated.list"
            :operations="operations" :operationWidth="operationWidth" :pageSize="paginated.attrs.limit"
            @queryForPaginatedList="queryForPaginatedList"></ext-table>
    </div>
</template>

<script>
import extButton from '@/components/core/ext_button'
import extTable from '@/components/core/ext_table'
import breadCrumb from '@/components/bread_crumb'

export default {
    components: {
        extButton,
        extTable,
        breadCrumb
    },
    computed: {
        operationWidth: {
            get () {
                let _operationWidth = 0
                if (Array.isArray(this.operations)) {
                    _operationWidth += this.operations.length * 100
                }
                return _operationWidth
            }
        }
    },

    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',
            filters: {
                key: 'name',
                value: ''
            },
            props: [
                { prop: 'name', label: '支付方式名称' }
            ],
            columns: [
                { prop: 'id', label: 'ID', minWidth: 60 },
                { prop: 'user.username', label: '用户', minWidth: 98 },
                { prop: 'money', label: '金额', minWidth: 80 },
                { prop: 'withdrawals', label: '手续费', minWidth: 90 },
                { prop: 'accountBank', label: '开户行', minWidth: 100 },
                { prop: 'accountName', label: '账户名', minWidth: 90 },
                { prop: 'cardNumber', label: '卡号', minWidth: 120 },
                { prop: 'type', label: '类型', minWidth: 90, formatter: this.env.columnFormatter },
                { prop: 'createdAt', label: '创建时间', minWidth: 140 }
            ],
            paginated: {
                attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                list: []
            },
            operations: [
                {
                    label: 'action.pass', // 按钮上显示的文字
                    icon: 'el-icon-ali-tongguo', // 按钮文字前面的图标
                    perms: 'pay:user_to_cash:edit', // 权限标识
                    size: this.size, // 按钮大小
                    // type: 'primary',            // 按钮类型
                    func: (row) => {
                        this.$confirm('确认通过吗？', '提示', {}).then(async () => {
                            const data = { id: row.id, type: 2 }
                            this.updateUserToCash(data)
                        })
                    }
                },
                {
                    label: 'action.reject', // 按钮上显示的文字
                    icon: 'el-icon-ali-yibohui', // 按钮文字前面的图标
                    perms: 'pay:user_to_cash:edit', // 权限标识
                    size: this.size, // 按钮大小
                    // type: 'primary',            // 按钮类型
                    func: (row) => {
                        this.$confirm('确认驳回吗？', '提示', {}).then(async () => {
                            const data = { id: row.id, type: 3 }
                            this.updateUserToCash(data)
                        })
                    }
                }
            ]
        }
    },
    methods: {
        // 获取分页数据
        async queryForPaginatedList (data) {
            if (data && data.attrs) {
                this.paginated.attrs = data.attrs
            }
            this.paginated.attrs.searchKey = {}
            if (this.filters.key && this.filters.value) {
                this.paginated.attrs.searchKey[this.filters.key] = this.filters.value
            }
            const _result = await this.$api.userToCash.list(this.paginated.attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginated.list = _result.data.list
                this.paginated.attrs.count = _result.data.count
            }
            if (data && data.cb) data.cb()
        },
        async updateUserToCash (data) {
            const _result = await this.$api.userToCash.save(data)
            if (_result.succeed === 1 && _result.code === 200) {
                const _userToCash = this.paginated.list.find(v => v.id === _result.data.id)
                if (!_userToCash) {
                    this.paginated.list.unshift(_result.data)
                } else {
                    Object.assign(_userToCash, _result.data)
                }
                this.$notify({
                    title: '成功',
                    message: _result.description,
                    type: 'success'
                })
            } else {
                this.$notify.error({
                    title: '错误',
                    message: _result.description
                })
            }
        }
    },
    mounted () { }
}
</script>

<style scoped lang="scss">
</style>
