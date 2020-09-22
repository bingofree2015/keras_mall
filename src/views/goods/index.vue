<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-07-29 21:17:40
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
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="goods:view" slot="append"
                                type="primary" />
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <ext-button :label="$t('action.add')" @click="handleAdd" icon="el-icon-ali-add"
                            perms="goods:add" type="primary" />
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

        <el-tabs @tab-click="handleClick" class="tab-container" type="border-card" v-model="activeName">
            <el-tab-pane name="all">
                <span slot="label">
                    <el-badge :value="paginated['all'].attrs.count" class="item">
                        <i class="el-icon-ali-quanbushangpin"></i> 全部商品
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <ext-table :batchDelete="batchDelete" :columns="columns" :count="paginated['all'].attrs.count"
                    :data="paginated['all'].list" :operations="operations" :operationWidth="operationWidth"
                    :pageSize="paginated['all'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @queryForPaginatedList="queryForPaginatedList" tabName="all"></ext-table>
            </el-tab-pane>
            <el-tab-pane name="up">
                <span slot="label">
                    <el-badge :value="paginated['up'].attrs.count" class="item">
                        <i class="el-icon-ali-shangjiashangpin"></i> 上架商品
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <ext-table :batchDelete="batchDelete" :columns="columns" :count="paginated['up'].attrs.count"
                    :data="paginated['up'].list" :operations="operations" :operationWidth="operationWidth"
                    :pageSize="paginated['up'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @queryForPaginatedList="queryForPaginatedList" tabName="up"></ext-table>
            </el-tab-pane>
            <el-tab-pane name="down">
                <span slot="label">
                    <el-badge :value="paginated['down'].attrs.count" class="item">
                        <i class="el-icon-ali-xiajiashangpin"></i> 下架商品
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <ext-table :batchDelete="batchDelete" :columns="columns" :count="paginated['down'].attrs.count"
                    :data="paginated['down'].list" :operations="operations" :operationWidth="operationWidth"
                    :pageSize="paginated['down'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @queryForPaginatedList="queryForPaginatedList" tabName="down"></ext-table>
            </el-tab-pane>
            <el-tab-pane name="warn">
                <span slot="label">
                    <el-badge :value="paginated['warn'].attrs.count" class="item">
                        <i class="el-icon-ali-kucunbaojing"></i> 库存报警
                    </el-badge>
                </span>
                <!--表格内容栏-->
                <ext-table :batchDelete="batchDelete" :columns="columns" :count="paginated['warn'].attrs.count"
                    :data="paginated['warn'].list" :operations="operations" :operationWidth="operationWidth"
                    :pageSize="paginated['warn'].attrs.limit" :permsBatchDelete="permsBatchDelete"
                    @queryForPaginatedList="queryForPaginatedList" tabName="warn"></ext-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import extTable from '@/components/core/ext_table'
import extButton from '@/components/core/ext_button'
import breadCrumb from '@/components/bread_crumb'
export default {
    components: {
        extTable,
        extButton,
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
                { prop: 'name', label: '商品名称' }
            ],
            activeName: 'all',

            columns: [
                { prop: 'id', label: 'ID', minWidth: 60 },
                { prop: 'name', label: '商品名称', minWidth: 120, showOverflowTooltip: true },
                { prop: 'price', label: '价格', minWidth: 70 },
                { prop: 'costPrice', label: '成本价', minWidth: 80 },
                { prop: 'mktPrice', label: '市场价', minWidth: 80 },
                { prop: 'attachment.path', label: '默认图片', minWidth: 100, propType: 'image', align: 'center' },
                { prop: 'goodsCat.name', label: '分类', minWidth: 90 },
                { prop: 'goodsType.name', label: '类别', minWidth: 90 },
                { prop: 'brand.name', label: '品牌', minWidth: 90 },
                {
                    prop: 'marketable',
                    label: '上架',
                    minWidth: 70,
                    propType: 'bool',
                    clickFlag: true,
                    func: async (id, value) => {
                        const _data = { id, marketable: value }
                        Object.assign(_data, (value ? { upTime: Date.now() } : { downTime: Date.now() }))

                        const _result = await this.$api.goods.save(_data)
                        this.$notify.info({
                            title: '消息',
                            message: _result.description
                        })
                    },
                    align: 'center'
                },
                { prop: 'sort', label: '排序', minWidth: 70 },
                {
                    prop: 'isRecommend',
                    label: '推荐',
                    minWidth: 80,
                    propType: 'bool',
                    clickFlag: true,
                    func: async (id, value) => {
                        const _data = { id, isRecommend: value }
                        const _result = await this.$api.goods.save(_data)
                        this.$notify.info({
                            title: '消息',
                            message: _result.description
                        })
                    },
                    align: 'center'
                },
                {
                    prop: 'isHot',
                    label: '热门',
                    minWidth: 80,
                    propType: 'bool',
                    clickFlag: true,
                    func: async (id, value) => {
                        const _data = { id, isHot: value }
                        const _result = await this.$api.goods.save(_data)
                        this.$notify.info({
                            title: '消息',
                            message: _result.description
                        })
                    },
                    align: 'center'
                },

                { prop: 'labelIds', label: '标签', minWidth: 80, showOverflowTooltip: true },
                { prop: 'createdAt', label: '创建时间', minWidth: 140, formatter: this.env.formatDateTime }
            ],

            paginated: {
                all: {
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                },
                up: {
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                },
                down: {
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                },
                warn: {
                    attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                    list: []
                }
            },

            operations: [
                {
                    label: 'action.edit', // 按钮上显示的文字
                    icon: 'el-icon-ali-bianji', // 按钮文字前面的图标
                    perms: 'goods:edit', // 权限标识
                    size: this.size, // 按钮大小
                    // type: 'primary',            // 按钮类型
                    func: (row) => {
                        this.$router.push({ path: '/goods/edit', query: { id: row.id, isCreating: false } })
                    }
                }, {
                    label: 'action.delete',
                    icon: 'el-icon-ali-shanchu',
                    perms: 'goods:delete',
                    size: this.size,
                    type: 'danger',
                    func: (row) => {
                        this.$confirm('确认删除选中记录吗？', '提示', {
                            type: 'warning'
                        }).then(async () => {
                            await this.batchDelete([row.id])
                        })
                    }
                }
            ],
            permsBatchDelete: 'good:delete'
        }
    },
    methods: {
        handleClick () { },
        // 获取分页数据
        async queryForPaginatedList (data) {
            let _tabName = this.activeName
            if (data && data.attrs) {
                _tabName = data.attrs.tabName
                this.paginated[_tabName].attrs = data.attrs
            }

            this.paginated[_tabName].attrs.searchKey = {}
            if (_tabName === 'up') {
                this.paginated[_tabName].attrs.searchKey.marketable = true
            } else if (_tabName === 'down') {
                this.paginated[_tabName].attrs.searchKey.marketable = false
            } else if (_tabName === 'warn') {
                this.paginated[_tabName].attrs.searchKey.stock = { $lt: 100 }
            }

            if (this.filters.key && this.filters.value) {
                this.paginated[_tabName].attrs.searchKey[this.filters.key] = this.filters.value
            }
            const _result = await this.$api.goods.list(this.paginated[_tabName].attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginated[_tabName].list = _result.data.list
                this.paginated[_tabName].attrs.count = _result.data.count
            }

            if (data && data.cb) data.cb()
        },
        // 批量删除
        async batchDelete (ids) {
            const _result = await this.$api.goods.destroy({ ids })
            if (_result.succeed === 1 && _result.code === 200) {
                for (const id of ids) {
                    const _index = this.paginated[this.activeName].list.findIndex(v => v.id === id)
                    this.paginated[this.activeName].list.splice(_index, 1)
                }
            }
        },
        // 显示新增界面
        handleAdd () {
            this.$router.push({ path: '/goods/edit', query: { id: 0, isCreating: true } })
        }
    },
    mounted () { }
}
</script>

<style scoped lang="scss">
.tab-container /deep/ .el-tabs__item {
    padding: 10px 20px;
    height: 50px;
}
</style>
