<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-09-20 09:04:09
-->
<template>
    <el-dialog :close-on-click-modal="false" :modal="false" class="video-dialog" title="视频上传" v-bind="$attrs"
        v-on="$listeners" width="40%">
        <el-container>
            <el-main>
                <el-row>
                    <el-col :span="24" class="toolbar">
                        <el-button :size="miniSize" @click="cancelUpload" round type="primary"
                            v-if="uploadProgressState === 1 || uploadProgressState === 3">取消</el-button>
                        <el-button :loading="uploadLoading" :size="miniSize" @click="uploadVideo" round type="primary"
                            v-if="uploadProgressState === 1">上传</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-upload :auto-upload="false" :on-change="changeUpload" :show-file-list="false" action drag
                            v-if="uploadProgressState === 0">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">点击上传</div>
                            <div class="el-upload__tip">支持绝大多数视频格式，单个视频最大支持500MB</div>
                        </el-upload>

                        <video class="video-container" controls="controls" ref="videoPlayer"
                            v-else-if="uploadProgressState > 0">您的浏览器不支持视频播放</video>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-progress v-bind:percentage="videoUploadPercent"
                            v-if="videoUploadPercent > 0 && videoUploadPercent < 100"></el-progress>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <div class="dialog-footer" slot="footer">
            <el-button :size="miniSize" @click.native="$emit('update:visible', false)" round>{{$t('action.close')}}
            </el-button>
            <el-button :disabled="!videoUrl" :size="miniSize" @click.native="chosedVideo" round type="primary">
                {{$t('action.submit')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import validator from 'validator'
import Cookies from 'js-cookie'
export default {
    name: 'VideoUploader',
    components: {},
    computed: {
        checkUrl () {
            return (url) => {
                return validator.isURL(url)
            }
        }
    },
    data () {
        const token = Cookies.get('token')
        return {
            normalSize: 'small',
            miniSize: 'mini',

            extData: { // 上传视频时需要传递的参数
                pathType: 'attachment'
            },
            headers: { authorization: 'Bearer ' + token },

            uploadLoading: false, // 正在上传,按钮不可重复占击
            videoFile: null, // 当前选择的文件
            videoUrl: null,
            uploadProgressState: 0, // 0:还没有选择视频文件; 1:已经选择了视频文件; 2:正在上传到云端; 3:上传完成
            videoUploadPercent: 0 // 上传进度,百分比
        }
    },
    methods: {
        cancelUpload () {
            this.videoFile = null
            this.uploadProgressState = 0
        },
        // 上传按钮,限制文件大小
        changeUpload (file, fileList) {
            const self = this
            const _fileSize = file.size / 1024 / 1024 < 500

            if (!_fileSize) {
                this.$notify.error({
                    title: '错误',
                    message: '视频大小不能超过500MB!'
                })
                return false
            }
            // 上传成功后将视频地址赋值给视频播放器
            this.$nextTick(() => {
                const _allowMimeTypes = ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov']
                const _file = file.raw
                const _reader = new FileReader()
                _reader.readAsDataURL(_file)
                if (!_allowMimeTypes.includes(_file.type)) {
                    self.$message.error(`当前文件格式为: ${_file.type}, 请上传正确的视频格式`)
                    return false
                }
                _reader.onload = (e) => {
                    self.uploadProgressState = 1
                    self.videoFile = _file
                    self.$nextTick(() => {
                        const _videoPlayer = self.$refs.videoPlayer
                        _videoPlayer.src = _reader.result
                        _videoPlayer.play()
                    })
                }
            })
        },
        // 开始上传视频
        uploadVideo () {
            if (this.videoFile) {
                const _formData = new FormData()
                _formData.append('file', this.videoFile)
                _formData.append('pathType', 'attachment')
                this.uploadLoading = true
                this.uploadProgressState = 2
                this.$axios({
                    url: 'cms/upload',
                    method: 'post',
                    data: _formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: progressEvent => {
                        this.videoUploadPercent = (progressEvent.loaded / progressEvent.total * 100 | 0)
                    }
                }).then(async result => {
                    if (result.succeed === 1 && result.code === 200) {
                        // 将播放器的地址批向云端
                        const _videoPlayer = this.$refs.videoPlayer
                        const _videoUrl = this.env.getImgUrl(result.data.fileUrl)
                        this.videoUrl = _videoUrl
                        _videoPlayer.src = _videoUrl
                        _videoPlayer.play()

                        this.uploadLoading = false
                        this.uploadProgressState = 3
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: result.description
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    this.uploadLoading = false
                })
            }
        },
        chosedVideo () {
            this.$emit('chosedVideo', this.videoUrl)
        }

    },
    async mounted () {

    }
}
</script>

<style scoped lang="scss">
.video-dialog /deep/ {
    .el-dialog__body {
        padding: 0px;
    }
    .el-main {
        padding: 10px;
        .toolbar {
            padding: 8px;
            text-align: right;
        }
        .video-container {
            margin: 5px;
            padding: 8px;
            max-width: 360px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
        }
    }
}
</style>
