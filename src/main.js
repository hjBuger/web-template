import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import install from './extend/install'
import './components/global'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Patch from '@/static/js/patch/index.js'
Patch(Vue, ElementUI)
Vue.use(ElementUI)
Vue.use(install)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')