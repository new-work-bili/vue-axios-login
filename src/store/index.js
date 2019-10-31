import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
	state:{
		token:localStorage.token
	},
	mutations:{
		change(state,data){
			state.token = data
			localStorage.token = data
		},
		logout(state){
			state.token = '';
			localStorage.removeItem('token')
		}
	}
})