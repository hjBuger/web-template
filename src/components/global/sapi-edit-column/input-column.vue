<script>
    export default {
        // 注入el-table
        inject: {
            EL_TABLE: {
                default: null
            }
        },
        props: {
            // 行的作用域props
            rowProps: {
                type: Object,
                default () {
                    return {}
                }
            },
            // 列使用show-overflow-tooltip
            useTooltip: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            // 可编辑
            editable () {
                return this.rowProps.row[this.rowKey] === this.editRow
            },
            rowKey () {
                return this.EL_TABLE && this.EL_TABLE.rowKey || 'id'
            },
            // 编辑行
            editRow () {
                return this.EL_TABLE && this.EL_TABLE.editRow || ''
            }
        },
        methods: {
            // 编辑模板
            getEditTemplate (h) {
                let template = ''
                if (this.$scopedSlots.input) {
                    template = !this.useTooltip ? this.$scopedSlots.input() : h('div', {
                        class: 'sapi-edit-column_input-wrap',
                        on: {
                            'mouseenter': ev => {
                                this.hidePopper()
                                ev.stopPropagation()
                            },
                            'mouseover': ev => {
                                this.hidePopper()
                                ev.stopPropagation()
                            },
                            'mouseleave': ev => {
                                ev.stopPropagation()
                            }
                        }
                    }, this.$scopedSlots.input())
                }
                return template
            },
            // el-tooltip类控制
            toggleTooltip (parentNode, add = true) {
                if (!this.useTooltip || !parentNode) return
                const classList = (parentNode.className || '').split(/\s+/)
                const index = classList.findIndex(item => item === 'el-tooltip')
                if (add && index === -1) {
                    classList.push('el-tooltip')
                }
                if (!add && index !== -1) {
                    classList.splice(index, 1)
                }
                const className = classList.join(' ')
                parentNode.className = className
            },
            // 隐藏tooltip
            hidePopper () {
                if (this.editable && this.useTooltip) {
                    const tooltip = this.$parent && this.$parent.$refs.tooltip || null
                    if (tooltip) tooltip.showPopper = false
                }
            }
        },
        render (h) {
            let template = this.$scopedSlots.default && this.$scopedSlots.default() || ''
            if (template && template.length > 1) template = h('div', { class: 'sapi-edit-column_default-wrap' }, template)

            if (this.editable) template = this.getEditTemplate(h)

            if (this.useTooltip) {
                this.$nextTick(function () {
                    const parentNode = this.$el.parentNode
                    this.toggleTooltip(parentNode, !this.editable)
                    this.$once('hook:beforeDestroy', () => this.toggleTooltip(parentNode, true))
                })
            }
            
            return template
        }
    }
</script>
<style lang="less">
    .sapi-edit-column_input-wrap{
        width: 100%;
        overflow: hidden;
    }
    .sapi-edit-column_default-wrap{
        width: 100%;
        display: inherit;
        font-size: inherit;
        font-weight: inherit;
        color: inherit;
        line-height: inherit;
        text-align: inherit;
        overflow: inherit;
        text-overflow: inherit;
        word-break: inherit;
        white-space: inherit;
    }
</style>
