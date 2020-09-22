<!--
 * @Description: https://gitee.com/bingofree/keras_mall.git
 * @Author: Created by nzb@yeah.net qq:9679489
 * @Date: 2019-10-15 16:21:12
-->
<template>
    <div>
        <ext-button :size="miniSize" @click="handlePickArea()" icon="el-icon-ali-Newxuanzeshangpinxuanzhong"
            label="选择区域" type="primary" />
        <el-dialog :close-on-click-modal="false" :modal-append-to-body="false" :size="miniSize"
            :visible.sync="dialogVisible" title="区域选择窗" width="40%">
            <el-tree :default-checked-keys="areaIds" :load="loadNode" :props="props" lazy node-key="id" ref="areaTree"
                show-checkbox></el-tree>
            <span class="dialog-footer" slot="footer">
                <el-button :size="miniSize" @click="dialogVisible = false" round>取 消</el-button>
                <el-button :size="miniSize" @click="chosedAreas" round type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import _ from 'lodash'
import extButton from '@/components/core/ext_button'
export default {
    name: 'PickAreas',
    components: {
        extButton
    },
    data () {
        return {
            miniSize: 'mini',
            normalSize: 'small',
            loading: false,
            dialogVisible: false,
            props: {
                id: 'id',
                label: 'name',
                children: 'children',
                isLeaf: 'leaf'
            }
        }
    },
    props: {
        areaIds: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    methods: {
        /**
        * 地区列表
        */
        async getAreaList (parentId) {
            let _data = []
            const _result = await this.$api.area.list({ searchKey: { parentId } })
            if (_result.succeed === 1 && _result.code === 200) {
                _data = _result.data.list
            }
            return _data
        },
        handlePickArea () {
            this.dialogVisible = true
        },
        chosedAreas () {
            const checkedNodes = this.$refs.areaTree.getCheckedNodes().map(v => { return { id: v.id, name: v.name } })
            this.$emit('chosedAreas', checkedNodes)
            this.dialogVisible = false
        },
        loadNode (node, resolve) {
            if (node.level === 0) {
                this.getAreaList(0).then(data => {
                    return resolve(data)
                })
            } else if (node.level > 0) {
                this.getAreaList(node.data.id).then(data => {
                    return resolve(data)
                })
            }
        }
    },
    mounted () { }
}
</script>
<style scoped lang="scss">
</style>
