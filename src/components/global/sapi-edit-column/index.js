const InputColumn = () => import('./input-column')
export default {
    functional: true,
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

        // 空值判断
        const isEmpty = (val, includeEmptyString = true) => {
            const emptyList = [null, undefined, NaN]
            if (includeEmptyString) emptyList.push('')
            return emptyList.some(item => Object.is(item, val))
        }

        // column属性
        const attrs = context.data.attrs || {}
        // 判断使用tooltip
        const useTooltip = attrs.hasOwnProperty('show-overflow-tooltip') ? attrs['show-overflow-tooltip'] !== false : false

        // 数据模型
        const dataModel = {
            class: getClass(),
            style: getStyle(),
            props: attrs,
            // 作用域插槽
            scopedSlots: {
                default: props => {
                    const defaultSlot = context.scopedSlots.default ? context.scopedSlots.default(props) : attrs.prop ? props.row[attrs.prop] : ''
                    const inputSlot = context.scopedSlots.input ? context.scopedSlots.input(props) : defaultSlot

                    return h(InputColumn, {
                        props: {
                            rowProps: props,
                            useTooltip
                        },
                        scopedSlots: {
                            default: () => defaultSlot,
                            input: () => inputSlot
                        }
                    })
                },
                header: props => {
                    return context.scopedSlots.header ? context.scopedSlots.header(props) : isEmpty(attrs.label) ? '' : attrs.label
                }
            },
            key: context.data.key || null
        }

        return h('el-table-column', dataModel)
    }
}
