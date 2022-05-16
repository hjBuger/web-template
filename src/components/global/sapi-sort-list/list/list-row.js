import {ElementMixin, HandleDirective } from 'vue-slicksort'
export default {
    mixins: [ElementMixin],
    inject: {
        sapiSortList: {
            default: null
        }
    },
    props: {
        // vue-slicksort属性：数据
        item: {
            type: Object,
            default () {
                return {}
            }
        },
        // vue-slicksort属性：序号
        index: {
            type: Number,
            default: 0
        },
        // row高度控制
        height: {
            type: [String, Number],
            default: null
        }
    },
    directives: {
        handle: HandleDirective
    },
    computed: {
        xDirective () {
            return this.sapiSortList.lockAxis.toLowerCase() !== 'y'
        },
        className () {
            return {
                'sapi-sort-row': true,
                'sapi-sort-row-border': this.sapiSortList.border,
                'sapi-sort-row_x': this.xDirective
            }
        },
        rowStyle () {
            const style = {}
            if (this.height) style.height = /px|%|vh|pt|em|rem|calc|auto/.test(this.height) ? this.height : parseFloat(this.height) + 'px'
            return style
        }
    },
    render (h) {
        const Handler = () => (
            <div class="sapi-sort-row-handle" v-handle>
                <i class={this.sapiSortList.dragIcon || 'icon-menu'}></i>
            </div>
        )

        return (
            <li class={this.className} style={this.rowStyle}>
                <div class="sapi-sort-row-content">
                    {this.$slots.default}
                </div>
                {this.sapiSortList.useDragHandle && !this.xDirective ? <Handler/> : ''}
            </li>
        )
    }
}
