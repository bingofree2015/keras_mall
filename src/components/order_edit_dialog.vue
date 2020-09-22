<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-09-26 21:06:28
-->
<template>
    <el-dialog :close-on-click-modal="false" :modal="false" @open="openDialog" title="订单编辑" v-bind="$attrs"
        v-on="$listeners" width="50%">
        <el-form :model="formData" :size="miniSize" label-width="120px" ref="formData">
            <template v-if="formData.store">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="订单号" prop="orderId">{{formData.orderId}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收货门店" prop="storeId">
                            <el-select placeholder="请选择" v-model="formData.storeId">
                                <el-option :key="item.id" :label="item.storeName" :value="item.id"
                                    v-for="item in stores"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收货人姓名" prop="shipName">
                            <el-input placeholder="请输入收货人姓名" v-model="formData.shipName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="提货人电话" prop="shipMobile">
                            <el-input placeholder="请输入提货人电话" v-model="formData.shipMobile"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </template>
            <template v-else>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="订单号" prop="orderId">{{formData.orderId}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收货区域" prop="shipAreaId">
                            <el-cascader :options="areas" :props="cascaderProps" :show-all-levels="false"
                                v-model="formData.shipAreaId"></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收货人姓名" prop="shipName">
                            <el-input placeholder="请输入提货人电话" v-model="formData.shipName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收货地址" prop="shipAddress">
                            <el-input placeholder="请输入收货地址" v-model="formData.shipAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收货人电话" prop="shipMobile">
                            <el-input placeholder="请输入收货地址" v-model="formData.shipMobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单总金额" prop="orderAmount">
                            <el-input placeholder="请输入收货地址" v-model="formData.orderAmount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </template>
        </el-form>
        <div class="dialog-footer" slot="footer">
            <el-button :size="miniSize" @click.native="$emit('update:visible', false)" round>{{$t('action.cancel')}}
            </el-button>
            <el-button :loading="loading" :size="miniSize" @click.native="submitForm" round type="primary">
                {{$t('action.submit')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'OrderEditDialog',
    components: {},
    props: {
        orderId: {
            type: String,
            required: true
        }
    },
    computed: {

    },
    data () {
        return {
            normalSize: 'small',
            miniSize: 'mini',

            loading: false,

            // 编辑界面数据
            stores: [],

            cascaderProps: {
                label: 'name',
                value: 'id',
                children: 'children'
            },
            areas: [],
            formData: {
                id: 0,
                orderId: '', // 订单号
                store: {
                    id: 0
                }, // 收货门店
                shipName: '', // 收货人姓名
                shipMobile: '', // 提货人电话

                shipAreaId: '', // 收货区域
                shipAddress: '', // 收货地址
                orderAmount: '' // 订单总金额
            },
            formDataRules: {
                shipName: [
                    { required: true, message: '请输入收货人姓名', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        openDialog () {
            this.$nextTick(async () => {
                // 基于 orderId  向服务器请求 订单明细数据
                if (this.orderId) {
                    await this.getAreas()
                    await this.getStores()
                    await this.getOrderDetail(this.orderId)
                }
            })
        },
        async getStores () {
            const _result = await this.$api.store.list({})
            if (_result.succeed === 1 && _result.code === 200) {
                this.stores = _result.data.list
            }
        },
        /**
         * 地区列表
         */
        async getAreas () {
            const _result = await this.$api.area.getTree()
            if (_result.succeed === 1 && _result.code === 200) {
                this.areas = _result.data.list
            }
        },
        async getOrderDetail (orderId) {
            const _result = await this.$api.order.get({ orderId, type: 0 })
            if (_result.succeed === 1 && _result.code === 200) {
                Object.assign(this.formData, _result.data)
            }
        },
        // 编辑
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.loading = true
                        const data = Object.assign({}, this.formData)
                        const _result = await this.$api.order.save(data)
                        this.loading = false
                        if (_result.succeed === 1 && _result.code === 200) {
                            this.$notify({
                                title: '成功',
                                message: _result.description,
                                type: 'success'
                            })
                            this.$refs.formData.resetFields()
                            this.$emit('update:visible', false)
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: _result.description
                            })
                        }
                    })
                }
            })
        }
    },
    async mounted () {

    }
}
</script>

<style scoped lang="scss">
</style>
