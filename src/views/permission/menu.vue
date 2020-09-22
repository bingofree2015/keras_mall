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
                <el-form :inline="true" :size="miniSize">
                    <el-form-item>
                        <ext-button :label="$t('action.add')" @click="handleAdd" icon="el-icon-ali-add"
                            perms="sys:menu:add" type="primary" />
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

        <!--表格树内容栏-->
        <el-table :data="menuTreeData" :size="miniSize" element-loading-text="$t('action.loading')" stripe
            style="width: 100%;" v-loading="loading">
            <el-table-column label="ID" minWidth="60" prop="id"></el-table-column>
            <table-tree-column @sendTreeData="getTreeData" label="名称" minWidth="180" prop="name" treeKey="id">
            </table-tree-column>
            <el-table-column align="center" label="图标" minWidth="60">
                <template slot-scope="scope">
                    <i :class="scope.row.icon || ''"></i>
                </template>
            </el-table-column>
            <el-table-column align="center" label="类型" minWidth="60" prop="type">
                <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.type === 0">目录</el-tag>
                    <el-tag size="small" type="success" v-else-if="scope.row.type === 1">菜单</el-tag>
                    <el-tag size="small" type="info" v-else-if="scope.row.type === 2">按钮</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上级菜单" minWidth="120" prop="parentName"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="菜单URL" minWidth="150" prop="url"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="授权标识" minWidth="180" prop="perms"></el-table-column>
            <el-table-column align="center" label="排序" prop="orderNum"></el-table-column>
            <el-table-column :label="$t('action.operation')" fixed="right" minWidth="200">
                <template slot-scope="scope">
                    <ext-button :label="$t('action.edit')" @click="handleEdit(scope.row)" icon="el-icon-ali-bianji"
                        perms="sys:menu:edit" />
                    <ext-button :label="$t('action.delete')" @click="handleDelete(scope.row)" icon="el-icon-ali-shanchu"
                        perms="sys:menu:delete" type="danger" />
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增修改界面 -->
        <el-dialog :close-on-click-modal="false" :title="!formData.id ? '新增' : '修改'" :visible.sync="dialogVisible"
            width="40%">
            <el-form :model="formData" :rules="dataRule" :size="normalSize" @keyup.enter.native="submitForm()"
                label-width="80px" ref="formData">
                <el-form-item label="菜单类型" prop="type">
                    <el-radio-group v-model="formData.type">
                        <el-radio :key="index" :label="index" v-for="(type, index) in menuTypeList">{{ type }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="menuTypeList[formData.type] + '名称'" prop="name">
                    <el-input :placeholder="menuTypeList[formData.type] + '名称'" v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单" prop="parentName">
                    <popup-tree-input :currentChangeHandle="handleTreeSelectChange" :data="popupTreeData"
                        :nodeKey="''+formData.parentId"
                        :prop="formData.parentName===null||formData.parentName===''?'顶级菜单':formData.parentName"
                        :props="popupTreeProps"></popup-tree-input>
                </el-form-item>
                <el-form-item label="授权标识" prop="perms" v-if="formData.type !== 0">
                    <el-input placeholder="如: sys:user:add, sys:user:edit, sys:user:delete" v-model="formData.perms">
                    </el-input>
                </el-form-item>
                <el-form-item label="菜单路由" prop="url" v-if="formData.type === 1">
                    <el-row>
                        <el-col :span="14" class="top-bar">
                            <el-input placeholder="菜单路由" v-model="formData.url"></el-input>
                        </el-col>
                        <el-col :span="2" class="icon-list__tips">
                            <el-tooltip effect="light" placement="top" style="padding: 10px;">
                                <div slot="content">
                                    <p>URL格式：</p>
                                    <p>1.常规业务开发的功能URL，如用户管理，Views目录下页面路径为 /system/User, 此处填写 /system/user。</p>
                                    <p>2.嵌套外部网页，如通过菜单打开百度网页，此处填写 http://www.baidu.com，http:// 不可省略。</p>
                                    <p>示例：用户管理：/system/user 嵌套百度：http://www.baidu.com 嵌套网页：http://127.0.0.1:8000</p>
                                </div>
                                <i class="el-icon-warning"></i>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="8">
                            <el-switch active-text="显示" inactive-text="隐藏" v-model="formData.isShow"></el-switch>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="排序编号" prop="orderNum" v-if="formData.type !== 2">
                    <el-input-number :min="0" controls-position="right" label="排序编号" v-model="formData.orderNum">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon" v-if="formData.type !== 2">
                    <el-row>
                        <el-col :span="22">
                            <el-input :readonly="false" class="icon-list__input"
                                placeholder="菜单图标名称（如：el-icon-ali-shouye）" v-model="formData.icon"
                                v-popover:iconListPopover></el-input>
                        </el-col>
                        <el-col :span="2" class="icon-list__tips">
                            <falcon-tooltip />
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button :size="miniSize" @click="dialogVisible = false" round>{{$t('action.cancel')}}</el-button>
                <el-button :size="miniSize" @click="submitForm()" round type="primary">{{$t('action.submit')}}
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import extButton from '@/components/core/ext_button'
import tableTreeColumn from '@/components/core/table_tree_column'
import popupTreeInput from '@/components/popup_tree_input'
import falconTooltip from '@/components/falcon_tooltip'
import breadCrumb from '@/components/bread_crumb'
export default {
    components: {
        popupTreeInput,
        extButton,
        tableTreeColumn,
        falconTooltip,
        breadCrumb
    },
    inject: ['reload'],
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',
            loading: false,
            menuTreeData: [],
            dialogVisible: false,
            menuTypeList: ['目录', '菜单', '按钮'],
            formData: {
                id: 0,
                type: 1,
                name: '',
                parentId: 0,
                parentName: '',
                url: '',
                perms: '',
                orderNum: 0,
                icon: '',
                isShow: true
            },
            dataRule: {
                name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }]
            },
            popupTreeProps: {
                label: 'name',
                children: 'children'
            }
        }
    },
    computed: {
        ...mapState({
            loginUser: state => state.loginUser,
            navTree: state => state.menu.navTree
        }),
        popupTreeData () {
            const _data = removeTreeItemsByType(this.menuTreeData, 2).filter(x => x.parentId === 0)
            const parent = {
                parentId: 0,
                name: '顶级菜单',
                children: _data
            }
            return [parent]
        }
    },

    watch: {
        menuTreeData: { // 深度监听，可监听到对象、数组的变化
            handler (val, oldVal) {
                console.log(`menuTreeData变化: ${oldVal ? oldVal.length : 0} -> ${val ? val.length : 0}`)// 但是这两个值打印出来却都是一样的
            },
            deep: true
        }
    },

    methods: {
        getTreeData (data) {
            if (data) {
                this.menuTreeData = data
            } else {
                console.log('data 这空值')
            }
        },
        // 获取数据
        async findTreeData () {
            this.loading = true
            const _result = await this.$api.menu.getMenuTree()
            if (_result.succeed === 1 && _result.code === 200) {
                this.menuTreeData = _result.data.list
                this.loading = false
            }
        },
        // 显示新增界面
        handleAdd () {
            this.dialogVisible = true
            this.formData = {
                id: 0,
                type: 1,
                typeList: ['目录', '菜单', '按钮'],
                name: '',
                parentId: 0,
                parentName: '',
                url: '',
                perms: '',
                orderNum: 0,
                icon: '',
                isShow: true
            }
        },
        // 显示编辑界面
        handleEdit (row) {
            this.dialogVisible = true
            Object.assign(this.formData, row)
        },
        // 删除
        handleDelete (row) {
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(async () => {
                const params = this.getDeleteIds([], row)
                const _result = await this.$api.menu.destroy({ ids: params })
                if (_result.succeed === 1 && _result.code === 200) {
                    this.menuTreeData = removeTreeItemsByIds(this.menuTreeData, params)
                    this.$store.commit('menuRouteLoaded', false)
                    this.reload()
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success'
                    })
                }
            })
        },
        // 获取删除的包含子菜单的id列表
        getDeleteIds (ids, row) {
            ids.push(row.id)
            if (row.children !== null) {
                for (let i = 0, len = row.children.length; i < len; i++) {
                    this.getDeleteIds(ids, row.children[i])
                }
            }
            return ids
        },
        // 菜单树选中
        handleTreeSelectChange (data, node) {
            this.formData.parentId = data.id
            this.formData.parentName = data.name
        },
        // 图标选中
        iconActiveHandle (iconName) {
            this.formData.icon = iconName
        },
        // 表单提交
        submitForm () {
            this.$refs.formData.validate(valid => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const params = Object.assign({}, this.formData)
                        const _result = await this.$api.menu.save(params)

                        this.editLoading = false
                        if (_result.succeed === 1 && _result.code === 200) {
                            const _parentId = _result.data.parentId
                            const _parentTreeItem = getTreeItemById(this.menuTreeData, _parentId)

                            if (_parentTreeItem && Array.isArray(_parentTreeItem.children)) {
                                const _treeItem = _parentTreeItem.children.filter(v => v.id === _result.data.id)
                                if (_treeItem.length === 0) {
                                    _result.data.level = _parentId === 0 ? 1 : (_parentTreeItem.level + 1)
                                    _parentTreeItem.children.push(_result.data)
                                } else {
                                    Object.assign(_treeItem[0], _result.data)
                                }

                                if (_parentTreeItem._expanded) {
                                    if (_treeItem.length === 0) {
                                        const _preTreeItem = _parentTreeItem.children.length > 1 ? _parentTreeItem.children[_parentTreeItem.children.length - 2] : _parentTreeItem
                                        this.menuTreeData = this.menuTreeData.splice(0, this.menuTreeData.findIndex((v) => (v.id === _preTreeItem.id)) + 1).concat(_result.data).concat(this.menuTreeData)
                                    } else {
                                        const _filterItem = this.menuTreeData.filter(v => v.id === _result.data.id)
                                        Object.assign(_filterItem[0], _result.data)
                                    }
                                }
                            } else {
                                const _treeItem = this.menuTreeData.filter(v => v.id === _result.data.id)
                                if (_treeItem.length === 0) {
                                    _result.data.level = 1
                                    this.menuTreeData.push(_result.data)
                                } else {
                                    Object.assign(_treeItem[0], _result.data)
                                }
                            }
                            // console.log('保存后的menuTreeData: ', this.menuTreeData)
                            this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                            // this.reload()
                            this.$notify({
                                title: '成功',
                                message: _result.description,
                                type: 'success'
                            })
                            this.$refs.formData.resetFields()
                            this.dialogVisible = false
                        } else {
                            this.$notify({
                                title: '失败',
                                message: _result.description,
                                type: 'error'
                            })
                        }
                    })
                }
            })
        }
    },
    mounted () {
        this.findTreeData()
    }
}

function getTreeItemById (treeDatas, id) {
    let childTreeItem, treeItem, i
    for (i = treeDatas.length; i;) {
        treeItem = treeDatas[--i]
        if (id === treeItem.id) return treeItem
        if (treeItem.children) {
            childTreeItem = getTreeItemById(treeItem.children, id)
            if (childTreeItem) return childTreeItem
        }
    }
}

function removeTreeItemsByIds (treeDatas, ids) {
    const _treeItemDatas = treeDatas.filter(x => !ids.includes(x.id))
    _treeItemDatas.forEach(x => x.children && (x.children = removeTreeItemsByIds(x.children, ids)))
    return _treeItemDatas
}

function removeTreeItemsByType (treeDatas, type = 2) {
    const _treeItemDatas = _.cloneDeep(treeDatas.filter(x => x.type < type))
    _treeItemDatas.forEach(x => x.children && (x.children = removeTreeItemsByType(x.children, type)))
    return _treeItemDatas
}
</script>

<style scoped lang="scss">
</style>
