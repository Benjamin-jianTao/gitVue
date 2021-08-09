<template>
	<div>
		<ul>
			<template v-for="(item, index) in antiviralNews" :key="index">
				<h2><a href="#" v-if="item.type == 'title'" class="big_title">{{item.info}}</a></h2>
				<li><a href="#" v-if="item.type == 'news'"  class="bd text">{{item.info}}</a></li>
				<li><a href="#" v-if="item.type == 'newsPic'" class="pub_pic_text" >
				<img :src="item.src">
				<p class="bd">{{item.info}}</p>
				</a></li>
			</template>
		</ul>
	</div>
</template>

<script>
	export default {
		data: function () {
			return {
				antiviralNews: null
			}
		},
		methods: {
			displayAntiviraNewsList: function () {
				this.$axios({
					method: 'get',
					url: 'news/antiviral'
				}).then((res) =>{
					this.antiviralNews = res.data.data.antiviralList;
					this.antiviralNews.forEach((item,index) =>{
						if(item.type == "newsPic"){
							item.src = require("../assets/img/"+item.src+".jpg")
						}
					});
				});
			}
		},
		mounted: function () {
			this.displayAntiviraNewsList();
		}
	}
</script>

<style scoped lang="scss">
	.pub_pic_text {
		padding:20px 0 22px;
	}
</style>
