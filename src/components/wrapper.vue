<template>
	<div class="wrapper row">
		<!-- 实现居中 <768px时，占满  >=768px时占8份，并向右移动2份以实现居中 -->
		<div class="content col-xs-12 col-sm-8 col-sm-offset-2">	
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default{
		name:'wrapper',
	}
</script>

<style>
	.wrapper {
		margin: 0;
		
	}
	.content{
		height: 300px;
		background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 60%, #fff), linear-gradient(70deg, #dbedff 32%, #ebfff0);
		margin-top: 15px;
		padding: 20px;
		text-align: center;
	}
</style>
