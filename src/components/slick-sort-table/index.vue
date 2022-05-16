<script>
    import { ContainerMixin } from 'vue-slicksort'
    import TableWrap from './table-wrap'
    import SlickSortColumn from './slick-sort-column'
    import './slick-sort-table.less'

    export default {
        mixins: [ContainerMixin],
        provide () {
            return {
                slickSortTable: this
            }
        },
        props: {
            axis: {
                type: String,
                default: 'x'
            },
            // vue-slicksort属性：y轴方向拖拽
            lockAxis: {
                type: String,
                default: 'x'
            },
            // vue-slicksort属性：隐藏拖拽镜像
            hideSortableGhost: {
                type: Boolean,
                default: true
            },
            // vue-slicksort属性：使用拖拽控制，控制后，只能拖拽对应元素
            useDragHandle: {
                type: Boolean,
                default: false
            },
            // vue-slicksort属性：拖拽行class控制
            helperClass: {
                type: String,
                default: 'slick-sort-table_sortable-column'
            }
        },
        computed: {
            wrapAttrs () {
                let attrs = {};
                let ignoreKeys = ['axis', 'lockAxis','hideSortableGhost', 'useDragHandle', 'helperClass']
                let keys = Object.keys(this.$attrs).filter(key => !ignoreKeys.find(ignoreKey => ignoreKey === key))
                for(let key of keys) {
                    if(this.$attrs.hasOwnProperty(key)) {
                        attrs[key] = this.$attrs[key]
                    }
                }
                return attrs
            },
            wrapListeners () {
                return Object.assign({}, this.$listeners)
            }
        },
        methods: {
            renderColumn (h) {
                return (this.value || []).map((item, index) => {
                    return h(SlickSortColumn, {
                        props: { item, index }
                    })
                })
            }
        },
        render (h) {
            const columns = this.renderColumn(h)
            return h(TableWrap, { props: this.wrapAttrs, on: this.wrapListeners }, columns)
        }
    }
</script>
