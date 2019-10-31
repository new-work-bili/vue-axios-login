<template>
	<div id="app">
		<div class="header">
			<p class="home col-xs-6 col-sm-6 "><span @click="goHome">首页</span></p>
			<p class="logout col-xs-6 col-sm-6 "><span @click="logout">注销</span></p>
		</div>

		<router-view />

	</div>
</template>

<script>
	
	export default {
		
		name: 'App',

		methods: {
			logout() {
				localStorage.token = ''
				this.$store.commit('logout')
				this.$router.push('/').catch(err => {})
			},
			goHome() {
				this.$router.push('/')
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;



	}

	.header {
		color: #fff;
		width: 100%;
		background-color: #24292e;
		box-shadow: 0 0 10px #24292e;
		height: 64px;
		padding: 5px 105px;
		line-height: 55px;
		font-size: 20px;
		font-weight: 600;
	}

	a {
		text-decoration: none;
		color: #fff;
	}
	.home,.logout{
		text-align: center;
	}
	.home>span,.logout>span:hover {
		cursor: pointer;
	}
</style>
