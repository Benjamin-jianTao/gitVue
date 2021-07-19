<template>
	<div class="qq_top">
		<a href="#"><img src="../assets/img/qq_logo_2x.png" alt="腾讯网" /></a>
		<div class="top_serach">
			<div v-on:mouseenter="onSearch" v-on:mouseleave="offSearch" class="serachSelect" :class="{in:inSearch}">
				{{ search }}
				<div v-on:mouseenter="onTab" v-on:mouseleave="offTab" v-show="tab" class="serachTab">
					<ul>
						<li v-for="(item,index) in serchList" :key="index"><a v-on:click="setSearch" href="#" v-on:mouseenter="addActive"
							 v-on:mouseleave="remActive">{{item}}</a></li>
					</ul>
				</div>
			</div>
			<div class="serachInput">
				<input type="text" name="serach_box" />
			</div>
			<div class="serachBtn">
				<button type="submit">酷狗搜索</button>
			</div>
		</div>
		<div class="top_link">
			<a class="iconfont icon">&#xe671;</a>
			<a class="iconfont icon">&#xe5c8;</a>
			<a href="#" class="login">登陆</a>
		</div>
	</div>
	<Nav :navList="navList" :moreListOne="moreListOne" :moreListTwo="moreListTwo"></Nav>
</template>

<script>
	import Nav from './Nav.vue'
	export default {
		components: {
			Nav,
		},
		methods: {
			/*
			 * 鼠标移动到 列表的时候，循环列表，把click 类删除，
			 * 给触发 mouseenter a 标签 添加 下划线
			 */
			addActive: function(e) {
				let tab = document.querySelector(".serachTab");
				let aList = tab.querySelectorAll("a");
				for (let i = 0; i < aList.length; i++) {
					aList[i].classList.remove("click");
				}
				e.target.classList.add("active")
			},
			/*
			 * 鼠标移动出 当前 a 标签，删除下划线 类 active
			 */
			remActive: function(e) {
				e.target.classList.remove("active");
			},
			/*
			 * 鼠标 点击 列表 的搜索类别的时候，
			 * 给改类别添加 下划线 click 类，并设置显示内容为 点击的类别名称
			 */
			setSearch: function(e) {
				this.search = e.target.innerHTML;
				console.log(e.target);
				e.target.classList.add("click");
			},
			/*
			 * 鼠标移动到 类别选择框的时候，设置 类别框（tab) 为true
			 * 给 类别选择框为（inSearch) 为 true
			 */
			onSearch: function() {
				this.inSearch = true;
				this.tab = true;
			},
			/*
			 * 鼠标移出类别选择框的时候，延时 判断 鼠标是否移动到了 类别框之外，
			 * 如果 鼠标移动到了 类别框（ 则 this.intab 为true) 则显示 类别框，否则隐藏类别框；
			 */
			offSearch: function() {
				setTimeout(() => {
					this.inSearch = !this.inSearch;
					if (!this.intab && !this.inSearch) this.tab = false;
				}, 100);
			},
			/*
			 * 鼠标移动到 类别框的时候 tab = true 类别框 显示
			 * 并给 intab 取反值,可以知道鼠标当前在 类别框中，用于offSearch 方法，判断鼠标位置
			 */
			onTab: function(e) {
				this.intab = !this.intab;
				this.tab = true;
			},
			/*
			 * 鼠标移动出 类别框的时候 tab = false 类别框 隐藏
			 * 并给 intab 取反值,可以知道鼠标当前不在 类别框中，用于offSearch 方法，判断鼠标位置
			 */
			offTab: function(e) {
				this.intab = !this.intab;
				this.tab = false;
			}
		},
		data: function() {
			return {
				moreListOne: ["法制", "热剧", "抗肺炎", "历史", "英超", "CBA", "明星", "理财", "科普", "健康", "车型", "家居", "育儿", "情感", "动漫", "公益",
					"天气"
				],
				moreListTwo: ["政务", "综艺", "影展", "国际", "中超", "社区", "电影", "证券", "数码", "美容", "旅游", "生活", "儿童", "文学", "享看", "新国风",
					"全部"
				],
				navList: ["新闻", "视频", "图片", "军事", "体育", "NBA", "娱乐", "财经", "科技", "时尚", "汽车", "房产", "教育", "文化", "星座", "游戏", ],
				serchList: ["网页", "图片", "视频", "音乐", "地图", "问问", "百科", "新闻", "购物"],
				search: "网页",
				tab: false,
				tabHover: "active",
				intab: false,
				inSearch: false,
			};
		},
	};
</script>

<style lang="scss">
	@import "@/assets/global";

	.qq_top {
		width: 100%;
		position: relative;
		height: 80px;
		@include clearfix;

		>a {
			display: block;
			margin-top: 23px;
			float: left;

			img {
				width: 131px;
				height: 37px;
			}
		}
	}

	.top_serach {
		margin: 23px 0 0 318px;
		float: left;

		.serachSelect {
			width: 30px;
			height: 32px;
			padding: 0px 19px;
			font-size: 14px;
			border: 1px solid #dfdfdf;
			line-height: 32px;
			border-top-left-radius: 20px;
			border-bottom-left-radius: 20px;
			border-right: none;
			float: left;
			position: relative;
			background: #f3f6f8;
			cursor: pointer;

			&::after {
				content: "";
				display: block;
				width: 10px;
				height: 6px;
				background: url(../assets/img/so_arr.png) no-repeat;
				background-position: 0 0;
				position: absolute;
				right: 1px;
				top: 45%;
			}

			.serachTab {
				position: absolute;
				z-index: 10;
				left: 0px;
				top: 34px;
				background: #fff;

				li {
					width: 68px;
					text-align: center;

					a {
						cursor: pointer;
						text-decoration: none;
						display: inline-block;
						box-sizing: border-box;
						height: 30px;
						color: #000000;

						&.active {
							border-bottom: 3px solid #FD971F;
						}

						&.click {
							border-bottom: 3px solid #FD971F;
						}
					}
				}
			}
		}

		.in {
			&::after {
				background-position: 0 -30px;
			}
		}

		.serachInput {
			float: left;

			input {
				width: 300px;
				height: 24px;
				padding: 4px 10px;
				border: 1px solid #dfdfdf;
				border-left: none;
				border-right: none;
				outline: none;
				background: #f3f6f8;
			}
		}

		.serachBtn {
			float: left;
			background: #f3f6f8;
			border: 1px solid #dfdfdf;
			border-left: none;
			border-right: none;
			border-top-right-radius: 20px;
			border-bottom-right-radius: 20px;

			button {
				width: 64px;
				height: 32px;
				padding: 0px 23px 0px 23px;
				font-size: 16px;
				color: #fff;
				box-sizing: content-box;
				border: none;
				background: #1479d7;
				border-radius: 20px;
				cursor: pointer;
			}
		}
	}

	.top_link {
		color: #7FBBE9;
		position: absolute;
		right: 0;
		top: 23px;
		font-size: 0px;

		.icon {
			display: inline-block;
			width: 40px;
			height: 40px;
			font-size: 30px;
			cursor: pointer;

			&:hover {
				color: #FFA500;
			}
		}

		.login {
			width: 40px;
			height: 40px;
			display: inline-block;
			font-size: 14px;
			text-align: center;
			background: #F5F5F5;
			border: 1px solid #EDEDED;
			text-decoration: none;
			color: #7FBBE9;
			box-sizing: border-box;
			vertical-align: top;
			line-height: 34px;
		}
	}
</style>
