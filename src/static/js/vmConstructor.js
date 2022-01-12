import Vue from 'vue'

function oType (val) {
    return Object.prototype.toString.call(val).replace(/^\[object\s+(\w+)\]$/, '$1')
}

function isElement (val) {
    const type = oType(val)
    return /HTML\w+Element/.test(type)
}

function isEmpty (obj) {
    return Object.is(null, obj) || Object.is(undefined, obj) || Object.is('', obj) || Object.is(NaN, obj)
}

// 构造器
class VmConstructor {
    createKeys = []

    constructor () {
        this.createWrap()
    }

    /**
     * 创建实例模型: 
     * 除了id、component、wrap外，属性跟render支持的数据对象对应(slot、key、ref、refInFor无效)
     * scopedSlots与render的有差别，这里是传入一个方法返回配置对象
     * options: {
     *      id: 'chooseUser',
     *      component: () => import('@/components/choose-user.vue'),
     *      wrap: null, // 包裹元素，可以是css选择器，也可以是html标签节点
     *      props: null,
     *      on: null,
     *      scopedSlots: h => { default: props => h('span', props.text) }
     *      ...
     * }
     * */ 
	create (options) {
        if (this[options.id]) return this[options.id]
        const wrap = this.getWrap(options.wrap)
        const vw = new VmWrap(options, wrap, this)

        this[options.id] = vw
        this.createKeys.push(options.id)

        return vw
	}

    // 获取包裹元素
    getWrap (selector) {
        let wrap = this.wrap
        if (selector) {
            if (oType(selector) === 'String') {
                wrap = document.querySelector(selector)
            }
            if (isElement(selector)) wrap = selector
        }
        return wrap
    }

    // 创建包裹元素
    createWrap () {
        if (this.wrap) return
        const wrap = document.createElement('div')
        wrap.setAttribute('id', 'popup-constructor-wrap')
        document.body.appendChild(wrap)
        this.wrap = wrap
    }

    // 清除新增的key值
    clear (key) {
        if (key) {
            const keys = [].concat(key)
            for (let ck of keys) {
                if (!this.createKeys.includes(ck)) continue
                const index = this.createKeys.findIndex(k => k === ck)
                if (index !== -1) this.createKeys.splice(index, 1)
                this[ck].clear && this[ck].clear()
                this[ck] = null
            }
            return
        }
        for (let ck of this.createKeys) {
            this[ck].clear && this[ck].clear()
            this[ck] = null
        }
        this.createKeys = []
        document.body.removeChild(this.wrap)
        this.wrap = null
    }
}

// 实例包裹
class VmWrap {
    // 实例构建属性对象
    vmClass = {}
    vmAttrs = {}
    vmProps = {}
    vmDomProps = {}
    vmOn = {}
    vmNativeOn = {}
    vmDirectives = {}

    constructor (options, wrap, parent) {
        this.guid = options.id
        this.options = options
        this.wrap = wrap
        this.parent = parent
        this.create(options)
    }

    // 创建
    create (options) {
        const entries = Object.entries(options)
        const createModel = {}
        for (let [key, value] of entries) {
            if (['id', 'component', 'wrap'].includes(key)) continue
            createModel[key] = value
        }
        const wrapObj = this
        const defaultDataModel = {
            style: null,
            scopedSlots: null,
            ...createModel
        }
        const componentName = `popup-model-${options.id}`
        const vmClass = wrapObj._transClass(defaultDataModel.class)
        const vmAttrs = wrapObj._transObject(defaultDataModel.attrs, wrapObj.vmAttrs)
        const vmProps = wrapObj._transObject(defaultDataModel.props, wrapObj.vmProps)
        const vmDomProps = wrapObj._transObject(defaultDataModel.domProps, wrapObj.vmDomProps)
        const vmOn = wrapObj._transObject(defaultDataModel.on, wrapObj.vmOn)
        const vmNativeOn = wrapObj._transObject(defaultDataModel.nativeOn, wrapObj.vmNativeOn)
        const vmDirectives = wrapObj._transObject(defaultDataModel.directives, wrapObj.vmDirectives)

        const Model = Vue.extend({
            components: {
                [componentName]: options.component
            },
            data () {
                return {
                    // 与 `v-bind:class` 的 API 相同，
                    class: vmClass,
                    // 与 `v-bind:style` 的 API 相同，
                    style: defaultDataModel.style,
                    // 普通的 HTML attribute
                    attrs: vmAttrs,
                    // 组件 prop
                    props: vmProps,
                    // DOM property
                    domProps: vmDomProps,
                    // 事件监听器
                    on: vmOn,
                    // 仅用于组件，用于监听原生事件
                    nativeOn: vmNativeOn,
                    // 自定义指令
                    directives: vmDirectives,
                     // 获取作用域插槽方法, h => { default: props => h('span', props.text) }
                    scopedSlots: defaultDataModel.scopedSlots
                }
            },
            methods: {
                // 设置数据模型方法
                // { props: null, on: null, ... }, 与data里的属性对应
                setDataModel (dataModel) {
                    if (!dataModel || oType(dataModel) !== 'Object') return
                    const entries = Object.entries(dataModel)
                    for (let [key, value] of entries) {
                        if (this.hasOwnProperty(key)) this[key] = value
                    }
                }
            },
            render (h) {
                const dataModel = {
                    class: this.class,
                    style: this.style,
                    attrs: this.attrs,
                    props: this.props,
                    domProps: this.domProps,
                    on: this.on,
                    nativeOn: this.nativeOn,
                    directives: this.directives,
                    scopedSlots: null
                }
                if (oType(this.scopedSlots) === 'Function') {
                    dataModel.scopedSlots = this.scopedSlots(h)
                }
                return h(componentName, dataModel)
            }
        })

        const vm = new Model().$mount()

        this.wrap.appendChild(vm.$el)
        this.vm = vm
    }

    // 清除
    clear () {
        this.wrap.removeChild(this.vm.$el)
        this.vm = null
        this.parent && this.parent.clear && this.parent.clear(this.guid)
    }

    // 设置render数据模型
    $set (dataModel) {
        this.vm.setDataModel(dataModel)
        return this
    }

    // class设置
    $class (key, value) {
        if (oType(key) === 'String' && oType(value) === 'Boolean') {
            this.vmClass[key] = value
        } else {
            this._transClass(key)
        }
        this.vm.class = {
            ...(this.vmClass || {})
        }
        return this
    }

    // 样式设置
    $style (style) {
        this.vm.style = style
        return this
    }

    // HTML attribute设置
    $attrs (key, value) {
        return this._setObject(key, value, 'vmAttrs', 'attrs')
    }

    // 组件props设置
    $props (key, value) {
        return this._setObject(key, value, 'vmProps', 'props')
    }

    // DOM property设置
    $domProps (key, value) {
        return this._setObject(key, value, 'vmDomProps', 'domProps')
    }

    // 组件事件监听
    $on (key, value) {
        return this._setObject(key, value, 'vmOn', 'on')
    }

    // 原生事件监听
    $nativeOn (key, value) {
        return this._setObject(key, value, 'vmNativeOn', 'nativeOn')
    }

    // 指令设置
    $directives (key, value) {
        return this._setObject(key, value, 'vmDirectives', 'directives')
    }

    // 作用域插槽设置
    $scopedSlots (fn) {
        if (oType(fn) === 'Function') {
            this.vm.scopedSlots = fn
        }
        return this
    }

    // 将class设置全部转化为对象形式
    _transClass (classSetting) {
        if (oType(classSetting) === 'String') {
            classSetting = classSetting.trim()
            if (classSetting) {
                const keys = classSetting.split(/\s+/)
                for (let key of keys) {
                    this.vmClass[key] = true
                }
            }
        }
        if (oType(classSetting) === 'Object') {
            const entries = Object.entries(classSetting)
            for (let [key, value] of entries) {
                this.vmClass[key] = value
            }
        }
        if (oType(classSetting) === 'Array') {
            for (let item of classSetting) {
                this._transClass(item)
            }
        }

        return {
            ...(this.vmClass || {})
        }
    }

    // 对象属性转换
    _transObject (data, obj) {
        if (oType(data) === 'Object') {
            const entries = Object.entries(data)
            for (let [key, value] of entries) {
                obj[key] = value
            }
        }

        return {
            ...(obj || {})
        }
    }

    // 对象设置
    _setObject (key, value, wrapKey, dataKey) {
        if (oType(key) === 'Object') {
            const entries = Object.entries(key)
            for (let [attr, val] of entries) {
                this[wrapKey][attr] = val
            }
        }
        if (oType(key) === 'String') {
            this[wrapKey][key] = isEmpty(value) ? null : value
        }
        if (dataKey) {
            this.vm[dataKey] = {
                ...(this[wrapKey] || {})
            }
        }

        return this
    }

}

export default VmConstructor
