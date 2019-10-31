<template>
	<wrapper class="wrapper">
		<div class="login">
			<span>输入您的github令牌token:</span>
			<input type="text" v-model="token" @keyup.enter="login">
			<div class="button" @click="login">登录</div>
			<a href="https://github.com/settings/tokens/new" target="_blank" class="createToken">不知道自己的token?点击生成token</a>
		</div>
	</wrapper>
</template>

<script>
	import wrapper from '@/components/wrapper'
	export default {
		data() {
			return {
				token: ''
			}
		},
		components: {
			wrapper
		},
		methods: {
			login() {
				localStorage.token = this.token
				this.$store.commit('change', this.token)
				this.$router.replace('./storehouse').catch(err => {
					alert('请输入token')
				})
			}
		},
		watch: {}
	}
</script>

<style scoped="scoped">
	.button {
		width: 90px;
		height: 45px;
		background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
		font-size: 18px;
		font-weight: 600;
		color: #FFFFFF;
		text-align: center;
		line-height: 45px;
		margin: 5px auto;
		border-radius: 6px;
		cursor: pointer;
	}

	.login {
		font-size: 18px;
		font-weight: 600;
	}

	.createToken {
		color: #24292E;
		font-size: 11px;
		position: relative;
		top: -58px;
		left: 143px;
	}

	>>>.content {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
