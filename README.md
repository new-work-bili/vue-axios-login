# vue-login

> A Vue.js project



###使用vue-router和axios进行token的登陆拦截,并调用gtihub接口查看git仓库
###技术栈：
* vue
* vue-router 
* axios
* bootstrap
* vux

###登陆拦截

>vue-router导航守卫:
	设置全局前置守卫判断，其中to将要进入的路由
	我们在/storehouse路由(仓库页面)设置一个参数mate:{requiresAuth:true}，标记该路由
	之后在前置守卫中设置
	每次做路由跳转时，判断将要进入的路由是否含有requiresAuth参数，既要跳转的路由是否是/storehouse路由
	如果是，判断是否输入了token,如果state中有token的值，那么next()； 进入/storehouse
	否则，回跳至登陆页面进行登录

```
//router>index.js

const routes = [
	...
	...
	{
		path: '/storehouse',
		name: 'storehouse',
		component: storehouse,
		meta: {
			requiresAuth: true
		}
	}
]
...
...
//全局前置守卫全局前置守卫
router.beforeEach((to, from, next) => {
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
```

>axios拦截器：
进入仓库页面后
在触发mounted钩子时(即页面挂在完成)使用axios
会在请求头中的A*****设置我们输入的token，
如果token无效，会返回401,
当返回401时，重新调回登陆页面，并弹出报错信息

```
//axios的请求拦截，在每次使用axios如get时会触发
axios.interceptors.request.use( 
	config => {
		if (store.state.token) { //如果输入的有token的话
			//在发送请求时，在请求头设置state里的token
			config.headers.Authorization = `token ${store.state.token}`
		}
		return config;
	},
	err => { //如果发生错误，调用reject，
		return Promise.reject(err)
	})

//axios的返回拦截，返回数据时会触发
axios.interceptors.response.use(
	response => {
		return response
	},
	err => {
		//清除token
		store.state.token = ''
		localStorage.token = ''
		router.replace({ //返回登录界面，注意replace
			path: '/Login',
			query: {
				redirect: router.currentRoute.fullPath //router.currentRoute.fullPath指当前路由
			}
		})
		return Promise.reject(err)
	})
```

###其他：
>router.replace与router.push
	当从登陆界面路由跳转至仓库路由或者token无效从仓库路由调回登陆路由时
	使用的是router.replace而不是router.push
	他们都能导航到不同的url，区别是,router.replace跳转时不会再向history里保存当前URL
	所以使用router.replace跳转后，点击浏览器后退按钮时，不会返回上一个页面，而是上上一个页面
比如 登陆成功后跳转至仓库，如果用router.push，当点击返回时会调回至登陆页面，又要重新登录验证

>正则表达式
	因为返回的数据没有对应项目的链接，只有对应项目的接口地址
	https://api.github.com/repos/new-work-bili/Chat-room/deployments
	使用正则表达式进行匹配更改：
	https://github.com/new-work-bili/vue-TourismProject/
	

```
//使用正则进行匹配
var reg = /(api\.)|(repos\/)|(deployments)$/g;
...
...
this.list.forEach(item => {	//list是接收返回的数据的数组
	item.deployments_url = item.deployments_url.replace(reg, '')
})
```











## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
