<template>
	<div class="container_top">
		<div @mouseenter="mouseInProduct" @mouseleave="mouseOutProduct" class="listContainer_in" ref="listContainerIn">
			<div class="stretch_list" style="left:0px;" @mouseenter="mouseInStretcht" @mouseleave="mouseOutStretch"  ref="stretchList">
				<ul  class="list_1">
					<li><a href="#">企鹅FM</a></li>
					<li><a href="#">微云</a></li>
					<li><a href="#">QQ影像</a></li>
					<li><a href="#">QQ影音</a></li>
					<li><a href="#">QQ拼音</a></li>
					<li><a href="#">享看</a></li>
				</ul>
				<ul  class="list_2">
					<li><a href="#">网游加速器</a></li>
					<li><a href="#">手机QQ</a></li>
					<li><a href="#">手机空间</a></li>
					<li><a href="#">全民K歌</a></li>
					<li><a href="#">QQ音乐</a></li>
					<li><a href="#">QQ阅读</a></li>
				</ul>
				<ul  class="list_1">
					<li><a href="#">天龙手游</a></li>
					<li><a href="#">CF手游</a></li>
					<li><a href="#">魂斗罗</a></li>
					<li><a href="#">FIFA</a></li>
					<li><a href="#">龙之谷</a></li>
					<li><a href="#">英雄</a></li>
					<li><a href="#">QQ飞车</a></li>
					
				</ul>
				<ul  class="list_2">
					<li><a href="#">海豚智音</a></li>
					<li><a href="#">用户社区</a></li>
					<li><a href="#">天气</a></li>
					<li><a href="#">时光化轴</a></li>
					<li><a href="#">彩贝</a></li>
					<li><a href="#">QQ彩票</a></li>
					<li><a href="#">星钻</a></li>
				</ul>
				
			</div>
			
			<div @mouseenter="mousemMoveFixedList"  @mouseleave="mouseOutFixedList" class="fixed_list" ref="fixedList">
				<ul class="list_1">
					<li><a href="#">新闻APP</a></li>
					<li><a href="#">体育APP</a></li>
					<li><a href="#">企鹅号</a></li>
					<li><a href="#">快报</a></li>
					<li><a href="#">视频</a></li>
					<li><a href="#">浏览器</a></li>
					<li><a href="#">微视</a></li>
				</ul>
				<ul class="list_2">
					<li><a href="#">微信</a></li>
					<li><a href="#">QQ</a></li>
					<li><a href="#">空间</a></li>
					<li><a href="#">企业微信</a></li>
					<li><a href="#">邮箱</a></li>
					<li><a href="#">腾讯云</a></li>
					<li><a href="#">电脑管家</a></li>
					<li><a href="#">会员</a></li>
				</ul>
				<ul class="list_3">
					<li><a href="#">LOL</a></li>
					<li><a href="#">DNF</a></li>
					<li><a href="#">CF</a></li>
					<li><a href="#">王者</a></li>
					<li><a href="#">单机游戏</a></li>
					<li><a href="#">火影OL</a></li>
					<li><a href="#">天刀</a></li>
					<li><a href="#">爱玩</a></li>
					<li><a href="#">逆战</a></li>
				</ul>
				<ul class="list_4">
					<li><a href="#">软件</a></li>
					<li><a href="#">Q币</a></li>
					<li><a href="#">京东</a></li>
					<li><a href="#">腾讯地图</a></li>
					<li><a href="#">腾讯文档</a></li>
					<li><a href="#">理财通</a></li>
					<li><a href="#" class="product_all">全部</a></li>
				</ul>
				
			</div>
			<div ref="stretchButton" style="left:-18px" @click="stretchClick" @mouseenter="mouseInButton" @mouseleave="mouseOutButton" class="stretch_button" type="button">
				<span class="arrow" ref="product_arrow"></span>
			</div>
		</div>
	  <div class="container_middle">
		  <olympic></olympic>
	  </div>
	</div>
	
</template>

<script>
	import Olympic from './Olympic.vue';
	export default {
		data: function() {
			return {
               isStretch: false,// 左侧产品列表是否显示 ture 显示 false 隐藏
			   inFixed: false,// 检测 鼠标是否在右侧固定产品列表
			   inProduct: false,// 检测 鼠标是否 存在 产品列表范围
			   inbutton: false,
			   inanimal: false,
			}
		},
		components: {
		  Olympic,
		},
		methods: {
			mouseOutButton: function () {
				this.inbutton = false;
			},
			mouseInButton: function () {
				this.inbutton = true;
			},
			mouseOutFixedList: function () {
				this.inFixed = false;
			},
			mousemMoveFixedList: function () {
				this.inFixed = true;
			},
			/*
			* 鼠标不在伸展产品列表中,isStretch取反 ，延时判断鼠标是否还存在product容器的
			* 右侧固定列表中以及 button 按钮中，不在则鼠标移出了整个 product 容器列表，inProduct 取反
			*  mouseout 触发父级 mouseleave，改变样式按钮 
			*/
			mouseOutStretch: function () {
				
				setTimeout(()=> {
					if(!this.inProduct == true && !this.inbutton == true) {
						console.log("鼠标离开左侧列表应为false"+this.isStretch);
						this.noneStyle();
					}
				},200);
				 
				 
			},
			/*
			* 鼠标在伸展产品列表中, mousemove 冒泡触发父级 mouseenter 改变按钮样式
			*/
			mouseInStretcht: function () {
				
				console.log("鼠标进入左侧列表,应为true"+this.isStretch);
			},
			/*
			* 鼠标不在产品列表中
			*/
			mouseOutProduct: function () {
				this.inProduct = false;
				this.isStretch = false;
				console.log("鼠标在不在产品列表中")
				this.$refs.stretchButton.style.background ="#fff";//按钮颜色
				this.$refs.product_arrow.style.backgroundPosition = '0 -845px';
	            this.noneStyle();
			},
			/*
			* 鼠标在产品列表中
			*/
			mouseInProduct: function () {
			
				this.inProduct = true;
				console.log("鼠标在产品列表中")
				this.$refs.stretchButton.style.background ="#0f82ff";//按钮颜色
				this.$refs.product_arrow.style.backgroundPosition = '0 -895px';
			},
			noneStyle: function () {		
				// if(this.isStretch ==true){			
				var suo  = setInterval(() => {	
					this.$refs.stretchList.style.left = parseFloat(this.$refs.stretchList.style.left) + 48 + "px";   
					 this.$refs.stretchButton.style.left = parseFloat(this.$refs.stretchButton.style.left) + 48 + "px";
					if(parseFloat(this.$refs.stretchList.style.left) >= 0){
						this.$refs.stretchList.style.display="none";
						this.$refs.stretchList.style.left = 0 + "px";
						this.$refs.stretchButton.style.left="-18px";
						this.$refs.listContainerIn.style.borderLeft="1px solid #cae0f3";
						this.$refs.stretchButton.style.background ="#fff"
						
						this.$refs.product_arrow.style.backgroundPosition = '0 -845px';
						this.inanimal = false;
						clearInterval(suo);
					}
				},50);
				
				
			  // }
			},
			blockStyle: function () {
				
				var shen  = setInterval(() => {
					
					
					//显示 左侧产品列表
		
					this.$refs.stretchList.style.left = parseFloat(this.$refs.stretchList.style.left) - 48 + "px";
				    this.$refs.stretchButton.style.left = parseFloat(this.$refs.stretchButton.style.left) - 48 + "px";
					this.$refs.stretchList.style.display="block";
					 
					if(parseFloat(this.$refs.stretchList.style.left) == -480){
						
						this.inanimal = false;
						this.$refs.stretchList.style.left = -480+"px";
						this.$refs.stretchButton.style.left="-495px";//按钮的定位
						this.$refs.stretchButton.style.background ="#0f82ff";//按钮颜色
						this.$refs.listContainerIn.style.borderLeft="none";//消除容器 左边框
						
						this.$refs.product_arrow.style.backgroundPosition = '0 -946px';// 按钮箭头指向
						clearInterval(shen);
					}
				},50);
				
			  
			},
			/*
			* 点击箭头按钮 改变各种样式
			*/
			stretchClick: function () {
				 this.isStretch = !this.isStretch;
				 console.log("this.isStretch"+this.isStretch)
				if( this.isStretch == true){
					this.blockStyle();
				}else{
					this.noneStyle();
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	// @import "../assets/global";

	.container_top {
		width: 440px;
        ul {
        	position: relative;
        	padding-left: 10px;
            height: 39px;
        	li {
        		display: inline-block;
        		margin: 8px 16px 0 0;
        	}
        
        	&::after {
        		content: '';
        		width: 20px;
        		height: 20px;
        		background: url(/icons.png) no-repeat;
        		position: absolute;
        		right: 7px;
        		top: 13px;
        	}
        }
        
        a {
        	font-size: 14px;
        	color: #333;
        
        	&:hover {
        		color: var(--hover-color);
        	}
        }
		.listContainer_in {
			border: 1px solid #cae0f3;
            position: relative;
			width: 440px;
			height: 159px;
			margin:3px 0 13px;
			.stretch_list {
				width: 480px;
				position: absolute;
				left: -18px;
				top: -1px;
				z-index: 1;
				border: 1px solid #cae0f3;
				border-right: none;
				background: #fff;
				display: none;
	
				ul {
				  width: 480px;		 
				  border-bottom:1px solid #cae0f3;   
				  text-align: right;
				}
				.list_1 {
					li {
						margin: 8px 20px 0 0;
					}
					
				}
				.list_2 {
					li {
						margin: 8px 20px 0 0;
					}
					
					background-color: #F5F8FC;
					
				}
				
			}
			.fixed_list {
				position: absolute;
				left: 0;
				top: 0;
				z-index: 3;
				ul {
				  width: 430px;	
				  border-bottom:1px solid #cae0f3; 
				 background-color: #fff;
				}
		        .list_1 {
		        	border-bottom:1px solid #cae0f3; 
		        	&::after {
		        		background-position: -18px -299px;
		        	}
		        }
		        
		        .list_2 {
		        	background-color: #F5F8FC;
		            li {
		            	margin: 8px 14px 0 0;
		            }
		        	&::after {
		        		background-position: -18px -349px;
		        	}
		        }
		        
		        .list_3 {
					li {
						margin: 8px 13px 0 0;
					}
		        	&::after {
		        		background-position: -18px -396px;
		        	}
		        }
		        
		        .list_4 {
		        	background-color: #F5F8FC;
		            li {
		            	margin: 8px 17px 0 0;
		            }
		        	&::after {
		        		background-position: -18px -446px;
		        	}
		        }
			}
		.stretch_button {
			position: absolute;
			left: -18px;
			top: -1px;
			width: 16px;
			height: 40px;
			border: 1px solid #cae0f3;
			padding: 0;
			display: block;
			background: #fff;
			span {
				display: inline-block;
				width: 20px;
				height: 20px;
				background: url(/icons.png) no-repeat;
				background-position: 0 -845px;
				position: absolute;
				left: 5px;
				top: 12px;
				
			}
			
		}
			
			
			.product_all {
				padding: 0 10px;
				display: inline-block;
				background: #B5CCEC;
				color: #fff;
				border-radius: 12px;
			}
		}
	}
</style>
