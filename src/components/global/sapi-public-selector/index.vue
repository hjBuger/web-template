<template>
    <div class="sapi-public-selector">
        <div class="selector-template-block">
            <slot name="template"></slot>
        </div>
        <el-popover 
            ref="popover" 
            v-bind="realPopoverOptions" 
            v-model="visible" 
            :disabled="disabled" 
            @show="dispatchEvent('show')"
            @after-enter="handleAfterEnter"
            @hide="dispatchEvent('hide')"
            @after-leave="dispatchEvent('after-leave')"
        >
             <template v-slot:reference>
                <slot name="reference">
                    <popover-reference :visible="visible" :multiple="multiple" :len="len" @clear="handleClear"></popover-reference>
                </slot>
            </template>
            <popover-content ref="popoverContent" :data="data"></popover-content>
        </el-popover>
    </div>
</template>
<script>
    import Mixin from './mixin'
    import PopoverReference from './popover-reference'
    import PopoverContent from './popover-content'
    export default {
        components: {
            PopoverReference,
            PopoverContent
        },
        provide () {
            return {
                PUBLIC_SELECTOR: this
            }
        },
        mixins: [Mixin],
        data () {
            return {
                // 已选列表
                checkList: [],
                visible: false,
                // 数据缓存
                dataCache: [],
                // 弹窗Vue实例
                popover: null,
                treeVnodes: []
            }
        },
        computed: {
            len () {
                return this.checkList.length
            },
            checkItems () {
                return []
            }
        },
        watch: {
            value: {
                immediate: true,
                handler (val) {
                    this.checkList = this.$utils.isEmpty(val) ? [] : [].concat(val)
                    console.log('checkList: ', this.checkList)
                }
            }
        },
        methods: {
            // popover显示动画播放完毕后触发
            handleAfterEnter () {
                this.$refs.popoverContent && this.$refs.popoverContent.focus()
                this.dispatchEvent('after-enter')
            },
            // 清空选中处理
            handleClear () {
                let emptyValue = this.multiple ? [] : null
                this.dispatchEvent('input', emptyValue)
                this.dispatchEvent('change', emptyValue)
                this.dispatchEvent('clear')
            },
            // 多选单条选中移除
            multipleItemClear (id) {
                const index = this.checkList.findIndex(item => item === id)
                if (index !== -1) {
                    const item = this.getDataById(id)
                    this.checkList.splice(index, 1)
                    this.$emit('input', this.checkList)
                    this.$emit('change', this.checkItems, item)
                }
            },
            // 单选处理
            handleSelectItem (item) {
                this.$emit('input', item[this.realProps.itemId])
                this.$emit('change', item)
            },
            // 多选处理
            handleCheckItem (item) {
                this.updatePopper()
            },
            updatePopper () {
                this.popover && this.popover.updatePopper()
            },
            // 获取显示标签
            getLabel (id) {
                id = this.$utils.isObject(id) ? id[this.realProps.itemId] : id
                const current = this.getDataById(id)
                return current ? current[this.realProps.itemName] : id
            },
            // 根据id获取数据
            getDataById (id) {
                let current = this.getDataByKeyValue(id, this.data)
                if (!current) current = this.getDataByKeyValue(id, this.dataCache)
                return current
            },
            // 根据key值和数据源获取数据
            getDataByKeyValue (keyValue, list, { key = this.realProps.itemId, children = this.realProps.children, all = false } = {}) {
                return this.$utils.getDataByKeyValue(keyValue, list, {key, children, all})
            },
            // 切换展开状态
            toggleExpand (item, expanded) {
                const expandedEmpty = this.$utils.isEmpty(expanded)
                console.log('item: ', item)
            },
            innerToggleExpand (item, expanded, fn) {
                fn && fn(expanded)
            },
            getVnode (id) {
                return this.treeVnodes.find(vnode => vnode.vnodeId === id)
            },
            removeVnode (id) {
                this.treeVnodes = this.treeVnodes.filter(vnode => vnode.vnodeId !== id)
            }
        },
        created () {
            this.$on('sapi-public-selector_add-vnode', vnode => {
                this.treeVnodes.push(vnode)
            })
        },
        mounted () {
            this.$nextTick(function () {
                this.popover = this.$refs.popover
            })
        }
    }
</script>
<style lang="less">
    .sapi-public-selector{
        display: block;
        .selector-template-block{
            display: none;
        }
    }
    .el-popover.sapi-public-selector_popover{
        box-sizing: border-box;
        padding: 0;
    }
</style>
