/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-22 12:25:53
 */
const pageConfig = [
    // 团购秒杀
    {
        type: "groupPurchase",
        name: "团购秒杀",
        config: {
            title: "活动名称",
            limit: "5",
            list: [
                {
                    url: "images/empty-banner.png",
                    name: "寸衫",
                    price: "199.00"
                },
                {
                    url: "images/empty-banner.png",
                    name: "裤子",
                    price: "120.00"
                }
            ]
        },
        key: "groupPurchase_0"
    },
    // 优惠券组
    {
        type: "coupon",
        name: "优惠券组",
        config: {
            limit: "2"
        },
        key: "coupon_0"
    },
    // 购买记录
    {
        type: "record",
        name: "购买记录",
        config: {
            style: {
                top: 0,
                left: 0,
                align: "right"
            }
        },
        key: "record_0"
    },
    // 图片分组
    {
        type: "imgWindow",
        name: "图片分组",
        config: {
            style: 2,
            margin: 0,
            list: [
                {
                    url: "images/empty-banner.png",
                    type: "",
                    value: ""
                },
                {
                    url: "images/empty-banner.png",
                    type: "",
                    value: ""
                },
                {
                    url: "images/empty-banner.png",
                    type: "",
                    value: ""
                },
                {
                    url: "images/empty-banner.png",
                    type: "",
                    value: ""
                }
            ]
        },
        key: "imgWindow_0"
    },
    // 辅助空白
    {
        type: "blank",
        name: "辅助空白",
        config: {
            height: 20,
            backgroundColor: "#FFFFFF"
        },
        key: "blank_0"
    },
    // 文本域
    {
        type: "textarea",
        name: "文本域",
        config: "",
        key: "textarea_0"
    },
    // 视频组
    {
        type: "video",
        name: "视频组",
        config: {
            autoplay: "false",
            url: "images/empty-banner.png",
            videoUrl:
                "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400",
            type: "",
            value: ""
        },
        key: "video_0"
    },
    // 文章组
    {
        type: "article",
        name: "文章组",
        config: {
            title: "",
            url: "images/empty-goods.png"
        },
        key: "article_0"
    },
    // 文章分类
    {
        type: "articleClassify",
        name: "文章分类",
        config: {
            limit: 3,
            articleClassifyId: ""
        },
        key: "articleClassify_0"
    },
    // 搜索框
    {
        type: "search",
        name: "搜索框",
        config: {
            keywords: "请输入关键字搜索",
            style: "round"
        },
        key: "search_0"
    },
    // 图片轮播
    {
        type: "imgSlide",
        name: "图片轮播",
        config: {
            duration: 2500,
            list: [
                {
                    url: "images/empty-banner.png",
                    type: "",
                    value: ""
                },
                {
                    url: "images/empty-banner.png",
                    type: "",
                    value: ""
                }
            ]
        },
        key: "imgSlide_1"
    },
    // 公告组
    {
        type: "notice",
        name: "公告组",
        config: {
            type: "auto",
            list: [
                {
                    id: 1,
                    title:
                        "足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。",
                    ctime: 1565773880
                }
            ]
        },
        key: "notice_2"
    },
    // 导航组
    {
        type: "navBar",
        name: "导航组",
        config: {
            limit: 4,
            list: [
                {
                    url: "images/empty.png",
                    text: "按钮1",
                    type: "",
                    value: ""
                },
                {
                    url: "images/empty.png",
                    text: "按钮2",
                    type: "",
                    value: ""
                },
                {
                    url: "images/empty.png",
                    text: "按钮3",
                    type: "",
                    value: ""
                },
                {
                    url: "images/empty.png",
                    text: "按钮4",
                    type: "",
                    value: ""
                }
            ]
        },
        key: "navBar_3"
    },
    // 商品组
    {
        type: "goods",
        name: "商品组",
        config: {
            title: "热门商品",
            more: "true",
            type: "auto",
            classifyId: "",
            brandId: "",
            limit: 10,
            display: "list",
            column: 2,
            list: [
                {
                    id: 1,
                    name: "DKCHENPIN2018秋新款天丝中长款修身风衣外套女",
                    bn: "118336505",
                    brief: "可调节袖 系带收腰设",
                    price: "450.00",
                    mktprice: "600.00",
                    image_id: "b419e4164d5726d057b2ae195f9a96df",
                    goods_cat_id: 18,
                    goods_type_id: 1,
                    brand_id: 14,
                    is_nomal_virtual: 1,
                    marketable: 1,
                    stock: 2796,
                    weight: "400.00",
                    unit: "件",
                    spes_desc: {
                        颜色: ["红色", "白色", "绿色", "蓝色"],
                        规格: ["规格1", "规格2", "规格3", "规格4"]
                    },
                    params: 'a:1:{s:6:"材质";s:6:"化纤";}',
                    comments_count: 0,
                    view_count: 0,
                    buy_count: 2,
                    sort: 100,
                    is_recommend: 1,
                    is_hot: 1,
                    label_ids: [],
                    brand_name: "DKCHENPIN",
                    cat_name: "风衣",
                    url: "images/empty-goods.png",
                    product: {
                        id: 1,
                        goods_id: 1,
                        barcode: null,
                        sn: "P5378659179491",
                        price: "450.00",
                        mktprice: "600.00",
                        marketable: 1,
                        stock: 195,
                        spes_desc: "颜色:红色,规格:规格1",
                        is_defalut: 1,
                        image_id: "",
                        isdel: null,
                        name: "DKCHENPIN2018秋新款天丝中长款修身风衣外套女",
                        bn: "118336505",
                        image_path: "images/empty-goods.png",
                        total_stock: 198,
                        grade_price: [],
                        grade_info: {
                            id: ""
                        },
                        default_spes_desc: {
                            颜色: {
                                红色: {
                                    name: "红色",
                                    is_default: true
                                },
                                白色: {
                                    name: "白色",
                                    product_id: 2
                                },
                                绿色: {
                                    name: "绿色",
                                    product_id: 22
                                },
                                蓝色: {
                                    name: "蓝色",
                                    product_id: 3
                                }
                            },
                            规格: {
                                规格1: {
                                    name: "规格1",
                                    is_default: true
                                },
                                规格2: {
                                    name: "规格2",
                                    product_id: 22
                                },
                                规格3: {
                                    name: "规格3",
                                    product_id: 7
                                },
                                规格4: {
                                    name: "规格4",
                                    product_id: 11
                                }
                            }
                        },
                        amount: "450.00",
                        promotion_list: {
                            6: {
                                name: "test",
                                type: 1
                            }
                        },
                        promotion_amount: 0
                    },
                    album: [
                        "images/empty-goods.png",
                        "images/empty-goods.png",
                        "images/empty-goods.png",
                        "images/empty-goods.png",
                        "images/empty-goods.png"
                    ],
                    isfav: "false"
                },
                {
                    id: 2,
                    name:
                        "七匹狼羽绒服男短款2018冬季新款男士中年休闲爸爸装男装潮流外套",
                    bn: "5446546546",
                    brief: "8周年店庆，22号10点到11点 全场商品3件6折",
                    price: "600.00",
                    mktprice: "590.00",
                    image_id: "6ee0f5a5ac6c53418852ee6cc78aeb48",
                    goods_cat_id: 10,
                    goods_type_id: 1,
                    brand_id: 11,
                    is_nomal_virtual: 1,
                    marketable: 1,
                    stock: 679,
                    weight: "0.00",
                    unit: "件",
                    spes_desc: {
                        颜色: {
                            1: "白色",
                            3: "蓝色",
                            4: "紫色"
                        },
                        规格: ["规格1", "规格2"]
                    },
                    params: "",
                    comments_count: 0,
                    view_count: 0,
                    buy_count: 1,
                    sort: 100,
                    is_recommend: 1,
                    is_hot: 1,
                    label_ids: [],
                    brand_name: "千仞岗",
                    cat_name: "毛呢外套",
                    url: "images/empty-goods.png",
                    product: {
                        id: 23,
                        goods_id: 2,
                        barcode: null,
                        sn: "-1",
                        price: "600.00",
                        mktprice: "590.00",
                        marketable: 1,
                        stock: 97,
                        spes_desc: "颜色:白色,规格:规格1",
                        is_defalut: 1,
                        image_id: "",
                        isdel: null,
                        name:
                            "七匹狼羽绒服男短款2018冬季新款男士中年休闲爸爸装男装潮流外套",
                        bn: "5446546546",
                        image_path: "images/empty-goods.png",
                        total_stock: 97,
                        grade_price: [],
                        grade_info: {
                            id: ""
                        },
                        default_spes_desc: {
                            颜色: {
                                白色: {
                                    name: "白色",
                                    is_default: true
                                },
                                蓝色: {
                                    name: "蓝色",
                                    product_id: 24
                                },
                                紫色: {
                                    name: "紫色",
                                    product_id: 25
                                }
                            },
                            规格: {
                                规格1: {
                                    name: "规格1",
                                    is_default: true
                                },
                                规格2: {
                                    name: "规格2",
                                    product_id: 26
                                }
                            }
                        },
                        amount: "600.00",
                        promotion_list: {
                            6: {
                                name: "test",
                                type: 1
                            }
                        },
                        promotion_amount: 0
                    },
                    album: ["images/empty-goods.png"],
                    isfav: "false"
                },
                {
                    id: 4,
                    name:
                        "芙娜妮2018秋冬吊带连衣裙女两件套条纹针织打底衫背带PU皮裙套装",
                    bn: "78678657865",
                    brief:
                        "品牌: 芙娜妮适用年龄: 25-29周岁尺码: S M L XL图案: 条纹风格: 街头街头: 欧美领型: 圆领腰型: 中腰衣门襟: 套头颜色分类: 红色袖型: 其他组合形式: 两件套",
                    price: "200.00",
                    mktprice: "200.00",
                    image_id: "fce63f9c69c6c4ec606b544fcc7610a2",
                    goods_cat_id: 4,
                    goods_type_id: 1,
                    brand_id: 15,
                    is_nomal_virtual: 1,
                    marketable: 1,
                    stock: 560,
                    weight: "0.00",
                    unit: "件",
                    spes_desc: {
                        颜色: ["红色", "白色"],
                        规格: ["规格1", "规格2"]
                    },
                    params: "",
                    comments_count: 0,
                    view_count: 0,
                    buy_count: 1,
                    sort: 100,
                    is_recommend: 1,
                    is_hot: 1,
                    label_ids: [],
                    brand_name: "薇咔拉",
                    cat_name: "浪漫裙装",
                    url: "images/empty-goods.png",
                    product: {
                        id: 29,
                        goods_id: 4,
                        barcode: null,
                        sn: "51111",
                        price: "200.00",
                        mktprice: "200.00",
                        marketable: 2,
                        stock: 97,
                        spes_desc: "颜色:红色,规格:规格1",
                        is_defalut: 1,
                        image_id: "",
                        isdel: null,
                        name:
                            "芙娜妮2018秋冬吊带连衣裙女两件套条纹针织打底衫背带PU皮裙套装",
                        bn: "78678657865",
                        image_path: "images/empty-goods.png",
                        total_stock: 98,
                        grade_price: [],
                        grade_info: {
                            id: ""
                        },
                        default_spes_desc: {
                            颜色: {
                                红色: {
                                    name: "红色",
                                    is_default: true
                                },
                                白色: {
                                    name: "白色",
                                    product_id: 30
                                }
                            },
                            规格: {
                                规格1: {
                                    name: "规格1",
                                    is_default: true
                                },
                                规格2: {
                                    name: "规格2",
                                    product_id: 31
                                }
                            }
                        },
                        amount: "200.00",
                        promotion_list: {
                            6: {
                                name: "test",
                                type: 1
                            }
                        },
                        promotion_amount: 0
                    },
                    album: [
                        "images/empty-goods.png",
                        "images/empty-goods.png",
                        "images/empty-goods.png"
                    ],
                    isfav: "false"
                },
                {
                    id: 5,
                    name:
                        "正品代购PINKO女包2018新款燕子包单肩斜挎压花徽章小香风链条包",
                    bn: "5465",
                    brief:
                        "PINKO质地: 牛皮皮革材质: 头层牛皮风格: 欧美时尚成色: 全新颜色分类: 热带雨林 黑色勋章 白色勋章 编织小香风 黑色压花 红色压花 黑色镶钻眼 黑色单排 红色单排 白色涂鸦 黑色涂鸦 粉黑涂鸦 黄黑涂鸦 黑色字母可乐 白色字母鳄鱼纹 红色字母 黑色枪排 红色love 白色珍珠 黑色珍珠 黑色镶钻双排 粉色镶钻双排 其他颜色拍下备注颜色有无夹层: 有背包方式: 单肩斜挎手提适用场景: 休闲",
                    price: "200.00",
                    mktprice: "190.00",
                    image_id: "3e1c30dd1125de24e5395d3cd39ef5d8",
                    goods_cat_id: 9,
                    goods_type_id: 1,
                    brand_id: 0,
                    is_nomal_virtual: 1,
                    marketable: 1,
                    stock: 200,
                    weight: "0.00",
                    unit: "件",
                    spes_desc: "",
                    params: "",
                    comments_count: 0,
                    view_count: 0,
                    buy_count: 0,
                    sort: 100,
                    is_recommend: 1,
                    is_hot: 1,
                    label_ids: [],
                    brand_name: null,
                    cat_name: "女包",
                    url: "images/empty-goods.png",
                    product: {
                        id: 33,
                        goods_id: 5,
                        barcode: null,
                        sn: "564456",
                        price: "200.00",
                        mktprice: "190.00",
                        marketable: 1,
                        stock: 200,
                        spes_desc: null,
                        is_defalut: 1,
                        image_id: "",
                        isdel: null,
                        name:
                            "正品代购PINKO女包2018新款燕子包单肩斜挎压花徽章小香风链条包",
                        bn: "5465",
                        image_path: "images/empty-goods.png",
                        total_stock: 200,
                        grade_price: [],
                        grade_info: {
                            id: ""
                        },
                        amount: "200.00",
                        promotion_list: {
                            6: {
                                name: "test",
                                type: 1
                            }
                        },
                        promotion_amount: 0
                    },
                    album: [
                        "images/empty-goods.png",
                        "images/empty-goods.png",
                        "images/empty-goods.png",
                        "images/empty-goods.png"
                    ],
                    isfav: "false"
                }
            ]
        },
        key: "goods_4"
    },
    // 图片
    {
        type: "imgSingle",
        name: "图片",
        config: {
            url: "images/empty-banner.png",
            type: "",
            value: ""
        },
        key: "imgSingle_5"
    }
];

module.exports = pageConfig;
