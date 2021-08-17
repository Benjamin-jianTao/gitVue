<template>
	<div class="eyecatcher ">
		<div class="hd eyecatcher_title">
			<h2 class="mod_title mod_title_active">视觉焦点</h2>
		</div>
		<div class="eyecatcher_main">
			<ul class="eyecatcher_box" :style="{left:ulLeft ,width:width}">
				<li><a class="in-bl">
				<div class="listBox" v-for="(item,index) in eyecatcherList.listOne" :key="index">
					<img :src="item.img">
					<span>{{item.text}}</span>
				</div>
				
			
				</a></li>
				<li><a class="in-bl">
				<div class="listBox" v-for="(item,index) in eyecatcherList.listTwo" :key="index">
					<img :src="item.img">
					<span>{{item.text}}</span>
				</div>
				
				</a></li>
			</ul>
			
		</div>
		<div
		v-show="leftShow"
		@click="changeList" 
		@mouseenter = "lfActiveButton" 
		@mouseleave ="lfButton" 
		:class="{
		button_left_init:initlfButton,
		button_left_active: activelfButton,
		iconSrc:true,
		init_button : true
		}"></div>
		<div 
		v-show="rightShow"
		@click="changeList" 
		@mouseenter = "riActiveButton" 
		@mouseleave ="riButton" 
		:class="{
		button_right_init:initRiButton,
		button_right_active: activeRiButton,
		iconSrc:true,
		init_button : true
		}"></div>
	</div>
</template>

<script>
	export default {
		data: function () {
			return {
				width:null,
				ulLeft: "0px",
				rightShow: true,
				leftShow: false,
				initRiButton: true,// 右按钮 按钮初始化状态
				initlfButton: true,// 左按钮 按钮初始化状态
				activeRiButton: false,// 右按钮 按钮活动状态
				activelfButton: false,// 左按钮 按钮活动状态
				clickButton: false,// 按钮是否点击了
				eyecatcherList: {
					listOne: null,
					listTwo: null,
				},
			}
		},
		methods: {
			lfButton: function () {
			   this.activelfButton = !this.activelfButton;
			},
			lfActiveButton: function (e) {
				this.activelfButton = !this.activelfButton;
			},
			riButton: function () {
				this.activeRiButton = !this.activeRiButton;
			},
			riActiveButton: function () {
				this.activeRiButton = !this.activeRiButton;
			},
			changeList: function () {
				
				var global;
				var vh;
				this.clickButton == false? global = -1400 : global = 0 ;
				this.clickButton == false?  vh = -280 : vh = 280;
				this.clickButton = !this.clickButton;
			    this.leftShow = !this.leftShow;
				this.rightShow = !this.rightShow;
				
				let animal = setInterval(() => {
					this.ulLeft = parseFloat(this.ulLeft) + vh+ 'px';
						if(parseFloat(this.ulLeft) == global){
							this.ulLeft = global + "px";
							clearInterval(animal);		
						}
					
				},50)
				
			}
		},
		created: function () {
			this.$axios({
				method: "get",
				url: '/eyecatcher',
			}).then((data) => {
			
				 this.eyecatcherList.listOne = data.data.data.list_one;
				 this.eyecatcherList.listTwo = data.data.data.list_two;
					 
				 for(let i in this.eyecatcherList.listOne){
				   this.eyecatcherList.listOne[i].img = require("../assets/img/"+ this.eyecatcherList.listOne[i].img+".jpg");
				 }
				   
			   for(let i in this.eyecatcherList.listTwo){
			     this.eyecatcherList.listTwo[i].img = require("../assets/img/"+ this.eyecatcherList.listTwo[i].img+".jpg");
			   }
						
			}).catch((error)=> {
				console.log(error);
			})
		},
	}
</script>

<style lang="scss">
	.eyecatcher {
		position: relative;
		.eyecatcher_main {
			padding-top: 30px;
			overflow: hidden;
			position: relative;
			height: 175px;
		.eyecatcher_box {
			position: absolute;
			left: 0;
			top: 30px;
			float: left;
			width: 2800px;
			li {
				float: left;
			}
		.listBox {
			width: 214px;
			float: left;
			margin-right: 23px;
			font-size: 0;
			&:last-child {
				margin-right: 0;
			}
				img {
					width: 214px;
					height: 120px;
				}
				span {
					display: inline-block;
					font-size: 14px;
					line-height: 24px;
					height: 48px;
					margin-top: 10px;
					overflow: hidden;
					text-overflow: ellipsis;
					&:hover {
						color: var(--hover-color);
					}
				}
			}
		}
		
		}
		.init_button {
			width: 49px;
			height: 50px;
			position: absolute;
		}
		.button_right_init {
			right: -24px;
			top: 105px;
			 background-position:0 -690px;
			
		}
		.button_right_active {
			 background-position:0 -742px ;
			
		}
		.button_left_init {
			left: -23px;
			top:105px;
			background-position:0 -645px ;
			
		}
		.button_left_active {
			background-position:0 -796px ;
			
		}
	}
</style>
