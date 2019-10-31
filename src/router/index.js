import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import storehouse from '@/components/storehouse'

import Login from '@/components/Login'
import store from '@/store'

Vue.use(Router)


const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/Login',
		name: Login,
		component: Login
	},
	{
		path: '/storehouse',
		name: 'storehouse',
		component: storehouse,
		meta: {
			requiresAuth: true
		}
	}
]


const router = new Router({
	routes
})

//全局前置守卫
router.beforeEach((to, from, next) => {
	console.log('触发全局前置守卫')
	if (to.matched.some(item => item.meta.requiresAuth)) { //遍历路由记录,如果有requiresAuth:true，也即要进入 /storehouse路由时
		if (store.state.token) { //如果有token信息，即登陆成功	注:这里不能直接使用this.$store.state.token的方式调用vuex
			next() //正常进入 /storehouse路由
		} else { //否则 跳回登录页面，并把要跳转的路由作为参数传入
			// console.log('to.fullPath:',to.fullPath,router.currentRoute.fullPath)
			next({
				path: '/Login', 
				query: {					//把要进入的地址(这里指/storehouse)作为参数传过去，以便调用访问
					redirect: to.fullPath	//to.fullPaht要进入的路由,这里是指 /storehouse 
				} 
			})
		}
	} else {
		next()
	}
})

//向外暴露路由
export default router
