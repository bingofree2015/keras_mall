<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-09-02 10:14:59
-->
<template>
    <div>
        <el-link :underline="false" @click="handleOpenDialog">
            <el-image :src="env.getImgUrl(iconUrl,env.baseAssetsUrl)" :style="initStyle" fit="contain">
                <div slot="error">
                    <i class="el-icon-ali-tupianshibai"></i>
                </div>
            </el-image>
        </el-link>
        <multi-uploader :visible.sync="imageDialogVisible" @chosedImage="chosedImage"></multi-uploader>
    </div>
</template>
<script>
import multiUploader from '@/components/multi_uploader'
export default {
    name: 'ChangeImageIcon',
    components: {
        multiUploader
    },
    props: {
        imgUrl: {
            type: String,
            default: ''
        },
        initStyle: {
            type: Object,
            default () {
                return {
                    height: '80px',
                    width: '80px',
                    border: '1px dashed #d9d9d9',
                    borderRadius: '50%'
                }
            }
        }
    },
    watch: {
        imgUrl: function (val) { // 监听props中的属性
            this.iconUrl = val
        }
    },
    data () {
        return {
            iconUrl: this.imgUrl,
            imageDialogVisible: false
        }
    },
    methods: {
        handleOpenDialog () {
            this.imageDialogVisible = true
        },
        chosedImage (chosed) {
            this.iconUrl = chosed.path
            this.$emit('chosedImageIcon', chosed)
            this.imageDialogVisible = false
        }
    }
}
</script>
<style scoped lang="scss">
</style>
