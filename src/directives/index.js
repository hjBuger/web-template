import contextmenu from './context-menu'
import sortable from './sortable'

export default {
    install (Vue) {
        Vue.directive('contextmenu', contextmenu)
        Vue.directive('simple-sortable', sortable)
    }
}