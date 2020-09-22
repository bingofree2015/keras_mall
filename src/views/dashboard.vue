<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <div class="page-container">
        <el-row :gutter="10" justify="space-between">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <i class="el-icon-edit"></i> 快捷操作
                    </div>
                    <div>
                        <el-row :gutter="5" justify="space-between">
                            <el-col :span="6">
                                <div class="box-item">
                                    <i class="el-icon-ali-shangpin-copy"></i>
                                    <br />商品
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box-item">
                                    <i class="el-icon-ali-dd"></i>
                                    <br />订单
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box-item">
                                    <i class="el-icon-ali-huiyuanguanli"></i>
                                    <br />会员
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box-item">
                                    <i class="el-icon-ali-gonggaoliebiao"></i>
                                    <br />公告
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" justify="space-between">
                            <el-col :span="6">
                                <div class="box-item">
                                    <i class="el-icon-ali-cuxiao"></i>
                                    <br />促销
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box-item">
                                    <i class="el-icon-ali-icon209"></i>
                                    <br />配送
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box-item">
                                    <i class="el-icon-ali-zhifu"></i>
                                    <br />支付方式
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="box-item">
                                    <i class="el-icon-ali-platform-setting"></i>
                                    <br />平台设置
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <i class="el-icon-ali-daibanshixiang"></i> 待办事项
                    </div>
                    <div class="body">
                        <el-row :gutter="5" justify="space-between">
                            <el-col :span="12">
                                <div class="box-item">
                                    待支付
                                    <br />
                                    <span class="summary">0</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="box-item">
                                    待发货
                                    <br />
                                    <span class="summary">0</span>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" justify="space-between">
                            <el-col :span="12">
                                <div class="box-item">
                                    待售后
                                    <br />
                                    <span class="summary">0</span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="box-item">
                                    库存报警
                                    <br />
                                    <span class="summary">0</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header">
                        <i class="el-icon-ali-banbenxinxi"></i> 版本信息
                    </div>
                    <div class="body">
                        <el-timeline>
                            <el-timeline-item :color="activity.color" :icon="activity.icon" :key="index"
                                :size="activity.size" :timestamp="activity.timestamp" :type="activity.type"
                                v-for="(activity, index) in activities">{{activity.content}}</el-timeline-item>
                        </el-timeline>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <p />

        <el-row :gutter="10" justify="space-between">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <i class="el-icon-ali-dingdantongji"></i> 订单统计
                    </div>
                    <div class="body">
                        <div id="chartColumn" style="width: 100%; height: 400px;"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <i class="el-icon-ali-huiyuantongji"></i> 会员统计
                    </div>
                    <div class="body">
                        <div id="chartColumn2" style="width: 100%; height: 400px;"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p />
        <el-row :gutter="10" justify="space-between">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <i class="el-icon-ali-zuijindenglu"></i> 最近登录
                    </div>
                    <div class="body">
                        <el-table :data="loginLogData" stripe>
                            <el-table-column label="状态" minWidth="60" prop="state"></el-table-column>
                            <el-table-column label="记录时间" minWidth="120" prop="createdAt"></el-table-column>
                            <el-table-column label="登录IP" minWidth="100" prop="ip"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <i class="el-icon-ali-caozuorizhi"></i> 操作日志
                    </div>
                    <div class="body">
                        <el-table :data="operateLogData" stripe>
                            <el-table-column label="操作员" minWidth="100" prop="username"></el-table-column>
                            <el-table-column label="操作时间" minWidth="120" prop="createdAt"></el-table-column>
                            <el-table-column label="操作内容" minWidth="200" prop="content"></el-table-column>
                            <el-table-column label="操作IP" minWidth="100" prop="ip"></el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    components: {},

    created () { },
    data () {
        return {
            loginLogData: [],
            operateLogData: [],
            chartColumn: null,
            activities: [{
                content: '支持使用图标',
                timestamp: '2019-04-12 20:46',
                size: 'large',
                type: 'primary',
                icon: 'el-icon-more'
            }, {
                content: '支持自定义颜色',
                timestamp: '2019-04-03 20:46',
                color: '#0bbd87'
            }]
        }
    },
    methods: {
        drawLine () {
            this.chartColumn = echarts.init(document.getElementById('chartColumn'))

            this.chartColumn.setOption({
                title: { text: 'Column Chart' },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                }]
            })
        },
        drawLine2 () {
            this.chartColumn2 = echarts.init(document.getElementById('chartColumn2'))

            this.chartColumn2.setOption({
                baseOption: {
                    title: {
                        text: '模拟商店一周销售情况',
                        subtext: '虚拟数据'
                    },
                    legend: {
                        data: ['购买金额', '销售金额']
                    },
                    xAxis: {
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {

                    },
                    tooltip: {
                        show: true,
                        formatter: '系列名:{a}<br />类目:{b}<br />数值:{c}'
                    },
                    series: [{
                        name: '购买金额',
                        type: 'bar',
                        data: [200, 312, 431, 241, 175, 275, 369],
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值',
                                    itemStyle: {
                                        normal: {
                                            color: 'green'
                                        }
                                    }
                                }
                            ]
                        }
                    }, {
                        name: '销售金额',
                        type: 'line',
                        data: [321, 432, 543, 376, 286, 298, 400],
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值',
                                    itemStyle: {
                                        normal: {
                                            color: 'blue'
                                        }
                                    }
                                }
                            ]
                        }
                    }]
                },
                media: [
                    {
                        // 小与1000像素时候响应
                        query: {
                            maxWidth: 1000
                        },
                        option: {
                            title: {
                                show: true,
                                text: '测试一下'
                            }
                        }
                    }
                ]
            })
        }
    },
    mounted () {
        this.drawLine()
        this.drawLine2()
    }
}
</script>

<style lang="scss" scoped>
#myChart {
    width: 95%;
    height: 300px;
    margin: 20px auto;
    border: 1px solid #ccc;
}
.page-container /deep/ .box-card {
    .el-card__header {
        text-align: left;
        height: 42px;
        padding: 10px;
        i {
            padding: 0px 5px;
            font-size: 20px;
        }
    }
    .el-card__body {
        text-align: left;
        font-size: 14px;
        .el-col > .box-item {
            background: #f2f6fc;
            border-radius: 4px;
            text-align: center;
            padding: 8px;
            margin: 5px;
            i {
                font-size: 24px;
                border-radius: 4px;
            }
            .summary {
                font-size: 20px;
            }
        }
    }
}
</style>
