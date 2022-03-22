class CustomComponent {
    components = null
    mixins = null
    provide = null
    inject = null
    props = null
    data = null
    computed = null
    watch = null
    methods = null
    created = null
    mounted = null
    render = null
    template = null

    constructor (model = {}) {
        const entries = Object.entries(model)
        for (let [attr, val] of entries) {
            this[attr] = val
        }
    }

    // 合并属性
    mergeAttr (attr, val) {}

    // 合并数组
    mergeArray (attr, val) {}

    // 合并对象
    mergeObject (attr, val) {}

    // 编译组件
    compile () {}
}

class CustomSelect extends CustomComponent {}
class CustomInput extends CustomComponent {}
class CustomDialog extends CustomComponent {}
class CustomTree extends CustomComponent {}




export default {}