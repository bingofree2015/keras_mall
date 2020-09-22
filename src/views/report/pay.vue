<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-18 21:14:57
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
                        <el-form-item label="粒度" prop="unit">
                            <el-radio-group v-model="unit">
                                <el-radio :label="0" style="margin-right:5px;">小时</el-radio>
                                <el-radio :label="1">天</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <ext-button :label="$t('action.search')" @click="drawLine()"
                            icon="el-icon-ali-chazhaobiaodanliebiao" perms="report:goods_collection:view"
                            type="primary" />
                    </el-form-item>
                    <el-form-item>
                        <el-button-group>
                            <el-tooltip content="刷新" placement="top">
                                <el-button @click="drawLine()" icon="el-icon-ali-shuaxin" round></el-button>
                            </el-tooltip>
                            <el-tooltip content="导出" placement="top">
                                <el-button icon="el-icon-ali-daochu" round></el-button>
                            </el-tooltip>
                        </el-button-group>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <!--图表区-->
        <el-row>
            <el-col :span="24">
                <div id="payChart" style="width: 100%; height: 400px;"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import echarts from 'echarts'
import extButton from '@/components/core/ext_button'
import breadCrumb from '@/components/bread_crumb'
export default {
    components: {
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
            unit: 0,

            payChart: null
        }
    },
    methods: {
        async drawLine () {
            this.payChart = echarts.init(document.getElementById('payChart'))

            let _startTime = Date.now()
            let _endTime = _startTime + 3600 * 1000 * 24
            if (Array.isArray(this.rangeDate) && this.rangeDate.length === 2) {
                _startTime = this.rangeDate[0]
                _endTime = this.rangeDate[1]
            }

            const _result = await this.$api.report.getPayData({ startTime: _startTime, endTime: _endTime, unit: this.unit })
            if (_result.succeed === 1 && _result.code === 200) {
                this.payChart.setOption(_result.data)
            }
        }
    },
    mounted () {
        this.drawLine()
    }
}
</script>

<style scoped lang="scss">
</style>
