import Vue from "vue"
import Model from "./index.vue"

export const VueExtendWrap = (Model, mount = true) => {
    const isObject = val => Object.prototype.toString.call(val) === '[object Object]'
    const newModel = new Vue({
        data: {
            modelConfig: {
                class: null,
                style: null,
                attrs: null,
                props: null,
                domProps: null,
                on: null,
                nativeOn: null,
                directives: null,
                scopedSlots: null,
                ref: 'Model',
                extendConfig: {}
            }
        },
        methods: {
            setConfigAttr (attr, key, value) {
                if (isObject(key)) {
                    this.modelConfig[attr] = key
                    return
                }
                if (!this.modelConfig[attr]) this.modelConfig[attr] = {}
                this.$set(this.modelConfig[attr], key, value)
            },
            setClass (key, value) {
                this.setConfigAttr('class', key, value)
            },
            setStyle (key, value) {
                this.setConfigAttr('style', key, value)
            },
            setAttrs (key, value) {
                this.setConfigAttr('attrs', key, value)
            },
            setProps (key, value) {
                this.setConfigAttr('props', key, value)
            },
            setDomProps (key, value) {
                this.setConfigAttr('domProps', key, value)
            },
            setOn (key, value) {
                this.setConfigAttr('on', key, value)
            },
            setNativeOn (key, value) {
                this.setConfigAttr('nativeOn', key, value)
            },
            setDirectives (key, value) {
                this.setConfigAttr('directives', key, value)
            },
            setScopedSlots (key, value) {
                this.setConfigAttr('scopedSlots', key, value)
            },
            setExtendConfig (key, value) {
                this.setConfigAttr('extendConfig', key, value)
            },
            getDirectives (directives = this.modelConfig.directives) {
                if (!directives) return []
                return Object.values(directives)
            }
        },
        render(h) {
            const scopedSlots = {
                ...(this.modelConfig.scopedSlots || {})
            }
            if (this.modelConfig.extendConfig.scopedSlots) {
                for (let [key, value] of Object.entries(this.modelConfig.extendConfig.scopedSlots)) {
                    scopedSlots[key] = value
                }
            }
            const directives = this.getDirectives
            const config = {
                ...this.modelConfig,
                directives,
                ...(this.modelConfig.extendConfig || {}),
                scopedSlots
            }
            return h(Model, config)
        }
    })

    return mount ? newModel.$mount() : newModel
}

export default class Contextmenu {
    constructor () {
        this.vm = this.create()
        if (!this.$el) {
            this.$el = this.vm.$el
            document.body.appendChild(this.$el)
            this.visible = false
        }
    }
    create () {
        return VueExtendWrap(Model)
    }
    toggle () {
        this.visible = !this.visible
        this.vm.setProps('value', this.visible)
    }
    setScopedSlots (...rest) {
        this.vm.setScopedSlots(...rest)
    }
}