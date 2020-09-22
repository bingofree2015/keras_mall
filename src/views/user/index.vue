<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-04 13:31:52
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
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="user:view" slot="append"
                                type="primary" />
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <ext-button :label="$t('action.add')" @click="handleAdd" icon="el-icon-ali-add" perms="user:add"
                            type="primary" />
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
            :operations="operations" :operationWidth="operationWidth" :pageSize="paginated.attrs.limit"
            :permsBatchDelete="permsBatchDelete" @queryForPaginatedList="queryForPaginatedList" aliasName="user">
        </ext-table>

        <!--新增编辑界面-->
        <el-dialog :close-on-click-modal="false" :title="isCreating?'新增':'编辑'" :visible.sync="editDialogVisible"
            width="45%">
            <el-form :model="formData" :rules="formDataRules" :size="normalSize" label-width="80px" ref="formData">
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="手机号" prop="mobile">
                            <el-input maxlength="11" show-word-limit v-model="formData.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="formData.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input show-password v-model="formData.password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="头像" prop="attachment">
                            <change-image-icon :imgUrl="formData.attachment ? formData.attachment.path : ''"
                                @chosedImageIcon="chosedLogo"></change-image-icon>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                            <el-select placeholder="请选择" v-model="formData.sex">
                                <el-option :key="item.value" :label="item.label" :value="item.value"
                                    v-for="item in sexOpts"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="生日" prop="birthday">
                            <el-date-picker placeholder="选择日期" type="date" v-model="formData.birthday"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="等级" prop="gradeId">
                            <el-select placeholder="请选择" v-model="formData.gradeId">
                                <el-option :key="item.id" :label="item.name" :value="item.id"
                                    v-for="item in userGrades"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态" prop="state">
                            <el-switch active-text="开启" inactive-text="锁定" v-model="formData.state"></el-switch>
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
import { mapState, mapActions } from 'vuex'
import extButton from '@/components/core/ext_button'
import extTable from '@/components/core/ext_table'
import breadCrumb from '@/components/bread_crumb'
import changeImageIcon from '@/components/change_image_icon'

export default {
    components: {
        extButton,
        extTable,
        breadCrumb,
        changeImageIcon
    },
    computed: {
        ...mapState(['mapAlias']),
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
                key: 'mobile',
                value: ''
            },
            props: [
                { prop: 'mobile', label: '手机号' }
            ],
            columns: [
                { prop: 'id', label: 'ID', minWidth: 60 },
                { prop: 'mobile', label: '手机号', minWidth: 120 },
                { prop: 'userGrade.name', label: '用户等级', minWidth: 100 },
                { prop: 'sex', label: '性别', minWidth: 80, formatter: this.env.columnFormatter },
                { prop: 'birthday', label: '生日', minWidth: 100 },
                { prop: 'avatar', label: '头像', minWidth: 80, propType: 'image', align: 'center' },
                { prop: 'balance', label: '余额', minWidth: 70 },
                { prop: 'point', label: '积分', minWidth: 70 },
                { prop: 'state', label: '状态', minWidth: 70, formatter: this.env.columnFormatter },
                { prop: 'parent.username', label: '推荐人', minWidth: 120 },
                { prop: 'createdAt', label: '创建时间', minWidth: 138, formatter: this.env.formatDateTime }
            ],
            paginated: {
                attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                list: []
            },
            operations: [
                {
                    label: 'action.edit', // 按钮上显示的文字
                    icon: 'el-icon-ali-bianji', // 按钮文字前面的图标
                    perms: 'user:edit', // 权限标识
                    size: this.size, // 按钮大小
                    // type: 'primary',            // 按钮类型
                    func: (row) => {
                        this.editDialogVisible = true
                        this.isCreating = false
                        this.formData = Object.assign({}, row)
                    }
                },
                /**
                 * 修改余额
                 * 修改积分
                 */
                {
                    label: 'action.delete',
                    icon: 'el-icon-ali-shanchu',
                    perms: 'user:delete',
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
            permsBatchDelete: 'user:delete',

            isCreating: false, // true:新增, false:编辑
            editDialogVisible: false, // 新增编辑界面是否显示
            editLoading: false,
            sexOpts: [{ value: -1, label: '保密' }, { value: 0, label: '女' }, { value: 1, label: '男' }],
            userGrades: [],
            // 新增编辑界面数据
            formData: {
                id: 0,
                username: '', // 用户名
                password: '', // 密码 md5(md5()+创建时间)
                mobile: '', // 手机号
                sex: -1, // 1:男 0:女 -1:未知
                birthday: null, // 生日
                avatar: '', // 头像
                nickname: '', // 昵称
                balance: 0, // 余额
                point: 0, // 积分
                gradeId: 1, // 用户等级
                userGrade: {
                    id: 1,
                    name: ''
                },
                state: 1, // 1:正常 2:停用
                pid: 0, // 推荐人
                parent: {
                    id: 0,
                    username: ''
                }
            },
            formDataRules: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                birthday: [
                    { required: true, message: '请选择生日', trigger: 'change' }
                ],
                gradeId: [
                    { required: true, message: '请选择等级', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        // 列内容格式化
        columnFormatter (value, aliasName, column) {
            let _formatText = ''
            if (aliasName && column && value) {
                _formatText = this.mapAlias[aliasName][column][value]
            }
            return _formatText
        },
        chosedLogo (chosen) {
            this.formData.avatar = chosen.path
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
            const _result = await this.$api.user.list(this.paginated.attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginated.list = _result.data.list
                this.paginated.attrs.count = _result.data.count
            }
            if (data && data.cb) data.cb()
        },
        /** 用户等级列表 */
        async getUserGrades () {
            const _result = await this.$api.userGrade.list()
            if (_result.succeed === 1 && _result.code === 200) {
                this.userGrades = _result.data.list
            }
        },
        // 批量删除
        async batchDelete (ids) {
            const _result = await this.$api.user.destroy({ ids })
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
                username: '', // 用户名
                password: '', // 密码 md5(md5()+创建时间)
                mobile: '', // 手机号
                sex: -1, // 1:男 0:女 3:未知
                birthday: null, // 生日
                avatar: '', // 头像
                nickname: '', // 昵称
                balance: 0, // 余额
                point: 0, // 积分
                gradeId: 1, // 用户等级
                userGrade: {
                    id: 1,
                    name: ''
                },
                state: 1, // 1:正常 2:停用
                pid: 0 // 推荐人
            }
        },
        // 编辑
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, this.formData)
                        const _result = await this.$api.user.save(data)
                        if (_result.succeed === 1 && _result.code === 200) {
                            const _user = this.paginated.list.find(v => v.id === _result.data.id)
                            if (!_user) {
                                this.paginated.list.unshift(_result.data)
                            } else {
                                Object.assign(_user, _result.data)
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

                        this.editLoading = false
                        this.$refs.formData.resetFields()
                        this.editDialogVisible = false
                    })
                }
            })
        }
    },
    mounted () {
        this.getUserGrades()
    }
}
</script>

<style scoped lang="scss">
</style>
