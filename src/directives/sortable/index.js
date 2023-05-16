import Sortable from 'sortablejs'

/**
 * simple-sortable指令
 * @param {Array|Function} list 列表，Function类型需要返回数据，如果list是请求返回，使用Function类型
 * @param {String} target css选择器
 * @param {Function} onEndAfter 拖拽结束回调方法
 * @param {Object} config sortablejs配置属性，官方文档：http://www.sortablejs.com/options.html
 * */ 

function isFunction (val) {
    return Object.prototype.toString.call(val) === '[object Function]'
}

export default {
    inserted (el, binding) {
        const bindingValue = binding.value || {}
        // list
        const list = bindingValue.list || []

        // 绑定元素
        const target = () => {
            if (!bindingValue.target) return el
            const current = el.querySelector(bindingValue.target)

            return current || el
        }
        const bindingEl = target()

        // Sortable配置属性
        const sortableConfig = bindingValue.config || {}

        // 拖拽结束回调
        const onEndAfter = bindingValue.onEndAfter

        const config = {
            animation: 150,
            ghostClass: '',
            handle: '',
            sort: true,
            // 拖拽方向
            direction: 'horizontal',
            onEnd (ev) {
                const hasDraggable = sortableConfig.hasOwnProperty('draggable')
                const oldIndex = hasDraggable ? ev.oldDraggableIndex : ev.oldIndex
                const newIndex = hasDraggable ? ev.newDraggableIndex : ev.newIndex
                const realList = isFunction(list) ? list() || [] : list
                const item = realList.splice(oldIndex, 1)[0]

                realList.splice(newIndex, 0, item)

                // 执行onEndAfter方法
                if (isFunction(onEndAfter)) {
                    onEndAfter(ev, realList)
                }
            },
            ...sortableConfig
        }

        el.SortableObj = new Sortable(bindingEl, config)
    },
    unbind (el) {
        el.SortableObj && el.SortableObj.destroy()
    }
}