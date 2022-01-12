<script>
    export default {
        props: {
            // 可编辑
            editable: {
                type: Boolean,
                default: false
            },
            // 默认列表使用show-overflow-tooltip
            useTooltip: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            // 编辑模板
            getEditTemplate (h) {
                return h('div', {
                    class: 'sapi-input-column_input-Wrap',
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
            },
            // 文本模板
            getTemplate (h) {
                return h('div', {
                    class: 'sapi-input-column_text-Wrap',
                }, this.$scopedSlots.default())
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
            const template = this.editable ? this.getEditTemplate(h) : this.getTemplate(h)
            this.$nextTick(function () {
                const parentNode = this.$el.parentNode
                this.toggleTooltip(parentNode, !this.editable)
                this.$once('hook:beforeDestroy', () => this.toggleTooltip(parentNode, true))
            })
            
            return template
        }
    }
</script>
<style lang="less">
    .sapi-input-column_input-Wrap{
        width: 100%;
        overflow: hidden;
    }
    .sapi-input-column_text-Wrap{
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;
        white-space: nowrap;
        font-size: inherit;
        font-weight: inherit;
        color: inherit;
        line-height: inherit;
        background: transparent;
        text-align: inherit;
        vertical-align: inherit;
    }
</style>

