<template>
	<div class="slide">
		<ul ref="banner" @mouseenter="bannerMouseEnter" @mouseleave="bannerMouseLeave" :style="{width:ulWidth,left:ulLeft}">
			<li class="banner-item" v-for="item in banList" :key="item.id"><a href="#"><img :src="item.url" alt="轮播图片1"></a></li>
		</ul>
		<div class="indexbox">
			<ol ref="point" @click="clickPonit"></ol>
		</div>
		<div ref="right" class="rightRow" @click="right"></div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				inAnimal: false, //动画 是否在进行中
				animalPlay: null,
				rate: 10, // 图片轮播 分成多少帧
				time: 2500, //轮播一张图片 时长
				index: 1, //轮播 索引
				banWidth: 440, // 轮播图片 宽度
				ulWidth: "", // 轮播容器宽度
				ulLeft: "0px", // 轮播 容器 位移值
				banList: [{
						url: require("../assets/img/lunbo1.png"),
						id: 1,
					},
					{
						url: require("../assets/img/lunbo2.png"),
						id: 2,
					},
					{
						url: require("../assets/img/lunbo3.png"),
						id: 3,
					},
					{
						url: require("../assets/img/lunbo4.png"),
						id: 4,
					},
					{
						url: require("../assets/img/lunbo5.jpg"),
						id: 5,
					}
				],
			}
		},
		created: function() {},
		beforeMount: function() {},
		mounted: function() {
			this.cratePoint(); // 为何
			this.copyPic();
			this.autoPlay();
		},
		methods: {
			bannerMouseLeave: function () {
				this.autoPlay();
			},
			bannerMouseEnter: function () {
				clearInterval(this.animalPlay);
			},
			right: function() {
				if (this.inAnimal) {
					return
				} else {
					this.index++
					this.index > 5 ? this.index = 1 : this.index;
					this.move(this.banWidth);
				}
			},
			autoPlay: function() {
				this.animalPlay = setInterval(() => {
					this.$refs.right.click();
				}, this.time);
			},
			clickPonit: function(e) {
				if(e.target.nodeName == "LI") {
				//防止 用户过度点击
				if (this.inAnimal) {
					return
				} else {
					let beforeIndex = this.index;
					this.index = e.target.getAttribute("data-index");
					e.target.setAttribute("class", "active");
					let offset = (this.index - beforeIndex) * this.banWidth;
					this.move(offset);
				}
			  }
			},
			move: function(offset) {
				let speed = offset / (this.time / this.rate);
				let global = parseFloat(this.$refs.banner.style.left) - offset;
				console.log(global);
				for (let i = 0; i < this.$refs.point.children.length; i++) {
					this.$refs.point.children[i].setAttribute("class", "");
				}
				this.$refs.point.children[this.index - 1].setAttribute("class", "active");
				let bannerIng = setInterval(() => {
					if (parseFloat(this.$refs.banner.style.left) == global || Math.abs(Math.abs(global) - Math.abs(parseFloat(this.$refs
							.banner.style.left))) < Math.abs(speed)) {
						this.$refs.banner.style.left = global + 'px';
						clearInterval(bannerIng);
						this.inAnimal = false;
						//最后一张轮播图
						if (parseFloat(this.$refs.banner.style.left) == (this.$refs.banner.children.length - 1) * -this.banWidth) this
							.$refs.banner.style.left = 0 + 'px';
					} else {
						this.$refs.banner.style.left = parseFloat(this.$refs.banner.style.left) - speed + 'px';
						this.inAnimal = true;
					}
				}, this.rate)
			},
			copyPic: function() {
				// let firstEle = this.$refs.banner.children[this.$refs.banner.children.length -1 ].cloneNode(true);
				let lastEle = this.$refs.banner.children[0].cloneNode(true);

				this.$refs.banner.appendChild(lastEle);
				// this.$refs.banner.insertBefore(firstEle,this.$refs.banner.children[0]);
				this.ulWidth = this.$refs.banner.children.length * this.banWidth + 'px';
			},
			cratePoint: function() {
				let cdf = document.createDocumentFragment();
				for (let i = 0; i < this.banList.length; i++) {
					let el = document.createElement('li');
					i == 0 ? el.setAttribute("class", "active") : el.setAttribute("class", "");
					el.setAttribute("data-index", i + 1);
					cdf.appendChild(el);
				}
				this.$refs.point.appendChild(cdf)
				this.$refs.point.style.width = this.banList.length * 6 * 2 + "px";
			}
		}
	}
</script>

<style lang="scss">
	@import "../assets/global";

	.slide {
		overflow: hidden;
		position: relative;
		float: right;
		width: 440px;
		height: 75px;
		@include clearfix;

		ul {
			height: 75px;
			position: absolute;

			.banner-item {
				float: left;

				img {
					width: 440px;
					height: 75px;
				}
			}
		}

		.indexbox {
			ol {
				position: absolute;
				right: 30px;
				top: 5px;

				li {
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background: #999999;
					float: left;
					margin-left: 3px;
					margin-right: 3px;

					&.active {
						background: #7FBBE9;
					}
				}
			}

		}

		.rightRow {
			display: none;
		}
	}
</style>
