
const InputColumn = () => import('./input-column')
export default {
    functional: true,
    props: {
        // 要编辑的行的key值
        editRow: {
            type: [Number, String],
            default: ''
        },
        // 表格rowKey
        rowKey: {
            type: String,
            default: 'id'
        }
    },
    render (h, context) {
        // 获取样式
        const getStyle = () => {
            const style = []
            const staticStyle = context.data.staticStyle
            const styleModel = context.data.style
            if (staticStyle) style.push(staticStyle)
            if (styleModel) {
                style.push(...([].concat(styleModel)))
            }
            return style
        }
        // 获取类
        const getClass = () => {
            const classArr = []
            const staticClass = context.data.staticClass
            const classModel = context.data.class
            if (staticClass) classArr.push(staticClass)
            if (classModel) {
                classArr.push(...([].concat(classModel)))
            }
            return classArr
        }

        const attrs = context.data.attrs
        const wrapProps = context.props
        const rowKey = wrapProps.rowKey || 'id'
        const style = getStyle()
        const classModel = getClass()
        const useTooltip = attrs ? attrs.hasOwnProperty('show-overflow-tooltip') ? attrs['show-overflow-tooltip'] !== false : false : false

        // 作用域插槽
        const scopedSlots = {
            default: props => {
                const editable = props.row[rowKey] === wrapProps.editRow
                const slot = editable ? 'input' : 'default'
                const defaultSlot = context.scopedSlots.default ? context.scopedSlots.default(props) : attrs.prop ? props.row[attrs.prop] : ''
                const template = context.scopedSlots[slot] ? context.scopedSlots[slot](props) : defaultSlot
                return !editable || !useTooltip ? template : h(InputColumn, {
                    props: {
                        editable: true
                    },
                    scopedSlots: {
                        input: () => template
                    }
                })
            },
            header: props => {
                return context.scopedSlots.header ? context.scopedSlots.header(props) : attrs.label
            }
        }

        return h('el-table-column', {
            class: classModel,
            style,
            props: {
                ...(attrs || {}),
                // 主要是通过更改属性来触发响应，实际实现是在scopedSlots.header
                label: wrapProps.editRow
            },
            scopedSlots
        })
    }
}
