export default {
    components: {
        'tree-item-template': () => import('./tree-item-template')
    },
    inject: {
        PUBLIC_SELECTOR: {
            default: null
        }
    },
    props: {
        item: {
            type: Object,
            default () {
                return {}
            }
        },
        level: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {
            expanded: false,
            loading: false,
            vnodeId: ''
        }
    },
    computed: {
        realProps () {
            return this.PUBLIC_SELECTOR.realProps
        }
    },
    methods: {
        getItemTemplate (h) {
            let itemTemplate = h('tree-item-template', {
                props: {
                    item: this.item
                }
            })
            return itemTemplate
        },
        toggleExpand () {
            if (!this.expanded) this.loading = true
            this.PUBLIC_SELECTOR.innerToggleExpand(this.item, !this.expanded, expanded => {
                this.closeLoading()
                this.expanded = expanded
            })
        },
        closeLoading () {
            this.loading = false
        }
    },
    created () {
        this.vnodeId = this.item[this.realProps.itemId]
        this.PUBLIC_SELECTOR.$emit('sapi-public-selector_add-vnode', this)
    },
    render (h) {
        const childVnode = []
        if (this.item[this.realProps.hasChild] || (this.item[this.realProps.children] && this.item[this.realProps.children].length)) {
            const expandItem = h('div', {
                class: 'sapi-public-selector_expand-item',
                on: {
                    click: ev => {
                        this.toggleExpand()
                    }
                }
            }, [h('i', {class: this.loading ? 'el-icon-loading' : this.expanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right'})])
            childVnode.push(expandItem)
        }
        const template = this.getItemTemplate(h)
        childVnode.push(template)

        return h('div', {
            class: 'sapi-public-selector_tree-item',
            attrs: {
                'tree-level': this.level
            }
        }, childVnode)
    }
}
