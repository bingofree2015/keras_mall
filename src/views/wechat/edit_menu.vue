<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-19 12:29:07
-->
<template>
    <div class="page-container">
        <!--导航与工具栏-->
        <el-row>
            <el-col :span="10">
                <bread-crumb></bread-crumb>
            </el-col>
            <el-col :span="14" class="top-bar"></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="9">
                <!-- 菜单预览界面 -->
                <el-container>
                    <el-header>{{weixinTitle}}</el-header>
                    <el-main></el-main>
                    <el-footer>
                        <el-menu :default-active="activeIndex" @select="handleSelect" mode="horizontal">
                            <el-submenu :index="idx.toString()" :key="idx" @mouseout.native="()=>{}"
                                @mouseover.native="()=>{}" class="sub-menu" v-for="(btn,idx) in menuConfig.button">
                                <template slot="title">
                                    <el-link :underline="false" @click.stop="editMenu(idx)">{{btn.name}}</el-link>
                                    <el-tag @close="deleteMenu(idx)" closable></el-tag>
                                </template>
                                <el-menu-item :index="idx+'_'+subIdx" :key="idx+'_'+subIdx" class="sub-menu-item"
                                    v-for="(subBtn,subIdx) in btn.sub_button">
                                    <el-row justify="space-between" type="flex">
                                        <el-col :span="20">
                                            <el-link :underline="false" @click.stop="editMenu(idx, subIdx)">
                                                {{subBtn.name}}</el-link>
                                        </el-col>
                                        <el-col :span="4">
                                            <el-tag @close="deleteMenu(idx, subIdx)" closable></el-tag>
                                        </el-col>
                                    </el-row>
                                </el-menu-item>
                                <el-menu-item :index="idx+'_addSubMenu'" v-if="btn.sub_button.length < 5">
                                    <i class="el-icon-ali-zengjia"></i>
                                    <span slot="title">添加</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item index="add" v-if="menuConfig.button.length < 3">
                                <i class="el-icon-ali-zengjia"></i>
                                <span slot="title">添加</span>
                            </el-menu-item>
                        </el-menu>
                    </el-footer>
                </el-container>
            </el-col>
            <el-col :span="8">
                <el-container class="edit-dialog-container" v-if="editingMenuItem">
                    <el-header>菜单编辑界面</el-header>
                    <el-main>
                        <!-- 菜单编辑界面 -->
                        <el-form :model="editingMenuItem" :rules="formDataRules" :size="normalSize" label-width="80px"
                            ref="formData">
                            <el-form-item label="菜单名称" prop="name">
                                <el-input v-model="editingMenuItem.name"></el-input>
                            </el-form-item>
                            <el-form-item label="动作类型" prop="type">
                                <el-select placeholder="请选择动作类型" v-model="editingMenuItem.type">
                                    <el-option :key="item.value" :label="item.label" :value="item.value"
                                        v-for="item in menuTypes"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="关键字" prop="keyword">
                                <el-input v-model="editingMenuItem[editingMenuItem.type]"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-main>
                    <el-footer class="footer">
                        <el-button :loading="editLoading" :size="miniSize" @click="submitForm()" round type="primary">
                            {{$t('action.submit')}}</el-button>
                    </el-footer>
                </el-container>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import validator from 'validator'
import breadCrumb from '@/components/bread_crumb'
export default {
    components: {
        breadCrumb
    },
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',
            weixinTitle: '公众号菜单设置',
            activeIndex: '1',
            // 菜单对象
            menuConfig: {
                button: []
            },
            menuTypes: [{
                label: '关键字',
                value: 'click'
            }, {
                label: '跳转网页',
                value: 'view'
            }, {
                label: '跳转小程序',
                value: 'miniprogram'
            }],
            editLoading: false,
            // 新增编辑界面数据
            editingMenuItem: null,
            formDataRules: {
                name: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSelect (key, keyPath) {
            console.log(key, keyPath)
            if (key === 'add') {
                // 添加主菜单
                this.menuConfig.button.push({
                    name: `菜单名称 ${this.menuConfig.button.length}`, sub_button: []
                })
            } else {
                // 处理用户点击了哪一个菜单，执行编辑
                const _idxs = key.split('_')
                if (_idxs.length === 2) {
                    if (_idxs[1] === 'addSubMenu') {
                        // 添加子菜单
                        let _idx = _idxs[0]
                        this.menuConfig.button[_idx].sub_button.push({
                            name: `子菜单名称 ${this.menuConfig.button[_idx].sub_button.length}`
                        })
                    }
                }
            }
        },
        // 删除菜单
        deleteMenu (idx, subIdx) {
            if (idx >= 0 && subIdx >= 0) {
                this.menuConfig.button[idx].sub_button.splice(subIdx, 1)
            } else if (idx >= 0) {
                this.menuConfig.button.splice(subIdx, 1)
            }
        },
        // 编辑菜单
        editMenu (idx, subIdx) {
            if (idx >= 0 && subIdx >= 0) {
                this.editingMenuItem = this.menuConfig.button[idx].sub_button[subIdx]
            } else if (idx >= 0) {
                this.editingMenuItem = this.menuConfig.button[idx]
            }
        },
        // 表单提交
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true
                        const data = Object.assign({}, this.menuConfig)

                        const _result = await this.$api.setting.save({ key: 'mp_menu_config', value: data })
                        if (_result.succeed === 1 && _result.code === 200) {
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
                    })
                }
            })
        },

        async getSettings () {
            const _result = await this.$api.setting.get({ key: 'mp_menu_config' })
            if (_result.succeed === 1 && _result.code === 200) {
                Object.assign(this.menuConfig, _result.data)
                console.log(this.menuConfig)
            }
        }
    },
    async mounted () {
        await this.getSettings()
    }
}
</script>

<style scoped lang="scss">
.el-container {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    min-width: 320px;
    min-height: 540px;
}
.el-header {
    text-align: center;
    line-height: 60px;
}
.sub-menu /deep/ .el-submenu__title {
    padding: 0 8px;
    .el-tag {
        border-width: 0px;
        padding: 0px;
        background-color: #fff;
        font-size: 14px;
    }
}

.sub-menu-item /deep/ .el-tag {
    border-width: 0px;
    padding: 0px;
    background-color: #fff;
    font-size: 14px;
}
</style>
