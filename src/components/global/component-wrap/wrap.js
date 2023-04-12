const methods = [
    'checkBarShow',
    'resetPlace',
    'bindResize'
]

export default {
    props: {
        component: {
            type: [String, Object],
            default: 'div'
        }
    },
    methods: {
        ...(methods.reduce((rs, item) => {
            rs[item] = new Function(`
                this.$refs.realComponent['${item}'](...Array.from(arguments))
            `)
            return rs
        }, {})),
    },
    render (h) {
        const scopedSlots = this.$scopedSlots || {}

        return h(this.component, {
            props: {
                ...this.$attrs
            },
            on: {
                ...this.$listeners
            },
            scopedSlots: {
                ...(Object.keys(scopedSlots).reduce((rs, slotName) => {
                    rs[slotName] = props => {
                        return scopedSlots[slotName](props)
                    }
                    return rs
                }, {}))
            },
            ref: 'realComponent'
        })
    }
}