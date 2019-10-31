import axios from 'axios'
import store from '@/store/index'
import router from '@/router'

//进行默认设置;**注意不要写错:defaults的s
axios.defaults.timeout = 5000; //发送请求后 5秒内没有收到回应就报错
axios.defaults.baseURL = 'https://api.github.com'; //根地址


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

//向外暴露，自己配置好的axios
export default axios
