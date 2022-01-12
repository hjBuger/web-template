import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home'
import AutoCreateRouters from './autoCreateRouters'

Vue.use(VueRouter)

const routes = [
	...AutoCreateRouters,
	{
		path: '/',
		name: 'Home',
		component: Home
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router