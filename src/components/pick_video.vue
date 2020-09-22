<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-09-22 19:12:25
-->
<template>
    <div>
        <el-input :value="value" placeholder="请输入视频地址" readonly>
            <el-button @click="openVideoUploader" icon="el-icon-ali-camera_rec" slot="append"></el-button>
        </el-input>
        <video-uploader :visible.sync="videoDialogVisible" @chosedVideo="chosedVideo"></video-uploader>
    </div>
</template>
<script>
import videoUploader from '@/components/video_uploader'
export default {
    name: 'PickVideo',
    components: {
        videoUploader
    },
    model: [
        {
            prop: 'value',
            event: 'input'
        }
    ],
    data () {
        return {
            miniSize: 'mini',
            normalSize: 'small',
            videoDialogVisible: false
        }
    },
    props: {
        value: {
            type: null,
            default: null
        }
    },
    methods: {

        openVideoUploader () {
            this.videoDialogVisible = true
        },
        chosedVideo (videoUrl) {
            this.$emit('input', videoUrl)
            this.videoDialogVisible = false
        }
    },
    mounted () { }
}
</script>
<style scoped lang="scss">
</style>
