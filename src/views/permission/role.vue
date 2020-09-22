<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
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
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="permission:role:view" slot="append"
                                type="primary" />
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <ext-button :label="$t('action.add')" @click="handleAdd" icon="el-icon-ali-add"
                            perms="permission:role:add" type="primary" />
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
        <ext-table :batchDelete="batchDelete" :columns="columns" :count="paginated.attrs.count" :data="paginated.list"
            :disableIds="disableIds" :highlightCurrentRow="true" :operations="operations"
            :operationWidth="operationWidth" :pageSize="paginated.attrs.limit" :permsBatchDelete="permsBatchDelete"
            :stripe="false" @handleCurrentRowChange="handleRoleSelectChange"
            @queryForPaginatedList="queryForPaginatedList"></ext-table>

        <!--角色菜单，表格树内容栏-->
        <el-container class="role-menu-container">
            <el-header style="height:38px">
                <span style="float:left">角色授权</span>
                <el-checkbox :disabled="(this.selectRole.id === null|| this.disableIds.includes(this.selectRole.id))"
                    :size="miniSize" @change="handleCheckAll" v-model="checkAll">
                    <b>全选</b>
                </el-checkbox>
                <ext-button :disabled="(this.selectRole.id === null|| this.disableIds.includes(this.selectRole.id))"
                    :label="$t('action.reset')" @click="resetSelection" perms="permission:role:edit" type="primary" />
                <ext-button :disabled="(this.selectRole.id === null|| this.disableIds.includes(this.selectRole.id))"
                    :label="$t('action.submit')" :loading="authLoading" @click="submitAuthForm"
                    perms="permission:role:edit" type="primary" />
            </el-header>
            <el-main style="padding:0px">
                <el-tree :data="menuData" :props="defaultProps"
                    :show-checkbox="!this.disableIds.includes(this.selectRole.id)" :size="miniSize"
                    element-loading-text="拼命加载中" node-key="id" ref="menuTree" v-loading="menuLoading">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <i style="margin:0px 8px;" v-bind:class="data.icon"></i>
                        {{ node.label }}
                    </span>
                </el-tree>
            </el-main>
        </el-container>

        <!--新增编辑界面-->
        <el-dialog :close-on-click-modal="false" :title="isCreating?'新增':'编辑'" :visible.sync="editDialogVisible"
            width="40%">
            <el-form :model="formData" :rules="formDataRules" :size="normalSize" label-width="80px" ref="formData">
                <el-form-item label="ID" prop="id" v-if="false">
                    <el-input :disabled="true" auto-complete="off" v-model="formData.id"></el-input>
                </el-form-item>
                <el-form-item label="角色名" prop="name">
                    <el-input auto-complete="off" v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="备注 " prop="remark">
                    <el-input auto-complete="off" type="textarea" v-model="formData.remark"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button :size="miniSize" @click.native="editDialogVisible = false" round>{{$t('action.cancel')}}
                </el-button>
                <el-button :loading="editLoading" :size="miniSize" @click.native="submitForm" round type="primary">
                    {{$t('action.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
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
        ...mapState({
            loginUser: state => state.loginUser
        }),
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
                { prop: 'name', label: '角色名' },
                { prop: 'remark', label: '备注' },
                { prop: 'createBy', label: '创建人' }
            ],
            columns: [
                { prop: 'id', label: 'ID', minWidth: 60 },
                { prop: 'name', label: '角色名', minWidth: 80 },
                { prop: 'remark', label: '备注', minWidth: 200 },
                { prop: 'createdAt', label: '创建时间', minWidth: 140, formatter: this.env.formatDateTime }
            ],
            paginated: {
                attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                list: []
            },
            operations: [
                {
                    label: 'action.edit', // 按钮上显示的文字
                    icon: 'el-icon-ali-bianji', // 按钮文字前面的图标
                    perms: 'permission:role:edit', // 权限标识
                    size: this.size, // 按钮大小
                    // type: 'primary',            // 按钮类型
                    func: (row) => {
                        this.editDialogVisible = true
                        this.isCreating = false
                        this.formData = Object.assign({}, row)
                    }
                }, {
                    label: 'action.delete',
                    icon: 'el-icon-ali-shanchu',
                    perms: 'permission:role:delete',
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
            permsBatchDelete: 'permission:role:delete',
            disableIds: [1],

            isCreating: false, // true:新增, false:编辑
            editDialogVisible: false, // 新增编辑界面是否显示
            editLoading: false,
            // 新增编辑界面数据
            formData: {
                id: 0,
                name: '',
                remark: ''
            },
            formDataRules: {
                name: [
                    { required: true, message: '请输入角色名', trigger: 'blur' }
                ]
            },
            selectRole: {},
            menuData: [],
            menuSelections: [],
            menuLoading: false,
            authLoading: false,
            checkAll: false,
            currentRoleMenus: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
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
            const _result = await this.$api.role.list(this.paginated.attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginated.list = _result.data.list
                this.paginated.attrs.count = _result.data.count
            }
            if (data && data.cb) data.cb()
        },
        // 批量删除
        async batchDelete (ids) {
            const _result = await this.$api.role.destroy({ ids })
            if (_result.succeed === 1 && _result.code === 200) {
                for (const id of ids) {
                    const _index = this.paginated.list.findIndex(v => v.id === id)
                    this.paginated.list.splice(_index, 1)
                }
            }
        },
        // 显示新增界面
        handleAdd () {
            this.editDialogVisible = true
            this.isCreating = true
            this.formData = {
                id: 0,
                name: '',
                remark: ''
            }
        },
        // 编辑
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, this.formData)
                        const _result = await this.$api.role.save(data)

                        this.editLoading = false
                        if (_result.succeed === 1 && _result.code === 200) {
                            this.$notify({
                                title: '成功',
                                message: _result.description,
                                type: 'success'
                            })
                            this.editDialogVisible = false
                            this.$refs.formData.resetFields()
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: _result.description
                            })
                        }
                        await this.queryForPaginatedList()
                    })
                }
            })
        },
        // 获取菜单数据
        async getMenuTree () {
            this.menuLoading = true
            const _result = await this.$api.menu.getMenuTree()
            if (_result.succeed === 1 && _result.code === 200) {
                this.menuData = _result.data.list
                this.menuLoading = false
            }
        },
        // 角色选择改变监听
        async handleRoleSelectChange (row) {
            if (row) {
                // 返回树结构数据中的所有叶子节点数组
                const _getLeafNode = (treeData, leafData) => {
                    for (const item of treeData) {
                        const _subTreeData = treeData.filter(v => v.parentId === item.id)
                        if (_subTreeData.length === 0) {
                            leafData.push(item)
                        } else {
                            _getLeafNode(_subTreeData, leafData)
                        }
                    }
                    return leafData
                }

                this.selectRole = row
                const _result = await this.$api.role.getMenusByRoleId({ roleId: row.id })
                if (_result.succeed === 1 && _result.code === 200) {
                    let _leafNodes = []
                    _leafNodes = _getLeafNode(_result.data.list, _leafNodes)
                    this.currentRoleMenus = _leafNodes
                    this.$refs.menuTree.setCheckedNodes(_leafNodes)
                }
            }
        },
        // 重置选择
        resetSelection () {
            this.checkAll = false
            this.$refs.menuTree.setCheckedNodes(this.currentRoleMenus)
        },
        // 全选操作
        handleCheckAll () {
            if (this.checkAll) {
                const allMenus = []
                this.checkAllMenu(this.menuData, allMenus)
                this.$refs.menuTree.setCheckedNodes(allMenus)
            } else {
                this.$refs.menuTree.setCheckedNodes([])
            }
        },
        // 递归全选
        checkAllMenu (menuData, allMenus) {
            menuData.forEach(menu => {
                allMenus.push(menu)
                if (menu.children) {
                    this.checkAllMenu(menu.children, allMenus)
                }
            })
        },
        // 角色菜单授权提交 ( 更新 菜单 与 权限 )
        submitAuthForm () {
            const roleId = this.selectRole.id
            this.authLoading = true
            const checkedNodes = this.$refs.menuTree.getCheckedNodes(false, true)
            const roleMenus = []
            for (let i = 0, len = checkedNodes.length; i < len; i++) {
                const roleMenu = { roleId: roleId, menuId: checkedNodes[i].id }
                roleMenus.push(roleMenu)
            }
            this.$api.role.saveRoleMenus({ roleId, roleMenus }).then((result) => {
                if (result.succeed === 1 && result.code === 200) {
                    if (this.loginUser.roles.find(v => v.id === roleId)) {
                        this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                    }
                    this.$notify({
                        title: '成功',
                        message: result.description,
                        type: 'success'
                    })
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: result.description
                    })
                }
                this.authLoading = false
            })
        },
        renderContent (h, { node, data, store }) {
            return (
                <el-row style="width:98%">
                    <el-col span={4}>
                        <el-tag type={data.type === 0 ? '' : data.type === 1 ? 'success' : 'info'} size="small">
                            {data.name}
                        </el-tag>
                    </el-col>
                    <el-col span={3}>
                        <i class={data.icon}></i>
                        {data.parentName ? data.parentName : '顶级菜单'}
                    </el-col>
                    <el-col span={17}>{data.url ? data.url : '\t'}</el-col>
                </el-row>)
        }
    },
    mounted () { this.getMenuTree() }
}
</script>
<style  lang="scss" scoped>
.page-container /deep/ .role-menu-container {
    margin-left: 10px;
    width: 60%;
}

.role-menu-container /deep/ .el-header {
    text-align: right;
    border-bottom: 2px solid #dcdfe6;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 13px;
    padding-right: 8px;
}
</style>
