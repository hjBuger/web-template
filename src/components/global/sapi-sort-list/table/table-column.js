export default {
    name: 'SapiSortColumn',
    inject: {
        sapiSortList: {
            default: null
        }
    },
    props: {
        // 类型：normal/index
        type: {
            type: String,
            default: 'normal'
        },
        prop: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        // 宽度
        width: {
            type: [String, Number],
            default: ''
        },
        minWidth: {
            type: [String, Number],
            default: ''
        },
        // 列是否固定在左侧或者右侧，true/left 表示固定在左侧, right 表示固定在右侧
        fixed: {
            type: [Boolean, String],
            default: ''
        },
        // left/center/right 文本对齐方式
        align: {
            type: String,
            default: 'left'
        },
        // left/center/right 文本对齐方式
        headerAlign: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            createId: null
        }
    },
    methods: {
        dispatchColumn () {
            this.sapiSortList && this.sapiSortList.$emit('$_table_column_add', this)
        },
        removeColumn () {
            this.sapiSortList.$emit('$_table_column_remove', this.createId)
        }
    },
    created () {
        this.createId = this.sapiSortList.uniqueId('$_table_column')
        this.dispatchColumn()
    },
    destroyed () {
        this.removeColumn()
    },
    render (h) {
        return h('div', this.$slots.default)
    }
}
