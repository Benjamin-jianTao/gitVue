<template>
	<div class="olumpic">
		<div class="olumpic_top hd" >
			<span class="mod_title">东京奥运会</span>
			<div class="slider_box clearfix">
				<ul class="slider" ref="slider" style="left: 0px">
					<li v-for="(item, index) in newsList" :key="index">
						<span class="date">{{item.data}}</span>
						<span class="short-term"></span>
						<span class="scroll_news text">{{item.new}}</span>
					</li>
					
				</ul>
			</div>
			<a href="#" class="more">更多</a>
		</div>
		<div class="olumpic_middlea">
			<img src="../assets/img/olympic_china_logo.png" alt="中国奖牌数">
			<div class="olumpic_list">
				<div class="olumpic_list_item">
					<p>排名</p>
					<span>2</span>
				</div>
				<div v-for="(item, index) in medal" :key="index" class="olumpic_list_item">
					<p>{{item.type}}</p>
					<span >{{item.number}}</span>
				</div>
				
			</div>
		</div>
		<div class="olumpic_bottom">
			<ul>
				<li class="olumpicPic"><a href="#"><img :src="olumpicSrc"><i  class="iconSrc player_Big" ></i><span class="picdes">正直播《赢战东京》魏秋月做客点评奥运女排</span></a></li>
				<li class="olumpicPicDown_list" v-for="(item,index) in olumpicNews" :key="index"><a href="#">{{item}}</a></li>
			</ul>
			<div class="hitToday ">
				<div class="title_cnt_bck">
					<h2  class="title">今日热播</h2>
				</div>
				<ul>
					<li class="hit_top" >
					<div  class="pic_text_left">		
						<img class="img_radious" :src="hitToday1.src">
						<i class="player_Small iconSrc"></i>
						<span class="picdes">{{hitToday1.text}}</span>
					</div>
					<div  class="pic_text_right" >
						<img class="img_radious" :src="hitToday2.src">
						<i class="player_Small iconSrc"></i>
						<span class="picdes">{{hitToday2.text}}</span>
					</div>	
					</li>
					<li v-for="(item, index) in hitNews" :key="index">
						<span class="text bd">{{item}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function () {
			return { 
				    hitNews: {
					  text1: "高隐蔽性！郑州六院一医生前7次检测结果为阴第8次才显阳",
					  text2:"即使无接触14秒也可感染！德尔塔毒株为何如此危险？",
					  text3: "全红婵家门口人来人往：有网红冒雨直播，当地呼吁理性打卡",
					  text4:"希腊山火失控：千人登上轮渡逃离火场，窗外只剩深红一片",
					  text5: "长沙一封控小区居民集体快闪，齐唱《歌唱祖国》加油鼓劲",
					},
					hitToday1:{
					  src: require("../assets/img/hotDaily1.jpg"),
					  text: '云南迁徙象群快到家啦',
					},
					hitToday2:{
						src: require("../assets/img/hotDaily2.jpg"),
						text: '在太空看奥运是一种什么体验？',
					}
				,
				olumpicNews: {
					text1: "拳击女子75公斤级决赛 中国选手李倩摘银",
					text2:"奥运篮球总结：一个时代的谢幕 中国女篮制造惊喜！",
					text3: "中国队拳击冲最后一金，闭幕式巴黎8分钟令人期待",
				},
				olumpicSrc: require('../assets/img/ninja.jpg'),
				flashDone: true,
				slider: {
					index: 0,// 当前 索引
					newWidth: 275,
					time:1500,// 动画完成时间
					rate: 10,// 动画划分多少个动作完成
				},
				medal: [
					{
						type:'金牌',
						number: 38,
					},
					{
						type:'银牌',
						number: 32,
					},
					{
						type:'铜牌',
						number: 18,
					},
					{
						type:'总数',
						number: 88,
					}
				],
				newsList: [
					{
						data: '08-11',
						new: '08:00 1《赢战东京》美国男篮加冕奥运四连冠',
					},
					{
						data: '08-11',
						new: '14:15 2苏梅内利VS谷红  拳击女子组69公斤级决赛',
					},
					{
						data: '08-11',
						new: '14:00 3男子组10米跳台决赛(杨健、曹缘冲金)VS  跳水男子组10米跳台决赛',
					},
				],
				
			}
		},
		methods: {
			play: function () {
				let play = setInterval(() => {
					if(this.flashDone ) {
						 this.move(this.slider.newWidth);
					}
				  
				},this.slider.time)
			},
			move: function (newWidth) {
			    this.flashDone = false;
				var length = this.newsList.length;
				var speed = newWidth/(this.slider.time/this.slider.rate);//速度 每份动画移动的速度
				var global = parseFloat(this.$refs.slider.style.left) - newWidth;//目标地址
				
				console.log(global);	
				const scrollNew = setInterval(() => {
					if (parseFloat(this.$refs.slider.style.left) == global || Math.abs(Math.abs(parseFloat(this.$refs.slider.style.left)) - Math.abs(global)) < Math.abs(speed)){
						
						 this.$refs.slider.style.left = global + 'px';
						
						 this.flashDone = true;
						 
						
						 //判断第一张
						 // if(parseFloat(this.$refs.slider.style.left) == 0) {
							//  debugger
							//  this.$refs.slider.style.left = this.newsList[length-2]*this.slider.newWidth+ 'px';
						 // }
						 //判断最后一张
						 if (parseFloat(this.$refs.slider.style.left) == -(3*this.slider.newWidth)) {
							  
							 this.$refs.slider.style.left ='0px';
						 }
						  clearInterval(scrollNew);
					}else {
						
						this.$refs.slider.style.left = parseFloat(this.$refs.slider.style.left) -speed+'px';
						// console.log(this.$refs.slider.style.left);
					}
					   
				},this.slider.rate)
			},
			copyList: function () {
				
				let length = this.newsList.length-1;
				let first = this.newsList[0];
				
				// let last = this.newsList[length];
				//增加第一张数据到数组最后
				this.newsList.push(first);
				//增加最后一个数据到数据最前
				// this.newsList.unshift(last);
				
			},
			init: function () {
				//形成 收尾相接结构
				this.copyList();
				//移动函数
				this.play();
			},
		},
		mounted: function () {
			this.init();
		}
	}
</script>

<style lang="scss">
	@import "../assets/global";
	.olumpic {
		.olumpic_top {
			display: flex;
			.mod_title {
				margin-right: 20px;
			}
			.slider_box{
				position: relative;
				overflow: hidden;
				flex-basis: 275px;
				.slider {
					position: absolute;
					top:0px;
					display: flex;
					li {
						display: flex;
						width: 275px;
                        line-height: 44px;
						
					
					}
					span {
                       font-size: 14px;						
					}
					.date {
						flex-basis: 79px;
						
					}
					.short-term {
						width: 0px;
						top:15px;
						height: 16px;
						margin-right: 6px;
						border-left-width: 1px;
						border-color:var(--hover-color);
					}
					.scroll_news {
						
					}
				}
			
			}
			.more {
				flex: 1 0 auto;
				font-size: 14px;
				line-height: 40px;
				color:var(--hover-color);
				position: relative;
				&::after {
					content: '';
					width: 21px;
					height: 20px;
					position: absolute;
					right: 0;
					top: 12px;
					background: url(/icons.png) no-repeat;
					background-position: -30px -997px;
				}
			}
		}
		.olumpic_middlea {
			margin-bottom: 27px;
			@include clearfix
			img {
				float: left;
				height: 70px;
			}
			.olumpic_list {
				display: table-cell;
				width: 6000px;
				.olumpic_list_item {
					width:20%;
					float: left;
					font-size: 16px;
					text-align: center;
					cursor: pointer;
					p {
						color: #788191;
					}
					span {
						font-weight: bold;
						color: #333;
					}
				}
			}
		}
		.olumpic_bottom {
			margin-bottom: 6px;
			.olumpicPic {
				position: relative;
				margin-bottom: 20px;
			}
			.olumpicPicDown_list {
				a{
				font-size: 16px;
				line-height: 36px;
				color: #333;
				&:hover {
					color: var(--hover-color);
				}
			    }
			}
		}
		.hitToday {
			.title_cnt_bck {
				background-position: 93px 20px;
			}
			.hit_top {
				cursor: pointer;
				padding: 15px 0 10px;
				@include clearfix
				
				.player_Small {
					top: 63px;
				}
				.img_radious {
					width: 214px;
					height: 120px;
					border-radius: 4px;
				}
				.picdes {
					font-size: 14px;
				}
				div {
					position: relative;
					margin-bottom: 10px;
					font-size: 0;
				}
				.pic_text_left {
				  	float: left;	
				}
				.pic_text_right {
				  	float: right;	
				}
			}
		
		}
	}
</style>
