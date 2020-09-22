<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <div class="page-container">
        <!--导航与工具栏-->
        <el-row justify="space-between" type="flex">
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
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="permission:sys_user:view" slot="append"
                                type="primary" />
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <ext-button :label="$t('action.add')" @click="handleAdd" icon="el-icon-ali-add"
                            perms="permission:sys_user:add" type="primary" />
                    </el-form-item>
                    <el-form-item>
                        <el-button-group>
                            <el-tooltip content="刷新" placement="top">
                                <el-button @click="queryForPaginatedList()" icon="el-icon-ali-shuaxin" round>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="列显示" placement="top">
                                <el-button @click="displayFilterColumnsDialog" icon="el-icon-ali-Filter" round>
                                </el-button>
                            </el-tooltip>
                            <el-tooltip content="导出" placement="top">
                                <el-button icon="el-icon-ali-daochu" round></el-button>
                            </el-tooltip>
                        </el-button-group>
                    </el-form-item>
                </el-form>
                <!--表格显示列界面-->
                <table-column-filter-dialog :columns="columns" @handleFilterColumns="handleFilterColumns"
                    ref="tableColumnFilterDialog"></table-column-filter-dialog>
            </el-col>
        </el-row>

        <!--表格内容栏-->
        <ext-table :batchDelete="batchDelete" :columns="columns" :count="paginated.attrs.count" :data="paginated.list"
            :disableIds="disableIds" :operations="operations" :operationWidth="operationWidth"
            :pageSize="paginated.attrs.limit" :permsBatchDelete="permsBatchDelete"
            @queryForPaginatedList="queryForPaginatedList"></ext-table>

        <!--新增编辑界面-->
        <el-dialog :close-on-click-modal="false" :title="isCreating?'新增':'编辑'" :visible.sync="editDialogVisible"
            width="40%">
            <el-form :model="formData" :rules="formDataRules" :size="normalSize" label-position="right"
                label-width="80px" ref="formData">
                <el-row>
                    <el-col :span="14" class="top-bar">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="formData.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pwd">
                            <el-input type="password" v-model="formData.pwd"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="formData.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="头像" prop="attachment">
                            <change-image-icon :imgUrl="formData.attachment? formData.attachment.path:''"
                                @chosedImageIcon="chosedIcon"></change-image-icon>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="14" class="top-bar">
                        <el-form-item label="手机" prop="mobile">
                            <el-input v-model="formData.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="状态" prop="status">
                            <el-switch active-text="正常" inactive-text="禁用" v-model="formData.status"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="角色" prop="roleIds">
                            <el-select multiple placeholder="请选择" style="width:100%" v-model="formData.roleIds">
                                <el-option :key="item.id" :label="item.remark" :value="item.id"
                                    v-for="item in allRoles"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
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
import tableColumnFilterDialog from '@/components/core/table_column_filter_dialog'
import breadCrumb from '@/components/bread_crumb'
import changeImageIcon from '@/components/change_image_icon'

export default {
    components: {
        extTable,
        extButton,
        tableColumnFilterDialog,
        breadCrumb,
        changeImageIcon
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
                key: 'username',
                value: ''
            },
            props: [
                { prop: 'username', label: '用户名' },
                { prop: 'email', label: '邮箱' },
                { prop: 'mobile', label: '手机' }
            ],
            columns: [],
            filterColumns: [],
            paginated: {
                attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                list: []
            },
            operations: [
                {
                    label: 'action.edit', // 按钮上显示的文字
                    icon: 'el-icon-ali-bianji', // 按钮文字前面的图标
                    perms: 'permission:sys_user:edit', // 权限标识
                    size: this.size, // 按钮大小
                    type: 'primary', // 按钮类型
                    func: (row) => {
                        this.editDialogVisible = true
                        this.isCreating = false
                        this.formData = Object.assign(this.formData, row)
                    }
                }, {
                    label: 'action.delete',
                    icon: 'el-icon-ali-shanchu',
                    perms: 'permission:sys_user:delete',
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
            permsBatchDelete: 'permission:sys_user:delete',
            disableIds: [],

            isCreating: false, // true:新增, false:编辑
            editDialogVisible: false, // 新增编辑界面是否显示
            editLoading: false,
            // 新增编辑界面数据
            formData: {
                id: 0,
                username: '',
                attachmentId: 0,
                attachment: {
                    id: 0,
                    path: ''
                },
                pwd: '',
                email: '',
                mobile: '',
                status: 1,
                roles: []
            },
            formDataRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ]
            },
            allRoles: []
        }
    },
    methods: {
        chosedIcon (chosen) {
            this.formData.attachmentId = chosen.id
            this.formData.attachment = chosen
        },
        // 获取分页数据
        async queryForPaginatedList (data) {
            if (data && data.attrs) {
                this.paginated.attrs = data.attrs
            }
            this.paginated.attrs.searchKey = {}
            if (this.filters.key && this.filters.value) {
                this.paginated.attrs.searchKey[this.filters.key] = this.filters.value
            }
            const _result = await this.$api.sysUser.list(this.paginated.attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                for (const _sysUser of _result.data.list) {
                    if (Array.isArray(_sysUser.roles)) {
                        _sysUser.roleNames = _sysUser.roles ? _sysUser.roles.map((v) => v.remark).toString() : ''
                        _sysUser.roleIds = _sysUser.roles ? _sysUser.roles.map(v => v.id) : []
                    }
                }
                this.paginated.list = _result.data.list
                this.paginated.attrs.count = _result.data.count
            }
            if (data && data.cb) { data.cb() }
        },
        // 加载用户角色信息
        async getAllRoles () {
            const _result = await this.$api.role.list()
            if (_result.succeed === 1 && _result.code === 200) {
                // 加载角色集合
                this.allRoles = _result.data.list
            }
        },
        // 批量删除
        async batchDelete (ids) {
            const _result = await this.$api.sysUser.destroy({ ids })
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
                username: '',
                attachmentId: 0,
                attachment: {
                    id: 0,
                    path: ''
                },
                pwd: '',
                email: '',
                mobile: '',
                status: 1,
                roles: []
            }
        },
        // 提交编辑结果
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, this.formData)
                        if (Array.isArray(data.roleIds) && data.roleIds.length > 0) {
                            data.roles = this.allRoles.filter(v => { return data.roleIds.includes(v.id) })
                        }
                        const _result = await this.$api.sysUser.save(data)
                        this.editLoading = false
                        if (_result.succeed === 1 && _result.code === 200) {
                            const _sysUser = _result.data

                            if (Array.isArray(_sysUser.roles)) {
                                _sysUser.roleNames = _sysUser.roles ? _sysUser.roles.map((v) => v.remark).toString() : ''
                                _sysUser.roleIds = _sysUser.roles ? _sysUser.roles.map(v => v.id) : []
                            }
                            const _user = this.paginated.list.find(v => v.id === _sysUser.id)
                            if (!_user) {
                                this.paginated.list.unshift(_sysUser)
                            } else {
                                Object.assign(_user, _sysUser)
                            }

                            if (this.loginUser.id === _sysUser.id) {
                                this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                            }
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
                    })
                }
            })
        },

        // 处理表格列过滤显示
        displayFilterColumnsDialog () {
            this.$refs.tableColumnFilterDialog.setDialogVisible(true)
        },
        // 处理表格列过滤显示
        handleFilterColumns (data) {
            this.filterColumns = data.filterColumns
            this.$refs.tableColumnFilterDialog.setDialogVisible(false)
        },
        // 处理表格列过滤显示
        initColumns () {
            this.columns = [
                { prop: 'id', label: 'ID', minWidth: 60 },
                { prop: 'username', label: '用户名', minWidth: 100, showOverflowTooltip: true },
                { prop: 'attachment.path', label: '头像', minWidth: 80, propType: 'image', align: 'center' },
                { prop: 'roleNames', label: '角色', minWidth: 210, showOverflowTooltip: true },
                { prop: 'email', label: '邮箱', minWidth: 120, showOverflowTooltip: true },
                { prop: 'mobile', label: '手机', minWidth: 100 },
                { prop: 'state', label: '状态', minWidth: 70, formatter: this.env.formatState, align: 'center' }
            ]
            this.filterColumns = Object.assign([], this.columns)
        }
    },
    mounted () {
        this.disableIds.push(this.loginUser.id)
        this.initColumns()
        this.getAllRoles()
    }
}
</script>

<style scoped lang="scss">
</style>
