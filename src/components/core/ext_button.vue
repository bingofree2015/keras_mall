<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-03-22 23:03:14
-->
<template>
    <el-button :disabled="!hasPerms(perms)" :icon="icon" :loading="loading" :size="size" :type="type"
        @click="handleClick" circle class="ext-button" v-if="circle"></el-button>
    <el-button :disabled="!hasPerms(perms)" :icon="icon" :loading="loading" :size="size" :type="type"
        @click="handleClick" round v-else>{{label}}</el-button>
</template>

<script>
import { hasPermit } from '@/utils/permit.js'
export default {
    name: 'ExtButton',
    props: {
        label: { // 按钮显示文本
            type: String,
            default: ''
        },
        icon: { // 按钮显示图标
            type: String,
            default: ''
        },
        size: { // 按钮尺寸
            type: String,
            default: 'mini'
        },
        type: { // 按钮类型
            type: String,
            default: null
        },
        loading: { // 按钮加载标识
            type: Boolean,
            default: false
        },
        round: {
            type: Boolean,
            default: true
        },
        circle: {
            type: Boolean,
            default: false
        },
        disabled: { // 按钮是否禁用
            type: Boolean,
            default: false
        },
        perms: { // 按钮权限标识，外部使用者传入
            type: String,
            default: null
        }
    },
    data () {
        return {
        }
    },
    methods: {
        handleClick: function () {
            // 按钮操作处理函数
            this.$emit('click', {})
        },
        hasPerms: function (perms) {
            // 根据权限标识和外部指示状态进行权限判断
            if (perms) {
                return hasPermit(perms) & !this.disabled
            } else {
                return true
            }

        }
    },
    mounted () { }
}
</script>

<style scoped lang="scss">
button.ext-button /deep/ {
    padding: 2px;
    i {
        font-size: 18px;
    }
}
</style>
