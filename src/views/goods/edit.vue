<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-04-02 10:20:31
-->
<template>
	<div class="page-container">
		<!--新增编辑界面-->
		<el-form :model="formData" :rules="formDataRules" :size="normalSize" class="edit-dialog-container" label-width="80px" ref="formData">
			<el-row>
				<el-col :span="24">
					<bread-crumb></bread-crumb>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="18">
					<el-tabs>
						<el-tab-pane>
							<span slot="label">
								<i class="el-icon-ali-jichuxinxi"></i> 基础信息
							</span>
							<el-row>
								<el-col :span="10">
									<el-form-item label="商品分类" prop="goodsCatId">
										<el-cascader :options="goodsCatList" :props="cascaderProps" :show-all-levels="false" v-model="formData.goodsCatId"></el-cascader>
									</el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="商品品牌" prop="brandId">
										<el-select placeholder="请选择品牌" v-model="formData.brandId">
											<el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in brandList"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="16">
									<el-form-item label="商品名称" prop="name">
										<el-input placeholder="请输入商品名称" v-model="formData.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="商品编号" prop="bn">
										<el-input placeholder="请输入商品编号" v-model="formData.bn"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="商品简介" prop="brief">
								<el-input :autosize="{ minRows: 2, maxRows: 4}" maxlength="1024" placeholder="请输入商品简介" show-word-limit type="textarea" v-model="formData.brief"></el-input>
							</el-form-item>
							<el-form-item label="商品主图" prop="attachment">
								<change-image-icon :imgUrl="formData.attachment ? formData.attachment.path : ''" :initStyle="{height: '80px', width: '80px',border: '1px dashed #d9d9d9', borderRadius: '4px'}" @chosedImageIcon="chosedImage"></change-image-icon>
							</el-form-item>
							<el-card class="goods-attachments-box">
								<div class="header" slot="header">
									<span>其它图片列表</span>
								</div>
								<el-row>
									<el-col :span="24">
										<draggable-image-list :items="formData.goodsAttachments" :size="74" @chosedImage="addGoodsAttachments" @end="end" @onRemove="onRemove"></draggable-image-list>
									</el-col>
								</el-row>
							</el-card>
						</el-tab-pane>
						<el-tab-pane>
							<span slot="label">
								<i class="el-icon-ali-xiaoshouxinxi"></i> 销售信息
							</span>
							<el-row>
								<el-col :span="12">
									<el-form-item label="商品类型" prop="goodsTypeId">
										<el-select @change="handleChangeGoodsType" placeholder="请选择类型" v-model="formData.goodsTypeId">
											<el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in goodsTypeList"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="开启规格" prop="openSpec">
										<el-switch active-text="开启" inactive-text="关闭" v-model="formData.openSpec"></el-switch>
									</el-form-item>
								</el-col>
							</el-row>
							<!-- 商品参数 -->
							<div class="goods-params">
								<el-divider content-position="left">商品参数</el-divider>
								<el-form-item :key="idx" :label="param.name" v-for="(param,idx) in formData.goodsType.params">
									<el-input placeholder="请输入参数值" v-if="param.type === 'text'" v-model="param.values"></el-input>
									<el-radio-group v-else-if="param.type === 'radio' && param.optionalValues" v-model="param.values">
										<el-radio :key="key" :label="item" v-for="(item,key) in param.optionalValues.split(' ')">{{item}}</el-radio>
									</el-radio-group>
									<el-checkbox-group v-else-if="param.type === 'checkbox' && param.optionalValues" v-model="param.values">
										<el-checkbox :key="key" :label="item" v-for="(item,key) in param.optionalValues.split(' ')"></el-checkbox>
									</el-checkbox-group>
								</el-form-item>
							</div>
							<!-- 商品规格 -->
							<div class="goods-specs" v-if="formData.openSpec">
								<el-form-item :key="idx" :label="spec.name" prop="name" v-for="(spec,idx) in formData.goodsType.specs">
									<el-row>
										<el-col :key="key" :span="6" style="margin-right:10px" v-for="(item,key) in spec.values">
											<el-form-item prop="value">
												<el-input placeholder="请输入内容" v-model="item.value">
													<el-checkbox slot="prepend" v-model="item.checked"></el-checkbox>
												</el-input>
											</el-form-item>
										</el-col>
									</el-row>
								</el-form-item>
								<el-form-item label="生成规格">
									<ext-button :size="miniSize" @click="handleBuildProducts()" icon="el-icon-ali-goujian" label="生成规格" type="primary" />
								</el-form-item>
								<el-table :data="formData.products" :size="miniSize" stripe style="width: 100%">
									<el-table-column label="默认" min-width="50" prop="id">
										<template slot-scope="scope">
											<el-radio :label="scope.row.id" @change="handleSetDefault(scope.row)" v-model="formData.defaultProduct">&nbsp;</el-radio>
										</template>
									</el-table-column>
									<el-table-column label="图片" min-width="50" prop="attachment">
										<template slot-scope="scope">
											<change-image-icon :imgUrl="scope.row['attachment']?scope.row['attachment'].path:''" :initStyle="{height: '40px', width: '40px',border: '1px dashed #d9d9d9', borderRadius: '4px'}" @chosedImageIcon="(chosed)=>{chosedProductImage(scope.row,chosed)}"></change-image-icon>
										</template>
									</el-table-column>
									<el-table-column label="货号" min-width="140" prop="sn">
										<template slot-scope="scope">
											<el-input :size="miniSize" placeholder="请输入货号" v-model="scope.row['sn']"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="规格" min-width="120" prop="specs" show-overflow-tooltip></el-table-column>
									<el-table-column label="库存" min-width="50" prop="stock"></el-table-column>
									<el-table-column label="库存增减量" min-width="160" prop="dynamicStock">
										<template slot-scope="scope">
											<el-input :size="miniSize" class="switch-container" placeholder="增减" v-model.number="scope.row['dynamicStock']">
												<el-switch active-text="+" inactive-text="-" slot="append" v-model="scope.row['dynamicStockDirection']"></el-switch>
											</el-input>
										</template>
									</el-table-column>
									<el-table-column label="销售价" min-width="90" prop="price">
										<template slot-scope="scope">
											<el-input :size="miniSize" placeholder="请输入销售价" v-model="scope.row['price']"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="成本价" min-width="90" prop="costPrice">
										<template slot-scope="scope">
											<el-input :size="miniSize" placeholder="请输入成本价" v-model="scope.row['costPrice']"></el-input>
										</template>
									</el-table-column>
									<el-table-column label="市场价" min-width="90" prop="mktPrice">
										<template slot-scope="scope">
											<el-input :size="miniSize" placeholder="请输入市场价" v-model="scope.row['mktPrice']"></el-input>
										</template>
									</el-table-column>
									<el-table-column fixed="right" label="操作" min-width="88" prop="operation">
										<template slot-scope="scope">
											<ext-button :label="$t('action.delete')" :size="miniSize" @click="handleDeleteProduct(scope.row)" icon="el-icon-ali-shanchu" type="danger" />
										</template>
									</el-table-column>
								</el-table>
							</div>
							<!-- 商品销售基本信息 -->
							<div class="goods-simple" v-else>
								<el-row>
									<el-col :span="6">
										<el-form-item label="销售价" prop="price">
											<el-input placeholder="请输入销售价" v-model="formData.price"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="成本价" prop="costPrice">
											<el-input placeholder="请输入成本价" v-model="formData.costPrice"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="市场价" prop="mktPrice">
											<el-input placeholder="请输入市场价" v-model="formData.mktPrice"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="6">
										<el-form-item label="货号" prop="sn">
											<el-input placeholder="请输入货号" v-model="formData.sn"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="当前库存" prop="stock">{{formData.stock}}</el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item class="switch-container" label="库存" prop="dynamicStock">
											<el-input placeholder="请输入库存" v-model="formData.dynamicStock">
												<el-switch active-text="+" inactive-text="-" slot="append" v-model="formData.dynamicStockDirection"></el-switch>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
							</div>
						</el-tab-pane>
						<el-tab-pane>
							<span slot="label">
								<i class="el-icon-ali-shangpin-xiangqing"></i> 商品详情
							</span>
							<el-row>
								<el-form-item label="会员价" prop="gradePrice">
									<el-col :key="idx" :span="6" v-for="(item, idx) in userGradeList">
										<el-input placeholder="请输入优惠价" v-model="formData.gradePrice[item.id]">
											<template slot="prepend">{{item.name}}</template>
										</el-input>
									</el-col>
								</el-form-item>
							</el-row>
							<el-row>
								<el-col :span="6">
									<el-form-item label="重量" prop="weight">
										<el-input placeholder="请输入成本价" v-model="formData.weight"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="单位" prop="unit">
										<el-input placeholder="请输入市场价" v-model="formData.unit"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="6">
									<el-form-item label="上架" prop="marketable">
										<el-switch active-text="上架" inactive-text="下架" v-model="formData.marketable"></el-switch>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="推荐" prop="isRecommend">
										<el-switch active-text="开启" inactive-text="关闭" v-model="formData.isRecommend"></el-switch>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="热门" prop="isHot">
										<el-switch active-text="开启" inactive-text="关闭" v-model="formData.isHot"></el-switch>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="详细介绍" prop="intro">
								<tinyEditor :content.sync="formData.intro" url="/static/tinymce"></tinyEditor>
							</el-form-item>
						</el-tab-pane>
					</el-tabs>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="18" class="footer">
					<el-button :size="miniSize" @click="resetForm('formData')" round>{{$t('action.cancel')}}</el-button>
					<el-button :loading="editLoading" :size="miniSize" @click.native="submitForm" round type="primary">{{$t('action.submit')}}</el-button>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
import _ from 'lodash'
import breadCrumb from '@/components/bread_crumb'
import extButton from '@/components/core/ext_button'
import changeImageIcon from '@/components/change_image_icon'
import draggableImageList from '@/components/draggable_image_list'
import tinyEditor from '@/components/tiny_editor'

export default {
    components: {
        breadCrumb,
        extButton,
        changeImageIcon,
        draggableImageList,
        tinyEditor
    },
    data () {
        const checkPrice = (rule, value, callback) => {
            var reg = /^-?\d{1,5}(?:\.\d{1,3})?$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error('请输入大于零小于十万不超过三位小数的数字'))
            }
        }
        return {
            normalSize: 'small',
            miniSize: 'mini',
            goodsCatList: [],
            goodsTypeList: [],
            brandList: [],
            userGradeList: [], // 用户等级列表
            isCreating: false, // true:新增, false:编辑
            editLoading: false,

            // 新增编辑界面数据
            formData: {
                id: 0, // 商品ID
                bn: '', // 商品编码
                name: '', // 商品名称
                brief: '', // 商品简介
                attachmentId: 0, // 默认图片 图片id
                attachment: {
                    id: 0,
                    path: ''
                },
                goodsAttachments: [], // 商品图片
                goodsCatId: [], // 商品分类ID

                goodsTypeId: '', // 商品类别ID
                goodsType: {
                    params: [], // 参数信息
                    specs: [] // 规格信息
                },
                openSpec: false, // 开启规格
                products: [], // 开启规格之后生成的产品组
                defaultProduct: 0, // 选中的默认商品

                sn: '', // 货号
                price: 0, // 商品价格
                costPrice: 0, // 成本价
                mktPrice: 0, // 市场价
                stock: 0, // 当前库存
                dynamicStockDirection: true, // 库存增减
                dynamicStock: 0, // 增减量

                brandId: '', // 品牌ID
                isNomalVirtual: 1, // 虚拟正常商品 1=正常 2=虚拟
                marketable: 1, // 上架标志 1=上架 2=下架
                freezeStock: 0, // 冻结库存
                weight: 0, // 重量
                unit: '', // 商品单位
                intro: '', // 商品详情
                commentCount: 0, // 评论次数
                viewCount: 0, // 浏览次数
                buyCount: 0, // 购买次数
                upTime: 0, // 上架时间
                downTime: 0, // 下架时间
                sort: 0, // 商品排序 越小越靠前
                isRecommend: 1, // 是否推荐，1是，2不是推荐
                isHot: 1, // 是否热门，1是，2否
                labelIds: '', // 标签id逗号分隔
                newSpec: '', // 自定义规格名称
                gradePrice: {} // 会员价格
            },
            formDataRules: {
                goodsCatId: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ],
                brandId: [
                    { required: true, message: '请选择商品品牌', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                bn: [
                    { required: true, message: '请输入商品编号', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入价格', trigger: 'blur' },
                    { validator: checkPrice, trigger: 'blur' }
                ]
            },
            cascaderProps: {
                label: 'name',
                value: 'id',
                children: 'children'
            }
        }
    },
    computed: {
    },
    methods: {
        end (items) {
            this.formData.goodsAttachments = items
        },
        addGoodsAttachments (chosen) {
            this.formData.goodsAttachments.push(chosen)
        },
        onRemove (idx) {
            if (Number.isInteger(idx) && idx !== -1) {
                this.formData.goodsAttachments.splice(idx, 1)
            }
        },
        chosedProductImage (row, chosed) {
            row.attachmentId = chosed.id
            row.attachment = chosed
        },
        async handleChangeGoodsType (goodsTypeId) {
            this.formData.goodsTypeId = goodsTypeId

            const _result = await this.$api.goodsType.get({ id: goodsTypeId })
            if (_result.succeed === 1 && _result.code === 200) {
                /**
                 "data": {
                    "createdAt": "2019-08-08 12:27:28",
                    "updatedAt": "2019-08-30 08:49:32",
                    "id": 2,
                    "name": "手机",
                    "params": null,
                    "specs": [
                    {
                        "id": 12,
                        "name": "颜色",
                        "sort": 1,
                        "goodsSpecValues": [
                        {
                            "id": 28,
                            "value": "银",
                            "sort": 0
                        },
                        {
                            "id": 29,
                            "value": "白",
                            "sort": 0
                        },
                        {
                            "id": 30,
                            "value": "玫瑰金",
                            "sort": 0
                        }
                        ],
                        "values": "银 白 玫瑰金"
                    },
                    {
                        "id": 13,
                        "name": "容量",
                        "sort": 2,
                        "goodsSpecValues": [
                        {
                            "id": 31,
                            "value": "16G",
                            "sort": 0
                        },
                        {
                            "id": 32,
                            "value": "64G",
                            "sort": 0
                        },
                        {
                            "id": 33,
                            "value": "128G",
                            "sort": 0
                        }
                        ],
                        "values": "16G 64G 128G"
                    },
                    {
                        "id": 14,
                        "name": "产地",
                        "sort": 3,
                        "goodsSpecValues": [
                        {
                            "id": 34,
                            "value": "中国大陆",
                            "sort": 0
                        },
                        {
                            "id": 35,
                            "value": "越南",
                            "sort": 0
                        },
                        {
                            "id": 36,
                            "value": "新加坡",
                            "sort": 0
                        }
                        ],
                        "values": "中国大陆 越南 新加坡"
                    },
                    {
                        "id": 15,
                        "name": "毛重",
                        "sort": 4,
                        "goodsSpecValues": [
                        {
                            "id": 37,
                            "value": "129g",
                            "sort": 0
                        },
                        {
                            "id": 38,
                            "value": "138g",
                            "sort": 0
                        }
                        ],
                        "values": "129g 138g"
                    }
                    ],
                    "params": [
                    {
                        "id": 5,
                        "name": "材质",
                        "type": "text",
                        "values": ""
                    },
                    {
                        "id": 4,
                        "name": "大小",
                        "type": "text",
                        "values": ""
                    }
                    ],
                    "specValues": "颜色|容量|产地|毛重",
                    "paramValues": "材质|大小"
                }
                params: [
                        { id: 0, type: 'text', name: '型号', values: '' },
                        { id: 1, type: 'radio', name: '大小', values: 'a', optionalValues: 'a b c' },
                        { id: 2, type: 'checkbox', name: '型号', values: 'a,b', optionalValues: 'a b c' }
                    ],
                */
                // 进行格式转换
                const _goodsType = _.pick(_result.data, ['specs', 'params'])
                if (Array.isArray(_goodsType.params)) {
                    for (const _param of _goodsType.params) {
                        _param.optionalValues = _param.values
                        _param.values = ''
                    }
                }
                if (Array.isArray(_goodsType.specs)) {
                    for (const _spec of _goodsType.specs) {
                        _spec.values = _spec.goodsSpecValues
                        delete _spec.goodsSpecValues
                    }
                }
                this.formData.goodsType = _goodsType
            }
        },
        handleSetDefault (row) {
            for (const _product of this.formData.products) {
                if (_product.id === row.id) {
                    _product.isDefault = true
                } else {
                    _product.isDefault = false
                }
            }
        },
        handleDeleteProduct (row) {
            const _index = this.formData.products.findIndex(v => v.id === row.id)
            this.formData.products.splice(_index, 1)
        },
        combine (arr) {
            const r = [];
            (function f (t, a, n) {
                if (n === 0) return r.push(t)
                for (let i = 0; i < a[n - 1].length; i++) {
                    f(t.concat(a[n - 1][i]), a, n - 1)
                }
            })([], arr, arr.length)
            return r
        },
        // 重新初始化 this.products 数据
        handleBuildProducts () {
            const _products = []

            if (Array.isArray(this.formData.goodsType.specs)) {
                const _specs = []
                for (const spec of this.formData.goodsType.specs) {
                    if (Array.isArray(spec.values)) {
                        const _values = spec.values.filter(v => v.checked === true).map(v => { return `${spec.name}:${v.value}` })
                        if (Array.isArray(_values) && _values.length > 0) {
                            _specs.push(_values)
                        }
                    }
                }
                const _composedSpecs = this.combine(_specs)

                let _idx = 1
                for (const _spec of _composedSpecs) {
                    _products.push({
                        id: _idx,
                        isDefault: _idx === 1,
                        attachment: { id: 0, path: '' },
                        sn: '',
                        specs: _spec.join(','),
                        stock: 0,
                        dynamicStockDirection: true, // 库存增减
                        dynamicStock: 0, // 增减量
                        price: 0,
                        costPrice: 0,
                        mktPrice: 0
                    })
                    ++_idx
                }
            }
            this.formData.products = _products

            const _checkedProduct = this.formData.products.find(v => v.isDefault === true)
            if (_checkedProduct) {
                this.defaultProduct = _checkedProduct.id
            } else {
                this.defaultProduct = 0
            }
        },
        chosedImage (chosen) {
            this.formData.attachmentId = chosen.id
            this.formData.attachment = chosen
        },
        // 获取商品分类
        async getGoodsCatList () {
            const _result = await this.$api.goodsCat.getTree()
            if (_result.succeed === 1 && _result.code === 200) {
                this.goodsCatList = _result.data.list
            }
        },
        // 获取商品类型
        async getGoodsTypeList () {
            const _result = await this.$api.goodsType.list()
            if (_result.succeed === 1 && _result.code === 200) {
                this.goodsTypeList = _result.data.list
            }
        },
        // 获取商品品牌
        async getBrandList () {
            const _result = await this.$api.brand.list()
            if (_result.succeed === 1 && _result.code === 200) {
                this.brandList = _result.data.list
            }
        },
        // 获取用户会员列表
        async getUserGradeList () {
            const _result = await this.$api.userGrade.list()
            if (_result.succeed === 1 && _result.code === 200) {
                this.userGradeList = _result.data.list
            }
        },
        // 编辑
        submitForm () {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(async () => {
                        this.editLoading = true

                        const data = Object.assign({}, this.formData)
                        if (Array.isArray(data.goodsCatId) && data.goodsCatId.length > 0) {
                            data.goodsCatId = data.goodsCatId.pop()
                        }
                        if (!data.openSpec) {
                            data.goodsType.specs = []
                            data.products = []
                            const _product = {
                                isDefault: true,
                                attachment: data.attachment,
                                sn: data.sn, // 货号
                                price: data.price, // 商品价格
                                costPrice: data.costPrice, // 成本价
                                mktPrice: data.mktPrice, // 市场价
                                stock: data.stock + (data.dynamicStockDirection ? data.dynamicStock : data.dynamicStock * -1)
                            }
                            data.products.push(_product)
                        } else {
                            let _stock = 0
                            for (const _productItem of data.products) {
                                _productItem.stock = _productItem.stock + (_productItem.dynamicStockDirection ? _productItem.dynamicStock : _productItem.dynamicStock * -1)
                                _stock += _productItem.stock
                            }
                            data.stock = _stock

                            const _product = data.products.find(v => { v.isDefault = true })
                            if (_product) {
                                data.price = _product.price
                                data.costPrice = _product.costPrice
                                data.mktPrice = _product.mktPrice
                            }
                        }
                        console.log(data)
                        const _result = await this.$api.goods.save(data)
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
                        this.$router.push({ path: '/goods' })
                    })
                }
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        async getGoodsDetail (id) {
            this.$api.goods.get({ id: this.$route.query.id }).then((result) => {
                if (result.succeed === 1 && result.code === 200) {
                    let _goodsDetail = result.data

                    let _goodsType = _goodsDetail.goodsType ? _goodsDetail.goodsType : {}
                    _goodsType = Object.assign(_goodsType, { specs: _goodsDetail.specs, params: _goodsDetail.params })
                    _goodsDetail = _.omit(_goodsDetail, ['specs', 'params'])
                    _goodsDetail.goodsType = _goodsType

                    const _gradePrice = {}
                    if (Array.isArray(_goodsDetail.goodsGrades) && _goodsDetail.goodsGrades.length > 0) {
                        for (const _goodsGrade of _goodsDetail.goodsGrades) {
                            _gradePrice[_goodsGrade.gradeId] = _goodsGrade.gradePrice
                        }
                    }
                    _goodsDetail.gradePrice = _gradePrice

                    if (Array.isArray(_goodsDetail.goodsAttachments) && _goodsDetail.goodsAttachments.length > 0) {
                        const _goodsAttachments = []
                        for (const _goodsAttachment of _goodsDetail.goodsAttachments) {
                            if (_goodsAttachment.attachment) {
                                _goodsAttachments.push(_goodsAttachment.attachment)
                            }
                        }
                        _goodsDetail.goodsAttachments = _goodsAttachments
                    }

                    const _defaultProduct = Array.isArray(_goodsDetail.products) ? _goodsDetail.products.find(v => v.isDefault === true) : null
                    if (_defaultProduct) {
                        _goodsDetail.defaultProduct = _defaultProduct.id
                    }
                    this.formData = Object.assign(this.formData, _goodsDetail)
                    this.formData.openSpec = _goodsType.specs.length > 0

                    console.log(this.formData)
                }
            })
        }
    },
    async mounted () {
        this.isCreating = this.$route.query.isCreating
        const _goodsId = this.$route.query.id
        if (_goodsId > 0) {
            await this.getGoodsDetail(_goodsId)
        }
        await this.getGoodsTypeList()
        await this.getGoodsCatList()
        await this.getBrandList()
        await this.getUserGradeList()
    }
}
</script>

<style scoped lang="scss">
.switch-container /deep/ .el-input-group__append {
    padding: 0px 3px;
    .el-switch__label {
        margin: 3px;
    }
}
</style>
