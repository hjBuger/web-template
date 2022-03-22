<template>
    <div class="sapi-public-selector_content-tree">
        <selector-tree-item :item="data.item" :level="data.level" v-for="data in treeData" :key="data.item[realProps.itemId]"></selector-tree-item>
    </div>
</template>
<script>
    import SelectorTreeItem from './tree-item'
    export default {
        components: {
            SelectorTreeItem
        },
        inject: {
            PUBLIC_SELECTOR: {
                default: null
            }
        },
        computed: {
            realProps () {
                return this.PUBLIC_SELECTOR.realProps
            },
            treeData () {
                return this.getTreeData(this.PUBLIC_SELECTOR.data)
            }
        },
        data () {
            return {}
        },
        methods: {
            getTreeData (list, level = 1, chain = null, treeData = []) {
                for (let item of list) {
                    const model = {
                        level,
                        item,
                        chain
                    }
                    treeData.push(model)
                    if (item[this.realProps.children] && item[this.realProps.children].length) {
                        let parentChain = chain ? [...chain, item[this.realProps.itemId]] : [item[this.realProps.itemId]]
                        this.getTreeData(item[this.realProps.children], level + 1, parentChain, treeData)
                    }
                }
                return treeData
            }
        },
        render (h) {
            return ''
        }
    }
</script>
