<template>
	<div class="content">
		<qqTop></qqTop>
		<div class="banner">
			<img src="../assets/img/920x75_www.png" />
			<slide></slide>
		</div>
	</div>
</template>

<script>
	import qqTop from "./qqTop.vue";
	import slide from "./slider.vue";
	export default {
		components: {
			qqTop,
			slide,
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
	}
</style>
