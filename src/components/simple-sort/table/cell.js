import CellMixin from '../cell'
export default {
    mixins: [CellMixin],
    props: {
        /* table */
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
    render (h) {
        return h('div', { class: 'simple-sort-cell' }, this.$slots.default)
    }
}