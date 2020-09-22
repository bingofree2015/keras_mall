<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-07-30 22:32:03
-->
<template>
    <div id="draggable-image-list">
        <transition-group :class="[
      'draggable-list'
    ]" id="draggable-list" name="draggable-list" tag="ul">
            <draggable :list="items" @end="end" key="drag" v-bind="dragOptions">
                <li :class="['draggable-list-item']" :key="item.id" :style="{width:size+'px',height:size+'px'}" v-for="(item,idx) in items">
                    <slot :item="item">
                        <img :id="'draggable_'+item.id" :src="env.getImgUrl(item.path)" alt class="draggable-list-item-thumbnail" />
                        <span class="draggable-list-item-actions">
                            <span @click="onPreview('draggable_'+item.id)" class="draggable-list-item-preview">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span @click="$emit('on-remove', idx)" class="draggable-list-item-delete">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </slot>
                </li>
                <div :style="{lineHeight:size+'px',width:size+'px',height:size+'px'}" @click="uploadImage" class="draggable-list-item" id="draggable-list-item-add">
                    <i class="el-icon-plus"></i>
                </div>
            </draggable>
        </transition-group>
        <multi-uploader :visible.sync="imageDialogVisible" @chosedImage="chosedImage"></multi-uploader>
    </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'viewerjs'
import draggable from 'vuedraggable'
import multiUploader from '@/components/multi_uploader'
export default {
    components: {
        draggable,
        multiUploader
    },
    computed: {
        dragOptions () {
            return {
                animation: 0,
                ghostClass: 'draggable-ghost' // 设置拖动元素的class的占位符的类名
            }
        }
    },
    name: 'DraggableImageList',
    data () {
        return {
            imageDialogVisible: false,
            focusing: false,
            draggableItems: []
        }
    },
    props: {
        items: {
            type: Array,
            default () {
                return []
            }
        },
        size: {
            type: Number,
            default: 148
        }
    },
    methods: {
        end (evt) {
            this.$emit('end', this.items)
        },
        uploadImage () {
            this.imageDialogVisible = true
        },
        chosedImage (chosen) {
            this.$emit('chosedImage', chosen)
            this.imageDialogVisible = false
        },
        onPreview (idx) {
            const el = document.getElementById(idx)
            const viewer = new Viewer(el, {})
            viewer.destroy()
            viewer.show()
        }
    },
    mounted () {

    }
}
</script>
<style scoped lang="scss">
#draggable-list-item-add {
    //line-height: 148px;
    text-align: center;
    cursor: pointer;
    border: 1px dashed #c0ccda;
    i {
        font-size: 28px;
        color: #8c939d;
    }
}

.draggable-list {
    margin: 0;
    display: inline;
    vertical-align: top;
    padding: 0;
    list-style: none;
    .draggable-list-item {
        -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        font-size: 14px;
        color: #606266;
        line-height: 1.8;
        margin-top: 5px;
        position: relative;
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        //width: 148px;
        //height: 148px;
        margin: 0 8px 8px 0;
        display: inline-block;

        :first-child {
            //margin-top: 10px;
        }
    }
    .draggable-list-item-thumbnail {
        width: 100%;
        height: 100%;
    }
    .draggable-list-item-actions {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-transition: opacity 0.3s;
        transition: opacity 0.3s;
        cursor: move;
        .draggable-list-item-delete {
            position: static;
            font-size: inherit;
            color: inherit;
            right: 10px;
            top: 0;
            display: none;
        }
        &:hover {
            opacity: 1;
            span {
                display: inline-block;
            }
        }
        &:after {
            display: inline-block;
            content: '';
            height: 100%;
            vertical-align: middle;
        }
        span {
            display: none;
            cursor: pointer;
        }
        span + span {
            margin-left: 10px;
        }
    }
    .draggable-ghost {
        opacity: 0.5;
        background: #000;
    }
}
</style>
