<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-09-01 16:23:19
-->
<template>
    <el-dialog :close-on-click-modal="false" :modal="false" :visible.sync="mapDialogVisible"
        class="edit-dialog-container" title="地址选择" width="50%">
        <el-container class="map-container">
            <el-main>
                <el-amap-search-box :on-search-result="onSearchResult" :search-option="searchOption">
                </el-amap-search-box>
                <el-amap :center="center" :events="events" :plugin="plugin" :zoom="zoom" vid="amap">
                    <el-amap-marker :animation="marker.animation" :events="marker.events" :key="marker.index"
                        :position="marker.position" :vid="index" v-for="(marker, index) in markers"></el-amap-marker>
                    <el-amap-info-window :content="position.address" :key="index" :position="marker.position"
                        v-for="(marker, index) in markers"></el-amap-info-window>
                </el-amap>
            </el-main>
            <el-footer class="position-info">
                当前位置:
                <span v-if="loaded">{{position}}</span>
                <span v-else>正在定位(可手动输入定位)</span>
            </el-footer>
        </el-container>
        <div class="dialog-footer" slot="footer">
            <el-button :size="miniSize" @click.native="mapDialogVisible = false" round>{{$t('action.cancel')}}
            </el-button>
            <el-button :size="miniSize" @click.native="chosedLocation" round type="primary">{{$t('action.submit')}}
            </el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'MapPosition',
    data () {
        const self = this
        return {
            normalSize: 'small',
            miniSize: 'mini',
            mapDialogVisible: false, // 对话窗显示/隐藏
            position: {
                lng: 0,
                lat: 0,
                address: ''
            },
            searchOption: this.searchOpt,
            center: this.lnglat,
            zoom: 12,
            markers: [
                {
                    position: this.lnglat,
                    animation: 'AMAP_ANIMATION_DROP',
                    events: {
                        click (o) { }
                    }
                }
            ],
            plugin: [
                // 一些工具插件
                {
                    enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                    timeout: 100, // 超过10秒后停止定位，默认：无穷大
                    maximumAge: 0, // 定位结果缓存0毫秒，默认：0
                    convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true, // 显示定位按钮，默认：true
                    buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
                    showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    extensions: 'all',
                    pName: 'Geolocation', // 定位
                    events: {
                        init (o) {
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                if (result && result.position) {
                                    self.position.address = result.formattedAddress
                                    self.position.lng = result.position.lng // 设置经度
                                    self.position.lat = result.position.lat // 设置维度

                                    self.center = [self.lng, self.lat] // 设置中心坐标
                                    self.markers[0].position = [self.lng, self.lat]
                                    self.loaded = true // load
                                    var geocoder = new AMap.Geocoder({
                                        radius: 1000,
                                        extensions: 'all'
                                    })
                                    geocoder.getAddress([self.lng, self.lat], function (status, result) {
                                        if (status === 'complete' && result.info === 'OK') {
                                            if (result && result.regeocode) {
                                                self.loaded = true
                                                self.position.address = result.regeocode.formattedAddress
                                                self.$nextTick()
                                            }
                                        }
                                    })
                                    self.$nextTick() // 页面渲染好后
                                }
                            })
                        }
                    }
                },
                {
                    pName: 'ToolBar', // 工具栏
                    events: {
                        init (instance) { }
                    }
                },
                {
                    pName: 'Scale', // 比例尺
                    events: {
                        init (instance) { }
                    }
                }
            ],
            // 这是点击地图上的图标实现定位的事件
            events: {
                click (e) {
                    const { lng, lat } = e.lnglat
                    self.position.lng = lng
                    self.position.lat = lat

                    self.markers[0].position = [lng, lat]

                    // 这里通过高德 SDK 完成。
                    var geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: 'all'
                    })
                    geocoder.getAddress([lng, lat], function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            if (result && result.regeocode) {
                                self.loaded = true
                                self.position.address = result.regeocode.formattedAddress
                                self.$nextTick()
                            }
                        }
                    })
                }
            },
            loaded: false
        }
    },
    props: {
        lnglat: {
            type: Array,
            default () {
                return [114.4248335, 30.456458200000004]
            }
        },
        searchOpt: {
            type: Object,
            default () {
                return {
                    city: '武汉',
                    citylimit: false
                }
            }
        }
    },
    methods: {
        // 设置可见性
        setMapDialogVisible (mapDialogVisible) {
            this.mapDialogVisible = mapDialogVisible
        },
        // 这是搜索框搜索完成后的回调函数
        onSearchResult (pois) {
            const self = this
            console.log('pois', pois)
            let latSum = 0
            let lngSum = 0
            if (pois.length > 0) {
                pois.forEach(poi => {
                    const { lng, lat } = poi
                    lngSum += lng
                    latSum += lat
                })
                const center = {
                    lng: lngSum / pois.length,
                    lat: latSum / pois.length
                }
                self.position.lng = center.lng
                self.position.lat = center.lat

                // 这里通过高德 SDK 完成。
                const geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: 'all'
                })
                geocoder.getAddress([center.lng, center.lat], function (status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.regeocode) {
                            self.loaded = true
                            self.position.address = result.regeocode.formattedAddress
                            self.$nextTick()
                        }
                    }
                })
                self.center = [center.lng, center.lat]
                self.markers[0].position = [center.lng, center.lat]
            }
        },
        // 把经纬度传到父组件
        chosedLocation () {
            console.log('获取的精度和纬度', this.lng, this.lat)
            console.log('获取的地址', this.position)
            this.$emit('chosedLocation', this.position)
        }
    }
}
</script>
<style  lang="scss" scoped>
.map-container /deep/ .el-main {
    .el-vue-search-box-container {
        width: 100%;
        height: 60px;
        input {
            box-sizing: border-box;
            height: 32px;
            border-radius: 4px;
            color: #c3c3c3;
            font-size: 14px;
            padding: 0 15px;
            border: 1px solid #dcdfe6;
        }
        .search-btn {
            color: #fff;
            font-weight: 500;
            width: 80px;
            font-size: 14px;
            border-radius: 20px;
            cursor: pointer;
            border: 1px solid #dcdfe6;
            height: 32px;
            margin: 10px;
            background-color: #409eff;
            border-color: #409eff;
        }
    }
    .el-vue-amap-container {
        height: 360px;
        .amap-container {
            height: 360px;
        }
    }
}

.edit-dialog-container /deep/ {
    .el-dialog__body {
        padding: 0px;
    }
    .position-info {
        float: left;
        font-size: 12px;
        text-align: left;
    }
}
</style>
