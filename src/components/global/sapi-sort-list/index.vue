<script>
    import { ContainerMixin } from 'vue-slicksort'
    import ListWrap from './list/list-wrap'
    import TableWrap from './table/table-wrap'
    import './sapi-sort-list.less'

    export default {
        components: {
            ListWrap,
            TableWrap
        },
        mixins: [ContainerMixin],
        provide () {
            return {
                sapiSortList: this
            }
        },
        props: {
            // vue-slicksort属性：y轴方向拖拽
            lockAxis: {
                type: String,
                default: 'y'
            },
            // vue-slicksort属性：隐藏拖拽镜像
            hideSortableGhost: {
                type: Boolean,
                default: true
            },
            // vue-slicksort属性：使用拖拽控制，控制后，只能拖拽对应元素
            useDragHandle: {
                type: Boolean,
                default: true
            },
            // vue-slicksort属性：拖拽行class控制
            helperClass: {
                type: String,
                default: 'sapi-sort-list_sortable-row'
            },
            // list：列表形式、table-表格形式
            type: {
                type: String,
                default: 'list'
            },
            // 显示边框
            border: {
                type: Boolean,
                default: true
            },
            // useDragHandle为true时，显示的拖拽图标
            dragIcon: {
                type: String,
                default: 'icon-menu'
            }
        },
        computed: {
            wrapAttrs () {
                let attrs = {};
                let ignoreKeys = ['lockAxis','hideSortableGhost', 'useDragHandle', 'helperClass','type', 'dragIcon']
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
        render (h) {
            return h(`${this.type}-wrap`, { props: this.wrapAttrs, on: this.wrapListeners }, this.$scopedSlots.default && this.$scopedSlots.default({}))
        }
    }
</script>
