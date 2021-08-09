<template>
	<div class="weather_info" ref="weather_info" style="animation: test1 .5s linear">
		<section class="adressWeather">
			<h2>{{adm2}} {{now.textDay}} {{now.temp}}℃</h2>
			<span @click="changeWeatherInfo">更换城市</span>
		</section>
		<div class="weatherCategory">
			<div>空气质量:&#12288;{{weatherInfo.now.category}}</div>
			<div>&#12288;&#12288;PM2.5: {{weatherInfo.now.pm2p5}}</div>
		</div>
		<div class="fetureWeather">
			<div class="weather_item" v-for="(item, index) in weatherInfo" :key="index">
				<img  style="width: 40px; height:40px; display: block;" :src="item.icon">
				<p>{{item.type}}</p>
				<span>{{item.tempMin}}℃ ~ {{item.tempMax}}℃</span>
				<span  v-if="item.type!='后天'" class="line"></span> 
				
				
			</div>
		</div>
	</div>
</template>

<script>
	import VueEvent from '../event.js';
	export default {
		props: {
			adm2: String,
		},
		data: function() {
			return {
				weatherKey: '4f2ed2ec12ed441f8f8fadbc8205acc3',
				now: {
					temp: null,
					icon: null,
					text: null,
				},
				weatherInfo: {
					now: {
						type: "今天",
						tempMax: null, // 当天最高温度 默认单位：摄氏度
						tempMin: null, // 当天最低温度 默认单位：摄氏度
						temp: null, // 实时温度
						textDay: null, //实时天气
						text: null, // 实时天气描述
						category: null, // 空气质量
						icon: null,//天气图标
						pm2p5: null
					},
					tomorrow: {
						type: "明天",
						tempMax: null, // 当天最高温度 默认单位：摄氏度
						tempMin: null, // 当天最低温度 默认单位：摄氏度
						textDay: null, //天气
						icon: null,//天气图标
					},
					afterTomorrow: {
						type: "后天",
						tempMax: null, // 当天最高温度 默认单位：摄氏度
						tempMin: null, // 当天最低温度 默认单位：摄氏度
						textDay: null, //天气
						icon: null,//天气图标
					},
				},
			}
		},
		methods: {
			/*
			* 初始化天气信息 根据地区ID 获取当天天气，3天天气信息，空气质量信息
			*/
			init:  function (id) {
				this.queryDaily(id);
				this.queryThreeDays(id);
				this.queryAir(id);
				
			},
			/*
			* 点击更换城市，返回到 weatherAdress 组件
			*/
			changeWeatherInfo: function (){
				
				this.$emit("changeWeatherInfo");
			},
			/*
			*  初始化当天天气，由主件 main.vue 调用，返回给组件 实时温度，天气图标，
			*/
			weatherInit: function (id) {
				this.queryDaily(id).then((now) => {
					 this.$emit("sendNowWeather",now);
				})
			},
			/*
			* 根据 地区ID 查询空气质量，并能返回一个promiese 对象，可用then回调
			*/
			queryAir: function (id) {
				// 获取 空气质量
				 this.$axios.get("https://devapi.qweather.com/v7/air/now?location=" + id + "&key=" + this.weatherKey)
					.then((response) => {
						console.log("获取空气信息");
						console.log(response)
						this.weatherInfo.now.category = response.data.now.category;
						this.weatherInfo.now.pm2p5 = response.data.now.pm2p5;
					    return Promise.resolve(this.weatherInfo.now);
					})
			},
			/*
			* 根据 地区ID 查询 实时天气，并能返回一个promiese now对象，可用then回调
			*/
			queryDaily: async function(id){
				// 获取实时天气 
				const nowWeather = await this.$axios.get('https://devapi.qweather.com/v7/weather/now?location=' + id + '&key=' + this.weatherKey).then((response) => {
					console.log("获取实时天气信息");
					console.log(response)
					
					 this.now.temp =  response.data.now.temp;
					 this.now.text =  response.data.now.text;
					 this.now.icon =  response.data.now.icon;
					 let now = {};
					 now.temp =  this.now.temp ;
					 now.icon =  this.now.icon;
					 now.icon = 'weather/'+now.icon+'.png';
					return Promise.resolve(now);
				});
				return nowWeather
			},
			/*
			* 根据 地区ID 查询 当天。明天，后天天气，赋值给实例 data
			*/
			queryThreeDays: function (id) {
				// 获取 3天气信息
				this.$axios.get('https://devapi.qweather.com/v7/weather/3d?location=' + id + '&key=' + this.weatherKey).then(
					(response) => {
						console.log("获取3天天气信息");
						console.log(response)
						this.weatherInfo.now.tempMax = response.data.daily[0].tempMax;
						this.weatherInfo.now.tempMin = response.data.daily[0].tempMin;
						this.weatherInfo.now.textDay = response.data.daily[0].textDay;
				        this.weatherInfo.now.icon = response.data.daily[0].iconDay;
						// this.weatherInfo.now.icon=require("../../static/weather/"+this.weatherInfo.now.icon+".png");
						this.weatherInfo.now.icon="weather/"+this.weatherInfo.now.icon+".png";
						
						this.weatherInfo.tomorrow.tempMax = response.data.daily[1].tempMax;
						this.weatherInfo.tomorrow.tempMin = response.data.daily[1].tempMin;
						this.weatherInfo.tomorrow.textDay = response.data.daily[1].textDay;
				        this.weatherInfo.tomorrow.icon =response.data.daily[1].iconDay;
						// this.weatherInfo.tomorrow.icon=require("../../static/weather/"+this.weatherInfo.tomorrow.icon+".png")
						this.weatherInfo.tomorrow.icon="weather/"+this.weatherInfo.tomorrow.icon+".png";
						
						this.weatherInfo.afterTomorrow.tempMax = response.data.daily[2].tempMax;
						this.weatherInfo.afterTomorrow.tempMin = response.data.daily[2].tempMin;
						this.weatherInfo.afterTomorrow.textDay = response.data.daily[2].textDay;
						this.weatherInfo.afterTomorrow.icon =response.data.daily[2].iconDay;
						// this.weatherInfo.afterTomorrow.icon=require("../../static/weather/"+this.weatherInfo.afterTomorrow.icon+".png")
						this.weatherInfo.afterTomorrow.icon="weather/"+this.weatherInfo.afterTomorrow.icon+".png";
					
					});
			},
		
		},
		
	}
</script>

<style lang="scss">
	.weather_info {
		width: 440px;
		box-sizing: border-box;
		border:1px solid #cae0f3;
		padding:16px 20px;
		position: relative;
		background-color: #f5f8fc;
        // animation: test1 .5s linear;
        @keyframes test1 {
            0% {
                transform: rotateY(90deg);
        		
        	}
        	25% {
        		 transform: rotateY(67.5deg);
        		 
        	}
        	50% {
        		 transform: rotateY(45deg);
        		 
        	}
        	75% {
        		 transform: rotateY(22.5deg);
        		
        	}
        	100%{
        		 transform: rotateY(0deg);
        		 
        	}
        }
		@keyframes test2 {
		    0% {
		        transform: rotateY(0deg);
				
			}
			25% {
				 transform: rotateY(-22.5deg);
				 
			}
			50% {
				 transform: rotateY(-45deg);
				 
			}
			75% {
				 transform: rotateY(-67.5deg);
				
			}
			100%{
				 transform: rotateY(-90deg);
				 
			}
		}
		&::after {
			content: '';
			width: 0px;
			height: 0px;
			border-style: solid;
			border-width: 12px;
			border-color: transparent transparent  #cae0f3 transparent;
			position: absolute;
			top: -24px;
			left: 378px;
			z-index: 10;
		}
		&::before {
			content: '';
			width: 0px;
			height: 0px;
			border-style: solid;
			border-width: 10px;
			border-color: transparent transparent #f5f8fc transparent;
			position: absolute;
			top: -20px;
			left: 380px;
			z-index: 11;
		}
		.adressWeather {
			display: flex;
			h2 {
			  font-size: 20px;
              font-weight: 800;
			  flex-basis: 320px;
			}
			&>span {
				color: #1479d7;
				position: relative;
				cursor: pointer;
				
			&::after{
				content: '';
				display: block;
				width: 20px;
				height: 20px;
				background: url(../assets/img/wt_city.png) no-repeat;
				background-position: 0 0;
				position: absolute;
				right: -30px;
				top: 10px;
			 }
			}
		}
		.weatherCategory {
			display: flex;
		}
		.fetureWeather {
			display: flex;
			.weather_item {
				flex: 1;
				text-align: center;
				position: relative;
				img {
					margin: 0 auto;
				}
				.line {
					position: absolute;
					right: 0;
					top: 0;
					width: 1px;
					border-right: 1px solid #B6B6B6;
					height: 90px;
					
				}
				/* &::after{
					content: '';
					width: 1px;
					display: block;
					height: 90px;
					border-left: 1px solid #B6B6B6;
					position: absolute;
					right: 0;
					top: 0;
				} */
			}
		}
	}
</style>
