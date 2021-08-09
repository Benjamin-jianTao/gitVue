<template>
	<div @mouseleave="leaveAdress" class="weather_adress" ref="weather_adress" style="animation:;">
		<p class="set_city">设置城市</p>
		<div class="select_box">
			<div class="select_provice">
				<input @click="displayProviceUl" ref="provice_select" type="text" readonly="readonly" class="select_input provice_select" v-model="province">
				<button @click="displayProviceUl" class="provice_button"></button>
				<ul ref="provice_box" @click="priviceClick" class="provice_box">
					<li @click="clickProviceLi" @mouseenter="liMouseEnter" @mouseleave="liMouseLeave" v-for="(item, index) in provinces" :key="index"
					 :data-index="index">{{item}}</li>
				</ul>
			</div>
			<div class="select_city">
				<input @click="displayCityUl" ref="city_select" type="text" readonly="readonly" class="select_input city_select" v-model="city">
				<button @click="displayCityUl" class="city_button"></button>
				<ul class="city_box" ref="city_box">
					<li @click="clickCityLi" @mouseenter="liMouseEnter" @mouseleave="liMouseLeave" v-for="(item, index) in cityArray" :key="index">{{item}}</li>
				</ul>
			</div>
		</div>
		<div class="searchBtn">
			<button @click="queryAdress(city)" type="button" name="weatherSumbit">确定</button>
			<button @click="goWeatherInfo" type="button" name="weatherSumbit">取消</button>
		</div>
	</div>
</template>

<script>
	import VueEvent from '../event';
	export default {

		data: function() {
			return {
				adm1: null,
				adm2: null,
				adId: null,
				province: "请选择省份",
				city: "请选择城市",
				isProvice: false,
				isCity: false,
				index: 0,
				cityArray: null,
				provinces: ['请选择省份', '北京市', '上海市', '天津市', '重庆市', '河北省', '山西省', '内蒙古省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省',
					'福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西省', '海南省', '四川省', '贵州省', '云南省', '西藏省', '陕西省', '甘肃省', '宁夏省',
					'青海省', '新疆省', '香港', '澳门', '台湾'
				],
				citys: [
					['请选择城市'],
					["东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区",
						"平谷区", "密云县", "延庆县"
					],
					["黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "虹口区", "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "南汇区",
						"奉贤区", "崇明县"
					],
					["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "津南区", "北辰区", "武清区", "宝坻区", "宁河县",
						"静海县", "蓟县"
					],
					["万州区", "涪陵区", "渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "万盛区", "双桥区", "渝北区", "巴南区", "黔江区", "长寿区",
						"綦江县", "潼南县", "铜梁县", "大足县", "荣昌县", "璧山县", "梁平县", "城口县", "丰都县", "垫江县", "武隆县", "忠县", "开县", "云阳县", "奉节县", "巫山县",
						"巫溪县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县", "江津市", "合川市", "永川市", "南川市"
					],
					["石家庄市", "张家口市", "承德市", "秦皇岛市", "唐山市", "廊坊市", "保定市", "衡水市", "沧州市", "邢台市", "邯郸市"],
					["太原市", "朔州市", "大同市", "阳泉市", "长治市", "晋城市", "忻州市", "晋中市", "临汾市", "吕梁市", "运城市"],
					["呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "呼伦贝尔市", "鄂尔多斯市", "乌兰察布市", "巴彦淖尔市", "兴安盟", "锡林郭勒盟", "阿拉善盟"],
					["沈阳市", "朝阳市", "阜新市", "铁岭市", "抚顺市", "本溪市", "辽阳市", "鞍山市", "丹东市", "大连市", "营口市", "盘锦市", "锦州市", "葫芦岛市"],
					["长春市", "白城市", "松原市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "延边州"],
					["哈尔滨市", "齐齐哈尔市", "七台河市", "黑河市", "大庆市", "鹤岗市", "伊春市", "佳木斯市", "双鸭山市", "鸡西市", "牡丹江市", "绥化市", "大兴安岭地区"],
					["南京市", "徐州市", "连云港市", "宿迁市", "淮安市", "盐城市", "扬州市", "泰州市", "南通市", "镇江市", "常州市", "无锡市", "苏州市"],
					["杭州市", "湖州市", "嘉兴市", "舟山市", "宁波市", "绍兴市", "衢州市", "金华市", "台州市", "温州市", "丽水市"],
					["合肥市", "宿州市", "淮北市", "亳州市", "阜阳市", "蚌埠市", "淮南市", "滁州市", "马鞍山市", "芜湖市", "铜陵市", "安庆市", "黄山市", "六安市", "巢湖市", "池州市",
						"宣城市"
					],
					["福州市", "南平市", "莆田市", "三明市", "泉州市", "厦门市", "漳州市", "龙岩市", "宁德市"],
					["南昌市", "九江市", "景德镇市", "鹰潭市", "新余市", "萍乡市", "赣州市", "上饶市", "抚州市", "宜春市", "吉安市"],
					["济南市", "青岛市", "聊城市", "德州市", "东营市", "淄博市", "潍坊市", "烟台市", "威海市", "日照市", "临沂市", "枣庄市", "济宁市", "泰安市", "莱芜市", "滨州市",
						"菏泽市"
					],
					["郑州市", "开封市", "三门峡市", "洛阳市", "焦作市", "新乡市", "鹤壁市", "安阳市", "濮阳市", "商丘市", "许昌市", "漯河市", "平顶山市", "南阳市", "信阳市",
						"周口市", "驻马店市", "济源市"
					],
					["武汉市", "十堰市", "襄樊市", "荆门市", "孝感市", "黄冈市", "鄂州市", "黄石市", "咸宁市", "荆州市", "宜昌市", "随州市", "省直辖县级行政单位", "恩施州"],
					["长沙市", "张家界市", "常德市", "益阳市", "岳阳市", "株洲市", "湘潭市", "衡阳市", "郴州市", "永州市", "邵阳市", "怀化市", "娄底市", "湘西州"],
					["广州市", "深圳市", "清远市", "韶关市", "河源市", "梅州市", "潮州市", "汕头市", "揭阳市", "汕尾市", "惠州市", "东莞市", "珠海市", "中山市", "江门市", "佛山市",
						"肇庆市", "云浮市", "阳江市", "茂名市", "湛江市"
					],
					["南宁市", "桂林市", "柳州市", "梧州市", "贵港市", "玉林市", "钦州市", "北海市", "防城港市", "崇左市", "百色市", "河池市", "来宾市", "贺州市"],
					["海口市", "三亚市", "省直辖县级行政单位"],
					["成都市", "广元市", "绵阳市", "德阳市", "南充市", "广安市", "遂宁市", "内江市", "乐山市", "自贡市", "泸州市", "宜宾市", "攀枝花市", "巴中市", "达州市", "资阳市",
						"眉山市", "雅安市", "阿坝州", "甘孜州", "凉山州"
					],
					["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节地区", "铜仁地区", "黔东南州", "黔南州", "黔西南州"],
					["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "思茅市", "临沧市", "德宏州", "怒江州", "迪庆州", "大理州", "楚雄州", "红河州", "文山州",
						"西双版纳州"
					],
					["拉萨市", "那曲地区", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "阿里地区"],
					["西安市", "延安市", "铜川市", "渭南市", "咸阳市", "宝鸡市", "汉中市", "榆林市", "安康市", "商洛市"],
					["兰州市", "嘉峪关市", "白银市", "天水市", "武威市", "酒泉市", "张掖市", "庆阳市", "平凉市", "定西市", "陇南市", "临夏州", "甘南州"],
					["西宁市", "海东地区", "海北州", "海南州", "黄南州", "果洛州", "玉树州", "海西州"],
					["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"],
					["乌鲁木齐市", "克拉玛依市", "自治区直辖县级行政单位", "喀什地区", "阿克苏地区", "和田地区", "吐鲁番地区", "哈密地区", "克孜勒苏柯州", "博尔塔拉州", "昌吉州", "巴音郭楞州",
						"伊犁州", "塔城地区", "阿勒泰地区"
					],
					["香港"],
					["澳门"],
					["台北市", "高雄市", "台中市", "花莲市", "基隆市", "嘉义市", "金门市", "连江市", "苗栗市", "南投市", "澎湖市", "屏东市", "台东市", "台南市", "桃园市", "新竹市",
						"宜兰市", "云林市", "彰化市"
					]
				],
			}
		},
		methods: {
			/*
			 * 取消按钮触发，返会 weatherInfo 组件，显示 本组件根据 搜狐cdn查询到的 地区 id
			 * （此ID不能查询天气）,显示获得天气信息
			 */
			goWeatherInfo: function () {
				this.$emit("displayWeatherCanser");
			},
			/* 
			 *鼠标移开 显示要闻组件 
			 */
			leaveAdress: function () {
				
			},
			/*
			 *点击设置城市后，动态设置组件的 animation 属性，并动画 完成之后 删除该属性，因为
			 * 鼠标移动到右上角的时候，没有动画
			 */
			changeAnimals:function (){
			  this.$refs.weather_adress.style.animation='inversetimeAdress .5s linear';
			  setTimeout(()=>{
				  this.$refs.weather_adress.style.animation='';
			  },600)
			},
			/*
			 *点击 input / 按钮 显示隐藏 城市下拉选择框
			 */
			displayCityUl: function() {
				this.isCity = !this.isCity;
				if (this.isCity) {
					this.$refs.city_box.style.display = 'block';
				} else {
					this.$refs.city_box.style.display = 'none';
				}
			},
			/*
			 *点击 input / 按钮 显示隐藏 省会下拉选择框
			 */
			displayProviceUl: function() {
				this.isProvice = !this.isProvice;
				if (this.isProvice) {
					this.$refs.provice_box.style.display = 'block';
				} else {
					this.$refs.provice_box.style.display = 'none';
				}

			},
			/*
			 *点击 城市下拉 列表项，赋值给 城市input ，隐藏城市下拉列表项
			 */
			clickCityLi: function (e) {
				this.city=e.target.innerHTML;
				this.isCity = false;
				this.$refs.city_box.style.display = 'none';
			},
			/*
			 *点击 省会下拉 列表项，赋值给 省会input ，隐藏城市下拉列表项
			 * 清空 city input,显示对应省会的城市下拉选择框
			 */
			clickProviceLi: function(e) {
				this.province = e.target.innerHTML;
				this.$refs.provice_box.style.display = 'none';//选中值后 隐藏 select
				this.isProvice = false;//选中值后 隐藏 select
				this.city = '';
				this.isCity = true;
				this.$refs.city_box.style.display = 'block';
				let index = e.target.getAttribute('data-index');
				this.cityArray = this.citys[index];
				
			},
			/*
			 *鼠标移开 城市/省会 li  列表，清除背景样式
			 */
			liMouseLeave: function(e) {
				e.target.setAttribute("class", '')

			},
			/*
			 *鼠标移开 城市/省会 li  列表，添加背景样式
			 */
			liMouseEnter: function(e) {
				e.target.setAttribute("class", 'active')
			},
			/*
			 *点击确定按钮 搜索 city input 对应城市ID，后调用父组件方法（根据对应城市ID 
			 * 搜索 天气）
			 */
			queryAdress: function(addres) {
				//
				this.initAdress(addres).then((adress) => {								
					this.$emit("formAdressChange", adress);			
					console.log(this.province, this.city)
				});
			},
			init: async function() {
				// 获取 地区 id
				console.log(this.adId + "初始化地址id")
				let autoId = returnCitySN['cid'];
				// 初始化表单 信息
				this.province = this.provinces[0];
				this.city = this.citys[0][0];
				// 获取城市 信息
				this.initAdress(autoId).then((adress) => {
					//发送到 主件
					this.$emit("sendAdress", adress);
				});
			},
			initAdress: async function(addres) {
				//获取 城市信息
				console.log("获取城市信息..." + addres);
				const initAdress = {};
				const id = await this.$axios.get('https://geoapi.qweather.com/v2/city/lookup?location=' + addres +
					'&key=4f2ed2ec12ed441f8f8fadbc8205acc3').then((response) => {
					this.adm1 = response.data.location[0].adm1;
					this.adm2 = response.data.location[0].adm2;
					this.adId = response.data.location[0].id;
					console.log(response);

					initAdress.adm2 = this.adm2;
					initAdress.id = this.adId;
				});
				return initAdress; 
			},
			
		},
		created: function() {
			this.init();
		},
	}
</script>

<style lang="scss">
	@import '../assets/global';

	.weather_adress {
		width: 440px;
		position: relative;
		background-color: #f5f8fc;
		padding: 15px 0 26px;
		border: 1px solid #cae0f3;
		 @keyframes inversetimeAdress {
			0% {
			    transform: rotateY(-90deg);
				
			}
			25% {
				 transform: rotateY(-67.5deg);
				 
			}
			50% {
				 transform: rotateY(-45deg);
				 
			}
			75% {
				 transform: rotateY(-22.5deg);
				
			}
			100%{
				 transform: rotateY(0deg);
				 
			}
		}
			
			
		&::after {
			content: '';
			width: 0px;
			height: 0px;
			border-style: solid;
			border-width: 12px;
			border-color: transparent transparent #cae0f3 transparent;
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

		.set_city {
			font-size: 20px;
			font-weight: 800;
			padding-bottom: 10px;
			margin-left: 20px;
		}

		.select_box {
			display: flex;
			margin-left: 20px;
			font-size: 14px;
			padding: 15px 0 26px;

			li {
				cursor: pointer;

			}

			.active {
				background: #f1f1f1;
			}

			.select_input {
				outline: none;
				height: 25px;
				position: relative;
				border: none;
				box-shadow: 1px 1px 2px rgba(37, 37, 45, .5) inset;
				cursor: pointer;
			}

			.select_provice {
				width: 100px;
				height: 24px;
				position: relative;
				margin-right: 10px;
               
				.provice_button {
					width: 27px;
					height: 25px;
					background: linear-gradient(#fbfbfb, #ededed);
					outline: none;
					position: absolute;
					left: 73px;
					top: 1px;
					border: none;
					cursor: pointer;

					&::after {
						position: relative;
						content: '';
						width: 0px;
						height: 0px;
						border-style: solid;
						border-width: 4px;
						border-color: #000000 transparent transparent transparent;
						left: 0;
						top: 10px;
					}
				}

				.provice_select {
					width: calc(100px - 2px - 2px);
					cursor: pointer;
				}

				.provice_box {
					position: absolute;
					left: 0;
					top: 26px;
					background: #fff;
					width: calc(100px - 1px - 1px);
					height: 130px;
					overflow-y: scroll;
					border: 1px solid #c6c6c6;
					display: none;

				}
			}

			.select_city {
				position: relative;
				width: 166px;
				.city_button {
					width: 27px;
					height: 25px;
					background: linear-gradient(#fbfbfb, #ededed);
					outline: none;
					position: absolute;
					left: 134px;
					top: 1px;
					border: none;
					cursor: pointer;

					&::after {
						position: relative;
						content: '';
						width: 0px;
						height: 0px;
						border-style: solid;
						border-width: 4px;
						border-color: #000000 transparent transparent transparent;
						left: 0;
						top: 10px;
					}
				}

				.city_box {
					width: 162px;
					max-height: 100px;
					overflow: auto;
					border: 1px solid #c6c6c6;
					background: #fff;
					position: absolute;
					left: 0;
					top: 27px;
					display: none;
				}
			}
		}

		.searchBtn {
			@include middle;
			padding: 5px 0;

			button {
				padding: 6px 23px;
				margin: 0 10px;
				background-color: #1479d7;
				border-radius: 15px;
				color: #fff;
				outline: none;
				border: none;
				cursor: pointer;

			}
		}
	}
		
	
</style>
