import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home'
import Demo from '../pages/demo'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'Home',
	component: Home
}, {
	path: '/demo',
	name: 'Demo',
	component: Demo
}]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router