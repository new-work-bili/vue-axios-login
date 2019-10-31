<template>
	<div class="wrapper row">
		<!-- 用户信息 -->
		<div class="owner pull-left col-xs-2 col-sm-2 text-center" v-if="list[0]">
			<!-- 因为不是v-for循环的，不进行判断会报错->因为渲染到这时axios还没返回数据 -->
			<img :src="list[0].owner.avatar_url" alt="头像">
			<p>{{list[0].owner.login}}</p>
			<a :href="list[0].owner.html_url">进入主页</a>
		</div>
		<!-- 仓库信息 -->
		<ul class="col-xs-8 col-sm-8 store">
			<li v-for="item in list" :key="item.id">
				<p class="store_name"><a :href="item.deployments_url">{{item.name}}</a></p>
				<p v-if="item.description"><span class="default">描述:</span>{{item.description}}</p>
				<p v-if="!item.description"><span class="default">描述:</span>无</p>
				<div class="row bottom">
					<p class="col-xs-6 col-sm-4">
						<span class="default">创建于:</span>{{item.created_at}}
						
					</p>
					<p class="col-xs-6 col-sm-4"><span class="default">
							更新于:</span>{{item.updated_at}}
					</p>
					<p class="col-xs-3 col-sm-3">
						<span :class="item.language" class="ball"></span>
						<span class="type_name">{{item.language}}</span>
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				languages: ['Vue', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Ruby', 'C', 'Java', 'Swift', 'Vim script', 'Python'],
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				var reg = /(api\.)|(repos\/)|(deployments)$/g;
				//真实url是http.js里给axios设置的默认url:https://api.github.com 加上该url===>https://api.github.com/user/repos?sort=update
				this.axios.get('/user/repos?sort=update').then(response => {
					console.log(response.data)
					this.list = response.data;
					console.log(this.list[0].owner)
					this.list.forEach(item => {
						//通过正则匹配去掉一些字符，以获得仓库地址---
						item.deployments_url = item.deployments_url.replace(reg, '')
						//https://api.github.com/repos/new-work-bili/vue-TourismProject/deployments——————>https://github.com/new-work-bili/vue-TourismProject/
					})

				}).catch(err => { //token无效会返回401
					if (err.response && err.response.data) { //不&&判断的话,会包 'Cannot read property 'data' of undefined'
						// console.log(err.response)
						alert(err.response.status + ':' + err.response.data.message)

					} else {
						// console.log(err)
						alert('请求超时')
					}

				})
				console.log(this.url)
			},

		},

	}
</script>

<style scoped="scoped">
	.wrapper {
		margin-top: 20px;
	}

	ul,
	li {
		list-style: none;
	}

	a {
		text-decoration: none;
		color: #2C3E50;
	}

	.owner {
		font-weight: 600;
	}

	.owner>a {
		color: #0366d6;
	}

	.owner>img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.store>li {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 16px 8px 8px 8px;
		margin-bottom: 10px;
	}

	li {}

	.store_name>a {
		color: #0366d6;
		font-size: 18px;
		font-weight: 600;
	}

	p {
		margin: 0;
	}

	.default {
		/* font-size: 18px; */
		font-weight: 600;
	}

	.bottom {
		font-size: 12px;
		margin-top: 5px;
		
		text-overflow: ellipsis;
		text-overflow: ellipsis;
	}

	.bottom p {
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.ball {
		border-radius: 50%;
		width: 15px;
		height: 15px;
		display: block;

	}

	.type_name {
		position: relative;
		top: -15px;
		left: 21px;
	}

	.Vue {
		background-color: #2c3e50;
	}

	.JavaScript {
		background-color: #f1e05a;
	}

	.HTML {
		background-color: #e34c26;
	}

	.TypeScript {
		background-color: #2b7489;
	}

	.C {
		background-color: #555555;
	}

	.Java {
		background-color: #b07219;
	}

	.Ruby {
		background-color: #701516;
	}

	.Swift {
		background-color: #ffac45;
	}

	.Python {
		background-color: #3572a5;
	}
	.nowrap{
		text-overflow: ellipsis;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
