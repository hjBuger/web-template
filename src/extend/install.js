import utils from '@/static/utils'
export default {
    install (Vue, options) {
        Vue.prototype.$utils = utils
    }
}