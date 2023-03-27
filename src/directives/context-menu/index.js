import Vue from 'vue'
import Menu from './menu.vue'

class Contextmenu {
    // 绑定节点
    bindEls = []

    // 创建
    create (el) {
        if (!this.bindEls.find(item => item === el)) this.bindEls.push(el)
        if (this.vm) return

        const Model = Vue.extend(Menu)
        
        this.vm = new Model({
            visible: false,
            position: {},
            list: [],
            border: true,
            params: {}
        }).$mount()
        this.el = this.vm.$el
        document.body.appendChild(this.el)
        this.hideHandle()
    }

    // 显示
    show (list, position, border = true, params = {}) {
        this.vm.list = list || []
        this.vm.position = position
        this.vm.visible = true
        this.vm.border = border
        this.vm.params = params

        // 边界矫正
        this.vm.$nextTick(() => {
            const width = this.el.clientWidth
            const height = this.el.clientHeight
            const winWidth = window.innerWidth
            const winHeight = window.innerHeight

            if (this.vm.position.left + width > winWidth){
                this.vm.position.left = winWidth - width
            }

            if (this.vm.position.left < 0) {
                this.vm.position.left = 0
            }

            if (this.vm.position.top < 0) {
                this.vm.position.top = 0
            }

            if (this.vm.position.top + height > winHeight) {
                this.vm.position.top = winHeight - height
            }
        })
    }

    // 隐藏
    hide = () => {
        this.vm.visible = false
    }

    // 右键隐藏控制
    contextmenuHide = ev => {
        if (this.bindEls.find(item => item === ev.target)) return
        this.hide
    }

    // 隐藏处理
    hideHandle () {
        document.addEventListener('click', this.hide, true)
        document.addEventListener('contextmenu', this.contextmenuHide, true)
    }

    // 移除绑定节点
    remove (el) {
        const index = this.bindEls.findIndex(item => item === el)
        if (index !== -1) this.bindEls.splice(index, 1)
        if (!this.bindEls.length) this.destroy()
    }

    // 销毁
    destroy () {
        document.body.removeChild(this.el)
        this.el = null
        this.vm = null
        document.removeEventListener('click', this.hide, true)
        document.removeEventListener('contextmenu', this.contextmenuHide, true)
    }
}

// 导出实例，外部可以直接使用实例操作而不一定使用指令
export const CM = new Contextmenu()

// 获取父节点
function getParentNodes (el, parents = []) {
    if (el.parentElement) {
        parents.push(el.parentElement)
        getParentNodes(el.parentElement, parents)
    }

    return parents
}

const isObject = val => typeof val === 'object' && val !== null
const isString = val => Object.prototype.toString.call(val) === '[object String]'
const isFunction = val => Object.prototype.toString.call(val) === '[object Function]'
const isElement = val => /^HTML\w*Element/.test(Object.prototype.toString.call(val).replace(/^\[object\s+(\w+)\]$/, '$1'))

/**
 * contextmenu指令
 * @param {Array|Function} list 菜单列表
 *  [
 *      {
 *          text: '删除',
 *          icon: 'el-icon-delete',
 *          value: 'delete',
 *          onClick: (item, options) => {}
 *      }
 *  ]
 * @param {Object} position 偏移量 { x: 5, y: 5 }
 * @param {Any} params 自定义参数，非响应
 * @param {Boolean} border 显示线条，默认true
 * @param {Function} validator 校验器，校验不通过则不显示菜单，(ev, bindEl, bindingValue) => true
 * @param {Object|String} proxy 父级代理绑定，Vue实例(包含$el)，css选择器
 * 
 * @example 由于params非响应，提供contextmenu-flag属性作为响应标记
 * <div
 *    v-contextmenu="{ list: contextMenuList, position: {x: 10, y: 10}, params: {aaa: 1}, border: false, validator: validator}"
 *    :contextmenu-flag="item.id"
 * ></div>
 
 * */


export default {
    inserted (el, binding) {
        let proxyEl = el

        // 父级代理绑定
        if (binding.value.proxy) {
            const proxy = binding.value.proxy
            if (isObject(proxy) && proxy.$el) {
                proxyEl = proxy.$el
            } else if(isString(proxy)) {
                const proxyEls = Array.from(document.querySelectorAll(proxy) || [])
                const parents = getParentNodes(el)
                const proxyParent = proxyEls.find(p => parents.includes(p))
                if (proxyParent) proxyEl = proxyParent
            }
        }

        CM.create(proxyEl)
        const validator = binding.value.validator

        proxyEl.contextmenu_fn = ev => {
            // 执行校验
            if (isFunction(validator)) {
                if (!validator(ev, proxyEl, binding.value)) return
            }

            // 阻止默认事件
            ev.preventDefault()

            // 位置
            const position = {
                x: 5,
                y: 5,
                ...(binding.value.position || {})
            }
            const left = ev.clientX + position.x
            const top = ev.clientY + position.y

            // 标记
            const flag = el.getAttribute('contextmenu-flag')
            const list = isFunction(binding.value.list) ? binding.value.list(binding.value) : binding.value.list
            const params = {
                params: binding.value.params,
                flag,
                el
            }

            if (binding.value.proxy) params.proxyEl = proxyEl

            CM.show(list, { left, top }, binding.value.border, params)
        }

        el.contextmenu_unbind_fn = () => {
            proxyEl.removeEventListener('contextmenu', proxyEl.contextmenu_fn, false)
            proxyEl.contextmenu_fn = null
            el.contextmenu_unbind_fn = null
            CM.remove(proxyEl)
        }

        proxyEl.className += ' v-contextmenu-el'
        proxyEl.addEventListener('contextmenu', proxyEl.contextmenu_fn, false)
    },
    unbind (el) {
        el.contextmenu_unbind_fn && el.contextmenu_unbind_fn()
    }
}