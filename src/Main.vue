<template>
	<div class="content">
		<QqTop></QqTop>
		<div class="banner">
			<img src="./assets/img/920x75_www.png" />
			<BannerSlider></BannerSlider>
		</div>
		<div class="main-news">
			<div class="news_c1">
				<h2><router-link to="/noteNews">要闻</router-link></h2>
				<span></span>
				<h2><router-link to="">抗肺炎</router-link></h2>
			</div>
			<div class="news_c2 weaher-info">
				<div>1</div>
				<div>2</div>
				<div>3</div>
			</div>
		</div>
		<div class="news-display">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import QqTop from "./components/QqTop.vue";
	import BannerSlider from "./components/BannerSlider.vue";

	export default {
		data: function () {
			return {
				noteNewList: ["总书记的一周 (7月12 ——7月18)","生活在实干中“升级”","习近平同蒙古国总统通电话","","",""],
			}
		},
		components: {
			QqTop,
			BannerSlider,

		},
	};
</script>

<style lang="scss">
	@import '@/assets/global';

	.content {
		width: 1400px;
		background: #fff;
		margin: 0 auto;
		height: 1000px;
		@include clearfix;

		.banner {
			padding-bottom: 20px;

			>img {
				width: 920px;
				height: 75px;
			}
		}
		.main-news { 
			width: 440px;
			display: flex;
			.news_c1 {
				display: flex;
				font-size: 20px;
				color: #0B64EA;
				text-decoration: none;
				h2:first-child {
					margin-right: 20px;
					
				}
				h2:last-child {
					margin: 0 20px;
				}
				span { 
					width: 1px;
					height: 20px;
					display: inline-block;
					border-left: 1px solid #000;
					margin:10px 0 0 0;
				}
			}
			.news_c2 {
				float: right;
				display: flex;
			}
		}
	}
</style>
