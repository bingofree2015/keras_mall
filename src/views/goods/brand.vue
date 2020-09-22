<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-07-27 11:53:15
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
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="goods:brand:view" slot="append"
                                type="primary" />
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <ext-button :label="$t('action.add')" @click="handleAdd" icon="el-icon-ali-add"
                            perms="goods:brand:add" type="primary" />
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
            :permsBatchDelete="permsBatchDelete" @queryForPaginatedList="queryForPaginatedList"></ext-table>

        <!--新增编辑界面-->
        <el-dialog :close-on-click-modal="false" :title="isCreating?'新增':'编辑'" :visible.sync="editDialogVisible"
            width="40%">
            <el-form :model="formData" :rules="formDataRules" :size="normalSize" label-width="80px" ref="formData">
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="排序" prop="sort">
                            <el-input-number :min="0" controls-position="right" label="排序" style="width:100px"
                                v-model="formData.sort"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Logo" prop="attachment">
                            <change-image-icon :imgUrl="formData.attachment ? formData.attachment.path : ''"
                                @chosedImageIcon="chosedLogo"></change-image-icon>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button :size="miniSize" @click.native="editDialogVisible = false" round>{{$t('action.cancel')}}
                </el-button>
                <el-button :loading="editLoading" :size="miniSize" @click="submitForm()" round type="primary">
                    {{$t('action.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import extTable from '@/components/core/ext_table'
import extButton from '@/components/core/ext_button'
import breadCrumb from '@/components/bread_crumb'
import changeImageIcon from '@/components/change_image_icon'

export default {
    components: {
        extTable,
        extButton,
        breadCrumb,
        changeImageIcon
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
                { prop: 'name', label: '品牌名称' }
            ],
            columns: [
                { prop: 'id', label: 'ID', minWidth: 60 },
                { prop: 'name', label: '名称', minWidth: 200 },
                { prop: 'attachment.path', label: 'LOGO', minWidth: 80, propType: 'image', align: 'center' },
                { prop: 'sort', label: '排序', minWidth: 70, align: 'center' },
                { prop: 'createdAt', label: '创建时间', minWidth: 140, formatter: this.env.formatDateTime }
            ],
            paginated: {
                attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 8, count: 0 },
                list: []
            },
            operations: [
                {
                    label: 'action.edit', // 按钮上显示的文字
                    icon: 'el-icon-ali-bianji', // 按钮文字前面的图标
                    perms: 'goods:brand:edit', // 权限标识
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
                    perms: 'goods:brand:delete',
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
            permsBatchDelete: 'goods:brand:delete',

            isCreating: false, // true:新增, false:编辑
            editDialogVisible: false, // 新增编辑界面是否显示
            editLoading: false,
            // 新增编辑界面数据
            formData: {
                id: 0,
                name: '',
                attachmentId: 0,
                attachment: {
                    id: 0,
                    path: ''
                },
                sort: 0
            },
            formDataRules: {
                name: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        chosedLogo (chosen) {
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
            const _result = await this.$api.brand.list(this.paginated.attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginated.list = _result.data.list
                this.paginated.attrs.count = _result.data.count
            }
            if (data && data.cb) data.cb()
        },
        // 批量删除
        async batchDelete (ids) {
            const _result = await this.$api.brand.destroy({ ids })
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
                attachmentId: 0,
                attachment: {
                    id: 0,
                    path: ''
                },
                sort: 0
            }
        },
        // 表单提交
        submitForm () {
            this.$refs.formData.validate(valid => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, this.formData)
                        const _result = await this.$api.brand.save(data)
                        if (_result.succeed === 1 && _result.code === 200) {
                            const _brand = this.paginated.list.find(v => v.id === _result.data.id)
                            if (!_brand) {
                                this.paginated.list.unshift(_result.data)
                            } else {
                                Object.assign(_brand, _result.data)
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
    mounted () { }
}
</script>

<style scoped lang="scss">
</style>
