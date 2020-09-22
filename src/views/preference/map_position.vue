<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-08-02 12:02:21
-->
<template>
    <el-container class="map-container">
        <el-main>
            <el-amap-search-box :on-search-result="onSearchResult" :search-option="searchOption"></el-amap-search-box>
            <el-amap :center="center" :events="events" :plugin="plugin" :zoom="zoom" vid="amap">
                <el-amap-marker :animation="marker.animation" :events="marker.events" :key="marker.index"
                    :position="marker.position" :vid="index" v-for="(marker, index) in markers"></el-amap-marker>
                <el-amap-info-window :content="position.address" :key="index" :position="marker.position"
                    v-for="(marker, index) in markers"></el-amap-info-window>
            </el-amap>
        </el-main>
        <el-footer>
            <el-row>
                <el-col :span="18" style="font-size:12px;">
                    当前位置:
                    <span v-if="loaded">{{position}}</span>
                    <span v-else>正在定位(可手动输入定位)</span>
                </el-col>
                <el-col :span="6">
                    <el-button @click="sendLocation" size="mini" type="primary">提交该地址</el-button>
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>
<script>
export default {
    name: 'MapPosition',
    data () {
        const self = this
        return {
            position: {
                lng: 0,
                lat: 0,
                address: ''
            },
            searchOption: {
                city: '武汉',
                citylimit: false
            },
            center: [114.4248335, 30.456458200000004],
            zoom: 12,
            markers: [
                {
                    position: [114.4248335, 30.456458200000004],
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

                    self.markers[0].position = [self.lng, self.lat]

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
    methods: {
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
        sendLocation () {
            console.log('获取的精度和纬度', this.lng, this.lat)
            console.log('获取的地址', this.position)
            this.$emit('leaveSelectAdress', this.position)
        }
    }
}
</script>
<style  lang="scss" scoped>
.map-container /deep/ .el-main {
    .el-vue-search-box-container {
        width: 100%;
        height: 40px;
        input {
            box-sizing: border-box;
            height: 40px;
            background-color: #eeeeee;
            border-radius: 8px;
            text-indent: 40px;
            color: #c3c3c3;
            font-size: 14px;
        }
    }
    .el-vue-amap-container {
        height: 450px;
        .amap-container {
            height: 450px;
        }
    }
}
</style>
