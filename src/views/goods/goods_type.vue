<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-07-29 19:09:33
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
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="goods:goods_type:view" slot="append"
                                type="primary" />
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <ext-button :label="$t('action.add')" @click="handleAdd" icon="el-icon-ali-add"
                            perms="goods:goods_type:add" type="primary" />
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
            width="60%">
            <el-form :model="formData" :rules="formDataRules" :size="normalSize" label-width="80px" ref="formData">
                <el-form-item label="类型名称" prop="name">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-tabs v-model="activeName">
                    <el-tab-pane name="params">
                        <span slot="label">
                            <i class="el-icon-ali-shangpincanshu"></i> 商品参数
                        </span>
                        <el-table :data="formData.params" style="width: 100%">
                            <el-table-column label="参数名称" minWidth="240" prop="name">
                                <template slot-scope="scope">
                                    <el-autocomplete :fetch-suggestions="queryParams" :size="miniSize"
                                        @select="((item)=>handleSelectParam(item,scope.row.idx))" placeholder="请输入内容"
                                        v-model="scope.row.name"></el-autocomplete>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="参数类型" minWidth="120" prop="type">
                                <template slot-scope="scope">
                                    <el-select :size="miniSize" placeholder="请选择" v-model="scope.row.type">
                                        <el-option label="文本框" value="text"></el-option>
                                        <el-option label="单选" value="radio"></el-option>
                                        <el-option label="复选框" value="checkbox"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="参数选项" minWidth="280" prop="values">
                                <template slot-scope="scope">
                                    <el-input :size="miniSize" placeholder="空格分隔" v-model="scope.row.values"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" fixed="right" label="操作" minWidth="80">
                                <template slot="header">
                                    <el-button @click.prevent="handleAddParam()" round size="mini" style="float:right"
                                        type="primary">添加</el-button>
                                </template>
                                <template slot-scope="scope">
                                    <el-button @click="handleDeleteParam(scope.row.idx)" circle icon="el-icon-delete"
                                        size="mini" type="danger"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane name="specs">
                        <span slot="label">
                            <i class="el-icon-ali-guige"></i> 商品属性
                        </span>
                        <el-table :data="formData.specs" style="width: 100%">
                            <el-table-column label="属性名称" minWidth="240" prop="name">
                                <template slot-scope="scope">
                                    <el-autocomplete :fetch-suggestions="querySpecs" :size="miniSize"
                                        @select="((item)=>handleSelectSpec(item,scope.row.idx))" placeholder="请输入内容"
                                        v-model="scope.row.name"></el-autocomplete>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="排序" minWidth="160" prop="sort">
                                <template slot-scope="scope">
                                    <el-input-number :max="99" :min="0" :size="miniSize" controls-position="right"
                                        v-model="scope.row.sort"></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column label="属性值" minWidth="280" prop="values">
                                <template slot-scope="scope">
                                    <el-input :size="miniSize" placeholder="空格分隔" v-model="scope.row.values"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" fixed="right" label="操作" minWidth="80">
                                <template slot="header">
                                    <el-button @click.prevent="handleAddSpec()" round size="mini" style="float:right"
                                        type="primary">添加</el-button>
                                </template>
                                <template slot-scope="scope">
                                    <el-button @click="handleDeleteSpec(scope.row.idx)" circle icon="el-icon-delete"
                                        size="mini" type="danger"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
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
                { prop: 'name', label: '类型名称' }
            ],
            columns: [
                { prop: 'id', label: 'ID', minWidth: 60 },
                { prop: 'name', label: '类型名称', minWidth: 80 },
                { prop: 'specValues', label: '属性(规格)', minWidth: 120, showOverflowTooltip: true },
                { prop: 'paramValues', label: '参数', minWidth: 120, showOverflowTooltip: true },
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
                    perms: 'goods:goods_type:edit', // 权限标识
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
                    perms: 'goods:goods_type:delete',
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
            permsBatchDelete: 'goods:goods_type:delete',

            isCreating: false, // true:新增, false:编辑
            editDialogVisible: false, // 新增编辑界面是否显示
            editLoading: false,
            // 新增编辑界面数据
            formData: {
                id: 0,
                name: '',
                specs: [],
                params: []
            },
            formDataRules: {
                name: [
                    { required: true, message: '请输入参数名称', trigger: 'blur' }
                ]
            },
            activeName: 'params'
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
            const _result = await this.$api.goodsType.list(this.paginated.attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginated.list = _result.data.list
                this.paginated.attrs.count = _result.data.count
            }
            if (data && data.cb) data.cb()
        },
        // 批量删除
        async batchDelete (ids) {
            const _result = await this.$api.goodsType.destroy({ ids })
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
                specs: [],
                params: []
            }
        },
        // 显示编辑界面
        handleEdit (data) {
            this.editDialogVisible = true
            this.isCreating = false
            this.formData = Object.assign({}, data.row)
            if (Array.isArray(this.formData.params)) {
                this.formData.params.forEach((v, idx) => {
                    v.idx = idx
                })
            }
            if (Array.isArray(this.formData.specs)) {
                this.formData.specs.forEach((v, idx) => {
                    v.idx = idx
                })
            }
        },
        // 编辑
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, this.formData)
                        const _result = await this.$api.goodsType.save(data)
                        if (_result.succeed === 1 && _result.code === 200) {
                            const _goodsType = this.paginated.list.find(v => v.id === _result.data.id)
                            if (!_goodsType) {
                                this.paginated.list.unshift(_result.data)
                            } else {
                                Object.assign(_goodsType, _result.data)
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
        },
        handleDeleteParam (idx) {
            const index = this.formData.params.findIndex(v => v.idx === idx)
            if (index !== -1) {
                this.formData.params.splice(index, 1)
            }
        },
        handleDeleteSpec (idx) {
            const index = this.formData.specs.findIndex(v => v.idx === idx)
            if (index !== -1) {
                this.formData.specs.splice(index, 1)
            }
        },
        handleAddParam () {
            this.formData.params.push({
                idx: this.formData.params.length,
                id: 0,
                name: `参数 ${this.formData.params.length}`,
                type: 'text',
                values: ''
            })
        },
        handleAddSpec () {
            this.formData.specs.push({
                idx: this.formData.specs.length,
                id: 0,
                name: `属性 ${this.formData.specs.length}`,
                sort: 0
            })
        },
        queryParams (queryString, cb) {
            const _searchKey = queryString ? { name: queryString } : {}
            this.$api.goodsParam.list({ searchKey: _searchKey }).then((result) => {
                if (result.succeed === 1 && result.code === 200) {
                    for (const param of result.data.list) {
                        param.value = param.name
                    }
                }
                cb(result.data.list)
            }).catch((err) => {
                this.$notify.error({
                    title: '错误',
                    message: err
                })
            })
        },
        handleSelectParam (item, idx) {
            const _param = this.formData.params.find(v => v.idx === idx)
            if (_param) {
                Object.assign(_param, item)
            }
            console.log(_param)
        },
        querySpecs (queryString, cb) {
            const _searchKey = queryString ? { name: queryString } : {}
            this.$api.goodsSpec.list({ searchKey: _searchKey }).then((result) => {
                if (result.succeed === 1 && result.code === 200) {
                    for (const param of result.data.list) {
                        param.value = param.name
                    }
                }
                cb(result.data.list)
            }).catch((err) => {
                this.$notify.error({
                    title: '错误',
                    message: err
                })
            })
        },
        handleSelectSpec (item, idx) {
            const _spec = this.formData.specs.find(v => v.idx === idx)
            if (_spec) {
                if (item.values) {
                    item.values = item.values.replace(/\|/g, ' ')
                }
                Object.assign(_spec, item)
            }
        }
    },
    mounted () { }
}
</script>

<style scoped lang="scss">
</style>
