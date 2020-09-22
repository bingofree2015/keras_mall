<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-17 12:05:53
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
                        <el-date-picker :picker-options="pickerOptions" align="right" end-placeholder="结束日期"
                            range-separator="至" start-placeholder="开始日期" style="width:240px;" type="daterange"
                            unlink-panels v-model="rangeDate"></el-date-picker>
                        <ext-button :label="$t('action.search')" @click="getCollectionList()"
                            icon="el-icon-ali-chazhaobiaodanliebiao" perms="report:goods_collection:view"
                            type="primary" />
                    </el-form-item>
                    <el-form-item>
                        <el-button-group>
                            <el-tooltip content="刷新" placement="top">
                                <el-button @click="getCollectionList()" icon="el-icon-ali-shuaxin" round></el-button>
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
        <ext-table :columns="columns" :data="collectionList" :isPaging="false" :showOperation="false"
            @queryForPaginatedList="getCollectionList"></ext-table>
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
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',

            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        picker.$emit('pick', [start, end])
                    }
                }]
            },
            rangeDate: [Date.now(), (Date.now() + 3600 * 1000 * 24)],

            columns: [
                { prop: 'count', label: '收藏量', minWidth: 80 },
                { prop: 'goods.name', label: '商品名称', minWidth: 360, showOverflowTooltip: true },
                { prop: 'goods.attachment.path', label: '图片', minWidth: 80, propType: 'image', align: 'center' }
            ],
            collectionList: []
        }
    },
    methods: {
        // 获取分页数据
        async getCollectionList (data) {
            const _searchKey = {}
            if (Array.isArray(this.rangeDate) && this.rangeDate.length === 2) {
                _searchKey.createdAt = { $and: { $gte: this.rangeDate[0], $lt: this.rangeDate[1] } }
            }
            const _result = await this.$api.report.getGoodsCollections({ searchKey: _searchKey })
            if (_result.succeed === 1 && _result.code === 200) {
                this.collectionList = _result.data.list
            }
            if (data && data.cb) data.cb()
        }
    },
    mounted () { }
}
</script>

<style scoped lang="scss">
</style>
