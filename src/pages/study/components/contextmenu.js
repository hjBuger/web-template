import Vue from 'vue'
import contextmenuList from './contextmenuList.vue'

class Contextmenu {
    create () {
        const Model = Vue.extend(contextmenuList)
        this.vm = new Model({
            visible: false
        }).$mount()
        this.el = this.vm.$el
        document.body.appendChild(this.el)
        console.log('vm: ', this.vm)
    }
    show (list) {
        this.vm.menuList = list || []
        this.vm.visible = true
        console.log('vm2: ', this.vm)
    }
    hide () {
        this.vm.visible = false
    }
    destroy () {

    }
}

const contextmenu = new Contextmenu()


export default {
    directives: {
        contextmenu: {
            inserted (el, binding) {
                console.log('binding: ', binding)
                if (!contextmenu.vm) {
                    contextmenu.create()
                }
                el.addEventListener('click', ev => {
                    contextmenu.show(binding.value.list)
                })
            }
        }
    }
}