<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-23 17:59:42
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
                                icon="el-icon-ali-chazhaobiaodanliebiao" perms="form:view" slot="append"
                                type="primary" />
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <ext-button :label="$t('action.add')" @click="handleAdd" icon="el-icon-ali-add" perms="form:add"
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
            :permsBatchDelete="permsBatchDelete" @queryForPaginatedList="queryForPaginatedList" aliasName="form">
        </ext-table>

        <!--报表查看界面-->
        <el-dialog :close-on-click-modal="false" :visible.sync="reportDialogVisible" class="dialog-container"
            title="报表查看" width="40%">
            <el-form :inline="true" :size="miniSize">
                <el-row>
                    <el-col :span="24" style="text-align:right">
                        <el-form-item label="总提交:" prop="totalCount">
                            <b>{{totalCount}}</b>
                        </el-form-item>
                        <el-form-item label="总金额:" prop="totalMoney">
                            <b>{{totalMoney}}</b>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div id="formSubmitChart" style="width: 100%; height: 200px;"></div>
                    </el-col>
                </el-row>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button :size="miniSize" @click.native="reportDialogVisible = false" round type="primary">
                    {{$t('action.submit')}}</el-button>
            </div>
        </el-dialog>

        <el-dialog :close-on-click-modal="false" :visible.sync="qrCodeDialogVisible" title="生成二维码" width="40%">
            <el-row justify="center">
                <el-col :span="24" style="text-align:center">
                    <canvas height="300" id="qrCode" width="300"></canvas>
                </el-col>
            </el-row>
            <div class="dialog-footer" slot="footer">
                <el-button :size="miniSize" @click.native="qrCodeDialogVisible = false" round>{{$t('action.close')}}
                </el-button>
                <el-button :size="miniSize" @click.native="downloadQrCode" round>{{$t('action.download')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import echarts from 'echarts'
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
                    _operationWidth += this.operations.length * 90
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
                { prop: 'name', label: '表单名称' }
            ],
            columns: [
                { prop: 'id', label: 'ID', minWidth: 60 },
                { prop: 'name', label: '表单名称', minWidth: 180, showOverflowTooltip: true },
                { prop: 'desc', label: '表单描述', minWidth: 200, showOverflowTooltip: true },
                { prop: 'type', label: '类型', minWidth: 70, formatter: this.env.columnFormatter },
                { prop: 'isLogin', label: '需要登录', minWidth: 100, align: 'center', formatter: this.env.formatBoolean },
                { prop: 'sort', label: '排序', minWidth: 70, align: 'center' },
                { prop: 'createdAt', label: '创建时间', minWidth: 140, formatter: this.env.formatDateTime }
            ],
            paginated: {
                attrs: { searchKey: {}, currPage: 1, offset: 0, limit: 9, count: 0 },
                list: []
            },
            operations: [
                {
                    label: 'action.qrcode',
                    icon: 'el-icon-ali-qrcode',
                    perms: 'form:delete',
                    size: this.size,
                    func: (row) => {
                        // 生成二维码窗口
                        this.qrCodeDialogVisible = true
                        this.$nextTick(() => {
                            const _qrCode = document.getElementById('qrCode')
                            // 创建image对象
                            const _img = new Image()
                            _img.src = 'http://5b0988e595225.cdn.sohucs.com/images/20171112/93d46c34e1094544b50174797fc5cf99.jpeg'
                            _img.setAttribute('crossOrigin', 'Anonymous')
                            _img.onload = function () {
                                const ctx = _qrCode.getContext('2d')
                                ctx.drawImage(this, 0, 0, 300, 300)
                            }
                        })
                    }
                }, {
                    label: 'action.report',
                    icon: 'el-icon-ali-baobiaotongji',
                    perms: 'form:view',
                    size: this.size,
                    func: (row) => {
                        // 报表
                        this.reportDialogVisible = true
                        this.$nextTick(async () => {
                            await this.drawLine(row.id)
                        })
                    }
                }, {
                    label: 'action.edit', // 按钮上显示的文字
                    icon: 'el-icon-ali-bianji', // 按钮文字前面的图标
                    perms: 'form:edit', // 权限标识
                    size: this.size, // 按钮大小
                    // type: 'primary',            // 按钮类型
                    func: (row) => {
                        this.$router.push({ path: '/form/edit', query: { id: row.id, isCreating: false } })
                    }
                }, {
                    label: 'action.delete',
                    icon: 'el-icon-ali-shanchu',
                    perms: 'form:delete',
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
            permsBatchDelete: 'form:delete',

            reportDialogVisible: false,
            formSubmitChart: null,
            totalCount: 0,
            totalMoney: 0,

            qrCodeDialogVisible: false
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
            const _result = await this.$api.form.list(this.paginated.attrs)
            if (_result.succeed === 1 && _result.code === 200) {
                this.paginated.list = _result.data.list
                this.paginated.attrs.count = _result.data.count
            }
            if (data && data.cb) data.cb()
        },
        // 批量删除
        async batchDelete (ids) {
            const _result = await this.$api.form.destroy({ ids })
            if (_result.succeed === 1 && _result.code === 200) {
                for (const id of ids) {
                    const _index = this.paginated.list.findIndex(v => v.id === id)
                    this.paginated.list.splice(_index, 1)
                }
            }
        },
        // 显示新增界面
        handleAdd () {
            this.$router.push({ path: '/form/edit', query: { id: 0, isCreating: true } })
        },
        async drawLine (formId) {
            this.formSubmitChart = echarts.init(document.getElementById('formSubmitChart'))

            const _result = await this.$api.formSubmit.report({ formId, days: 7 })
            if (_result.succeed === 1 && _result.code === 200) {
                this.totalCount = _result.data.totalCount
                this.totalMoney = _result.data.totalMoney
                this.formSubmitChart.setOption(_result.data.list)
            }
        },
        // 下载二维码图片
        downloadQrCode () {
            const _type = 'png'
            const _qrCode = document.getElementById('qrCode')
            let _qrCodeData = _qrCode.toDataURL(_type)

            const _fixType = function (type) {
                type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg')
                const r = type.match(/png|jpeg|bmp|gif/)[0]
                return 'image/' + r
            }

            _qrCodeData = _qrCodeData.replace(_fixType(_type), 'image/octet-stream')

            const _savaFile = function (data, fileName) {
                const _saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
                _saveLink.href = data
                _saveLink.download = fileName
                const event = document.createEvent('MouseEvents')
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                _saveLink.dispatchEvent(event)
            }
            const _fileName = '' + new Date().getSeconds() + '.' + _type
            // 我想用当前秒是可以解决重名的问题了 不行你就换成毫秒
            _savaFile(_qrCodeData, _fileName)
        }
    },
    mounted () {
        // this.drawLine(0)
    }
}
</script>

<style scoped lang="scss">
</style>
