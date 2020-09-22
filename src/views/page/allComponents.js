/*
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-22 08:44:22
 */
const allComponents = {
    storeComponents: [
        {
            type: "search",
            name: "搜索框",
            config: {
                keywords: "请输入关键字搜索",
                style: "round"
            },
            icon: "el-icon-ali-sousuo"
        },
        {
            type: "notice",
            name: "公告组",
            config: {
                type: "auto",
                list: [
                    {
                        title: "这里是第一条公告的标题",
                        content: "",
                        id: ""
                    }
                ]
            },
            icon: "el-icon-ali-gonggaozujian"
        },
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
            icon: "el-icon-ali-daohangzujian"
        },
        {
            type: "goods",
            name: "商品组",
            icon: "el-icon-ali-shangpinzuguanli",
            config: {
                title: "商品组名称",
                more: "true",
                type: "auto",
                classifyId: "",
                brandId: "",
                limit: 10,
                display: "list",
                column: 2,
                list: [
                    {
                        url: "images/empty-goods.png",
                        name: "商品名称",
                        price: "100.00"
                    },
                    {
                        url: "images/empty-goods.png",
                        name: "商品名称",
                        price: "59.00"
                    },
                    {
                        url: "images/empty-goods.png",
                        name: "商品名称",
                        price: "32.00"
                    },
                    {
                        url: "images/empty-goods.png",
                        name: "商品名称",
                        price: "129.00"
                    }
                ]
            }
        },
        {
            type: "groupPurchase",
            name: "团购秒杀",
            config: {
                title: "活动名称",
                limit: 5,
                list: [
                    {
                        url: "images/empty-banner.png",
                        name: "商品名称",
                        price: "99.00"
                    },
                    {
                        url: "images/empty-banner.png",
                        name: "商品名称",
                        price: "199.00"
                    }
                ]
            },
            icon: "el-icon-ali-yingxiaogongju-tuangoumiaosha"
        },
        {
            type: "coupon",
            name: "优惠券组",
            config: {
                limit: "2"
            },
            icon: "el-icon-ali-youhuiquan1"
        },
        {
            type: "record",
            name: "购买记录",
            config: {
                style: {
                    top: 20,
                    left: 0
                }
            },
            icon: "el-icon-ali-goumaijilu"
        }
    ],
    utilsComponents: [
        {
            type: "blank",
            name: "辅助空白",
            icon: "el-icon-ali-fuzhukongbai",
            config: {
                height: 20,
                backgroundColor: "#FFFFFF"
            }
        },
        {
            type: "textarea",
            name: "文本域",
            config: "",
            icon: "el-icon-ali-wenbenyu"
        }
    ],
    mediaComponents: [
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
            icon: "el-icon-ali--tupianlunbo"
        },
        {
            type: "imgSingle",
            name: "图片",
            config: {
                url: "images/empty-banner.png",
                type: "",
                value: ""
            },
            icon: "el-icon-ali-tupian"
        },
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
            icon: "el-icon-ali-tupianzu"
        },
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
            icon: "el-icon-ali-shipinzujian"
        },
        {
            type: "article",
            name: "文章组",
            config: {
                title: "",
                url: "images/empty-goods.png"
            },
            icon: "el-icon-ali-wenzhangzujian"
        },
        {
            type: "articleClassify",
            name: "文章分类",
            config: {
                limit: 3,
                articleClassifyId: ""
            },
            icon: "el-icon-ali-wenzhangfenlei1"
        }
    ]
};

module.exports = allComponents;
