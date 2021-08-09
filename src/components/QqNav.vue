<template>
	<div class="nav">
		<ul class="nav_list">
			<li v-for="(item,index) in navList" class="nav_item" :key="index"><a href="#">{{item}}</a></li>
		</ul>
		<div class="more" @mouseenter="inMore" @mouseleave="outMore">更多
			<ul v-show="mList" @mouseenter="inMoreList" @mouseleave="outMoreList">
				<div>
					<li v-for="(item,index) in moreListOne" :key="index"><a href="#">{{item}}</a></li>
				</div>
				<div>
					<li v-for="(item,index) in moreListTwo" :key="index"><a href="#">{{item}}</a></li>
				</div>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			navList: Array,
			moreListOne: Array,
			moreListTwo: Array,
		},
		data: function() {
			return {
				inmore: false,
				inmList: false,
				mList: false,
			}
		},
		methods: {
			inMore: function() {
				this.inmore = true;
				this.mList = true;
			},
			outMore: function() {
				this.inmore = false;
				setTimeout(() => {
					if (!this.inmList && !this.inmore) this.mList = false;
				}, 150)
			},
			inMoreList: function() {
				this.inmList = true;
			},
			outMoreList: function() {
				this.inmList = false;
				this.mList = false;
			}
		}
	}
</script>

<style lang="scss">
	@import "@/assets/global";

	.nav {
		display: flex;
		width: 1400px;
		background: #1376D1;
		margin-bottom: 30px;

		.nav_list {
			flex-basis: 1300px;
			padding-left: 20px;
			display: flex;
			background: #1376D1;

			.nav_item {
				background: #1376D1;
				flex: 1;
				@include middle;

				a {
					padding: 4px 5px;
					color: #fff;
					font-size: 18px;

					&:hover {
						background: rgba(255, 255, 255, .5);
					}
				}
			}
		}

		.more {
			width: 80px;
			height: 51px;
			background: #1376D1;
			line-height: 51px;
			color: #fff;
			position: relative;
			cursor: pointer;

			&::after {
				content: "";
				background: url(../assets/img/nav_arr.png) no-repeat;
				background-position: 0 0;
				position: absolute;
				left: 40px;
				top: 45%;
				width: 10px;
				height: 6px;
			}
            &:hover {
				&::after{
					background-position: 0 -30px;
				}
			}
			ul {
				display: flex;
				flex-direction: column;
				position: absolute;
				z-index: 9;
				left: -1320px;
				box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
				width: 1381px;
				padding: 13px 0 13px 19px;
				background: #fff;

				div {
					display: flex;

					li {
						flex: 1;
						line-height: 31px;

						a {
							font-size: 18px;

							&:hover {
								color: #1376D1;
							}
						}
					}
				}
			}
		}
	}
</style>
