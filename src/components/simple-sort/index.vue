<script>
    export default {
        provide () {
            return {
                SimpleSort: this
            }
        },
        props: {
            // 类型：table-表格、list-列表、grid-网格
            type: {
                type: String,
                default: 'table'
            },
            // 为0时高度不做限制
            height: {
                type: [Number, String],
                default: 0
            }
        },
        data () {
            return {
                // 节点集合
                nodeList: []
            }
        },
        methods: {
            // 根据类型获取容器
            getContainer (h) {
                return ''
            }
        },
        created () {
            this.$on('$_simple-sort-cell_add', node => {
                nodeList.push(node)
            })
        },
        render (h) {
            return h('div', { class: 'simple-sort' }, this.$scopedSlots.default())
        }
    }
</script>
<style lang="less">
    .simple-sort{
        width: 100%;
        max-width: 100%;
        height: auto;
        overflow: hidden;
    }
</style>
