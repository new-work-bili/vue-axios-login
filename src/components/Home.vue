<template >
	<wrapper>
		<div class="text">dsadsadsadsdsad</div>
		<div class="button" @click="login">进入仓库</div>
	</wrapper>
</template>
<script>
	import wrapper from '@/components/wrapper'
	export default {
		data() {
			return {

			}
		},
		components:{
			wrapper
		},
		methods: {
			login() {
				//进入storehouse路由之前会交给router的前置守卫判断，如果没有token，那么转到登录页面，但在之前会报错
				this.$router.push('/storehouse').catch(err => {
					alert('您尚未登录')
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.wrapper {
		margin: 0;
		
	}
	.content{
		/* width: 50%; */
		height: 300px;
		background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 60%, #fff), linear-gradient(70deg, #dbedff 32%, #ebfff0);
		/* margin: 20px auto; */
		text-align: center;
	}
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
</style>
