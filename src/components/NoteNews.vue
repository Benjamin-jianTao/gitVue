<template>
	<div>
		<ul>
			<template v-for="(item, index) in noteNewsList" :key="index">
			<h2 v-if="item.type == 'title'" ><a href="#" class="big_title">{{item.info}}</a></h2>
			<li v-if="item.type == 'news'"><a href="#"  class="bd">{{item.info}}</a></li>
			<li v-if="item.type =='newsPic'" class="pub_pic_text">
				<img :src="item.src">
				<span>{{item.info}}</span>
			</li>
			</template>
		</ul>
	</div>
</template>

<script>
	export default {	
		data: function () {
			return {
				noteNewsList: null,
			}
		},
		methods: {
			displayNoteNews: function () {
				this.$axios({
					method: "get",
					url: 'news/notice',	
				}).then((response) => {
					this.noteNewsList = response.data.data.noteNews;
					
				this.noteNewsList.forEach((item,index) => {
		
					if(item.type == "newsPic"){
						
						 item.src=require("../assets/img/"+item.src+".jpg");
						// console.log(item.src)
						
					}
				})
					console.log(typeof this.noteNewsList);
				}).catch((error) => {
					console.log(error+"服务器");
				});
			}
		},
		mounted: function () {
			this.displayNoteNews();
		}
	}
</script>

<style scoped lang="scss">
	.pub_pic_text {
		padding:23px 0 22px;
	}

</style>
