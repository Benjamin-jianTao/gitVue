<template>
	<div class="content">
		<qq-top></qq-top>
		<div class="banner">
			<img src="./assets/img/920x75_www.png" />
			<banner-slider></banner-slider>
		</div>
		<div class="main">
			<div class="left">
				<div class="news_c1 hd">
					<h2 :class="{mod_title_active:isNews,mod_title: true}" @mouseenter="displayNewsNotice">要闻</h2>
					<span></span>
					<h2 :class="{mod_title_active:isAntiviral,mod_title: true}" @mouseenter="displayNewsAntiviral">抗肺炎</h2>
				</div>
				<div @mouseenter="displayWeather" class="news_c2 weaher-info">

					<div class="city">{{adm2}}</div>
					<div class="icon_weather"><img :src="icon"></div>
					<div class="weather">{{temp}}℃</div>
				</div>
			
			
				<div class="news_display">
					<note-news v-show="isNews"></note-news>
					<antiviral v-show="isAntiviral"></antiviral>
				</div>
				<div class="weather_display">
					<weather-adress v-show="isWeatherAdress"
										 ref="weatherAdress" 
										 @sendAdress = "sendAdress"
										 @formAdressChange ="formAdressChange"
										 @displayWeatherCanser ="displayWeatherCanser"
										 @leaveWeatherAdress = "leaveWeatherAdress"
					></weather-adress>
					<weather-info v-show="isWeatherInfo"
									   ref="weatherInfo"
									   @sendNowWeather = "sendNowWeather"
									   :adm2 = "adm2"
									   @changeWeatherInfo = "changeWeatherInfo"
									   @leaveWeatherInfo = "leaveWeatherInfo"
					></weather-info>
				</div>
				
			</div>
			<div class="middle">
			  <topic></topic>
			</div>
			<div class="right">
				<product-list></product-list>
			</div>
			
		</div>
		
		
	</div>
</template>

<script>
	import {watch} from 'vue'
	import qqTop from "./components/QqTop.vue";
	import bannerSlider from "./components/BannerSlider.vue";
	import noteNews from "./components/NoteNews.vue"
	import antiviral from "./components/antiviralNews.vue"
	import weatherAdress from "./components/WeatherAdress.vue"
	import weatherInfo from "./components/WeatherInfo.vue"
	import VueEvent from "./event.js"
	import Topic from "./components/topic.vue"
	import ProductList from "./components/ProductList.vue"
	export default {
		data: function() {
			return {
				temp: null,// 地区天气
				id: null,// 地区ID
				icon: null,// 天气图标
				adm2: null, //根据ip地址 自动获取的 地址
				activeComponent: null, //默认显示要闻组件
				isNews: true,// 是否展示 noteNews组件
				isAntiviral: false,// 是否展示 antiviral组件
				isWeatherAdress: false,// 是否展示 weatherAdress组件
				isWeatherInfo: false,// 是否展示 weatherInfo组件
				
			}
		},
		methods: {
			/*
			 *鼠标移开 weatherInfo 组件
			 */
			leaveWeatherInfo : function () {
				setTimeout(() => {
					this.isWeatherInfo = false;
				},500);
				
			},
			/*
			 *鼠标移开 weatheradress 组件
			 */
			leaveWeatherAdress: function () {
				setTimeout(() => {
					this.isWeatherAdress = false;
				},500);
				
			},
			/*
			 *取消按钮触发 显示weatherInfo组件 
			 */
			displayWeatherCanser: function () {
				this.isAntiviral = false;
				this.isNews = false;
				this.isWeatherAdress = false;
				this.isWeatherInfo = true;
			},
			/*
			 *接收 weatherInfo 查询到的实时天气对象 now, 赋值给本地 data
			 */
			sendNowWeather: function(now) {
                this.temp = now.temp;
				this.icon = now.icon;
			},
			/*
			 *由 formAdressChange 方法，将 adress对象的地区ID，以及对应的地区名称 赋值给本地data 
			 */
			sendAdress: function(adress) {
				//
				this.id = adress.id;
				this.adm2 = adress.adm2;
				
				this.$refs.weatherInfo.init(adress.id);
			},
			/*
			 *接收 weatherAdress 触发的确定按钮，将 adress对象的地区ID 去 weatherInfo 查询天气
			 * 并切换展示 组件
			 */
			formAdressChange: function (adress) {
				//查询天气
				this.$refs.weatherInfo.init(adress.id);
				
				this.sendAdress(adress);
				// 切换组件

				this.isWeatherAdress =false;
				this.isWeatherInfo = true;
			},
			/*
			 *接收 weatherInfo 设置城市按钮触发的方法，动态给 weatherAdress设置 动画属性
			 * 并切换展示组件
			 */
			changeWeatherInfo: function () {
				this.$refs.weatherAdress.changeAnimals();
			
				this.isWeatherAdress =true;
				this.isWeatherInfo = false;
				
			},
			/*
			 *鼠标经过触发 显示 weatherAdrss组件 
			 */
			displayWeather: function() {
				
				// this.isAntiviral = false;
				// this.isNews = false;
				this.isWeatherAdress =true;
				// this.isWeatherInfo = false;
				
			},
			/*
			 *鼠标经过触发 显示 isAntiviral组件 
			 */
			displayNewsAntiviral: function() {
				this.isAntiviral = true;
				this.isNews = false;
				this.isWeatherAdress =false;
				this.isWeatherInfo = false;
				
			},
			/*
			 *鼠标经过触发 显示 isNews组件 
			 */
			displayNewsNotice: function() {
				this.isAntiviral = false;
				this.isNews = true;
				this.isWeatherAdress =false;
				this.isWeatherInfo = false;
			},
			
		},
		components: {
			qqTop,
			bannerSlider,
			noteNews,
			antiviral,
			weatherAdress,
			weatherInfo,
			Topic,
			ProductList,
		},
		created: function () {
           
			 	
		},
		mounted: function() {
			this.$refs.weatherAdress.init();			
			
		},
		//vue3 watch 发生改变
		watch: {
			id: function(newValue,oldValue) {
				this.id =newValue;
				this.$refs.weatherInfo.weatherInit(this.id);
			}
		}
		
	};
</script>

<style lang="scss">
	@import '@/assets/global';
    @import '@/assets/reset';
    
	.content {
		width: 1400px;
		background: #fff;
		margin: 0 auto;
		height: 1000px;
		
		@include clearfix;

		.banner {
			padding-bottom: 20px;
            font-size: 0;
			>img {
				width: 920px;
				height: 75px;
			}
		}

		.main {
			position: relative;
			height: 1071px;
        .left {
			width: 440px;
			position: absolute;
			left: 0;
			top: 0;
			.news_c1 {
				display: flex;
				font-size: 20px;
				text-decoration: none;
                line-height: 44px;
			
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
					border-left: 1px solid #cae0f3;
					margin: 10px 0 0 0;
				}
			}

			.news_c2 {
				position: absolute;
				right: 0;
				top:0;
				display: flex;
                cursor: pointer;
                align-items: center;
				height: 44px;
				.icon_weather {
					img {
					width: 25px;
					height: 25px;
					margin: 7px 8px 0;
				    
					}
				}
			}
		}
			.news_display {
				text-overflow: ellipsis; // 文本溢出时 显示省略符号 ..... 来代表被修剪的文本。
				width: 440px;
			}
			.weather_display {
				width: 440px;
				position: absolute;
				left: -3px;
				top: 39px;
			}
		}
        .middle {
			position: absolute;
			max-height: 1071px;
			left: 480px;
			top: 0px;
			width: 440px;
		}
		.right {
			max-height: 1071px;
			width: 440px;
			position: absolute;
			right: 0;
			top: 0;
		}
	
	}
</style>
