<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <div class="popup-tree">
        <el-popover :placement="placement" ref="popover" trigger="click">
            <el-tree :data="data" :default-expand-all="defaultExpandAll" :expand-on-click-node="true"
                :highlight-current="true" :props="props" @current-change="currentChangeHandle" node-key="nodeKey"
                ref="popupTree"></el-tree>
        </el-popover>
        <el-input :placeholder="placeholder" :readonly="true" style="cursor:pointer;" v-model="prop" v-popover:popover>
        </el-input>
    </div>
</template>

<script>
export default {
    name: 'PopupTreeInput',
    props: {
        data: {
            type: Array,
            default: () => []
        },
        props: {
            type: Object,
            default: () => { }
        },
        prop: {
            type: String,
            default: ''
        },
        nodeKey: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '点击选择内容'
        },
        placement: {
            type: String,
            default: 'right-start'
        },
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        currentChangeHandle: {
            type: Function,
            default: null
        }
    }
}
</script>

<style scoped lang="scss">
</style>
