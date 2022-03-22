export default {
    inject: {
        PUBLIC_SELECTOR: {
            default: null
        }
    },
    computed: {
        checkList () {
            return this.PUBLIC_SELECTOR.checkList
        },
        realTooltipOptions () {
            return this.PUBLIC_SELECTOR.realTooltipOptions
        }
    },
    methods: {
        getTemplate (h) {
            return this.PUBLIC_SELECTOR.multiple ? this.getMultipleTemplate(h) : this.getSingleTemplate(h)
        },
        // 单选模板
        getSingleTemplate (h) {
            const label = this.PUBLIC_SELECTOR.getLabel(this.checkList[0])
            return h('div', {
                class: 'single-holder-wrap', 
                attrs: {
                    title: label
                }
            }, label)
        },
        // 多选模板
        getMultipleTemplate (h) {
            if (this.PUBLIC_SELECTOR.collapseTags && this.checkList.length > 1) return this.getMultipleCollapseTemplate(h)
            return this.checkList.map(id => {
                return this.createMultiItem(id, h)
            })
        },
        // 多选折叠渲染
        getMultipleCollapseTemplate (h) {
            // 第一条数据渲染
            const item = this.createMultiItem(this.checkList[0], h)

            // 计数占位
            const len = this.checkList.length - 1
            const labelItem = h('div', {class: 'multiple-holder-label'}, `+${len}`)
            let collapseItem = h('div', {class: 'multiple-holder-wrap multiple-holder-collapse-item'}, [labelItem])

            if (this.PUBLIC_SELECTOR.collapseShowTooltip) {
                collapseItem = this.getTooltipTemplate(h, collapseItem)
            }

            return [item, collapseItem]
        },
        // Tooltip模板
        getTooltipTemplate (h, collapseItem) {
            // 折叠元素
            const items = this.checkList.filter((id, index) => !!index).map(id => {
                return this.createMultiItem(id, h)
            })

            // 滚动容器
            const scrollView = h('el-scrollbar', {
                class: {
                    'el-scrollbar_style-handle': true
                },
                ref: 'tooltipScrollbar'
            }, [h('div', {class: 'tooltip-content-wrap'}, items)])

            // 折叠内容区
            const contentEl = h('div', {
                class: 'selector-tooltip-content',
                style: {
                    width: this.realTooltipOptions.contentWidth + 'px',
                    maxHeight: `${this.realTooltipOptions.contentMaxHeight}px`
                },
                slot: 'content'
            }, [scrollView])

            return h('el-tooltip', {
                props: {
                    effect: this.realTooltipOptions.effect,
                    popperClass: `selector-tooltip ${this.realTooltipOptions.popperClassName}`,
                    placement: 'right-start',
                },
                ref: 'selectorTooltip'
            }, [collapseItem, contentEl])
        },
        // 创建多选已选标签
        createMultiItem (id, h) {
            const label = this.PUBLIC_SELECTOR.getLabel(id)
            const labelItem = h('div', {
                class: 'multiple-holder-label',
                attrs: {
                    title: label
                }
            }, label)
            const clearItem = h('div', {
                class: 'multiple-holder-clear',
                on: {
                    click: ev => {
                        this.PUBLIC_SELECTOR.multipleItemClear(id)
                        ev.stopPropagation()
                    }
                }
            })

            return h('div', {class: 'multiple-holder-wrap'}, [labelItem, clearItem])
        }
    },
    render (h) {
        let template = this.PUBLIC_SELECTOR.placeholder
        if (this.checkList.length) template = this.getTemplate(h)
        return h('div', {
            class: {
                'popover-reference-holder': true,
                'popover-reference-holder-empty': !this.checkList.length,
                'popover-reference-holder-multiple': this.PUBLIC_SELECTOR.multiple,
                'popover-reference-holder-single': !this.PUBLIC_SELECTOR.multiple,
                'popover-reference-multiple-collapse': this.PUBLIC_SELECTOR.multiple && this.PUBLIC_SELECTOR.collapseTags,
            }
        }, [].concat(template))
    }
}
