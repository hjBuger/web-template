import contextmenu from './context-menu'

export default {
    install (Vue) {
        Vue.directive('contextmenu', contextmenu)
    }
}