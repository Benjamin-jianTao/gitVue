<template>
	<div class="topic_daily">
		<div class="topic_title hd ">
			<span class="mod_title">今日话题</span>
		</div>
		<section>
			<h2 class="big_title">{{dailyTopicH2}}</h2>
			<div class="topic_newsType">
				<template v-for="(item, index) in upNewList" :key="index">
					<div class="newsType_item">
						<div class="newsType"><a href="#">{{item.type}}</a></div>
						<span class="short-term"></span>
						<a href="#" class="text">{{item.newsText}}</a>
					</div>
				</template>
			</div>
		</section>
</div>
<div class="threedaily">
	<div class="threedaily_top title_cnt_bck">
		<img src="../assets/img/1627485253440.png">
	</div>

	<div class="threedaily_main">
		<div class="pub_pic_text "><!-- :src="threedaily.picText.src" -->
			<video controls="controls" src=""></video>
			<a href="#">{{threedaily.picText.text}}</a>
			<i class="player_Small iconSrc"></i>
		</div>
		<ul>
			<li><a href="#">{{threedaily.seeponit.pointText1}}</a></li>
			<li><a href="#">{{threedaily.seeponit.pointText2}}</a></li>
			<li class="threedaily_bttom" v-for="(item, index) in threedaily.videoText" :key="index">
			  <a href="#" class="icon iconSrc mod_icom">{{item.videotext}}</a>
			  <span  class="short-term"></span>
			  <p><a href="#" class="text">{{item.text}}</a></p>
			</li>
		</ul>
		
	</div>

</div>
<div class="pngTopic">
	<div class="pngTopic_top title_cnt_bck">
		<h2 class="title" href="#">图话</h2>
	</div>
	<div class="pub_pic_text">
		<video src="" controls="controls"></video>
		<a href="#">{{topic_image.video_html}}</a>
		<i class="player_Small iconSrc"></i>
		<span class="version">{{topic_image.version}}</span>
	</div>
	<ul>
		<li class="pngTopic_item" v-for="(item, index) in topic_image.videoText" :key="index">
			<a href="#" class="icon iconSrc mod_icom">{{item.videotext}}</a>
			<span class="short-term"></span>
			<a href="#" class="text">{{item.text}}</a>
		</li>
	</ul>
</div>
</template>

<script>
	export default {
		data: function() {
			return {
				dailyTopicH2: '',
				upNewList: [{
						type: '',
						newsText: '',
					},
					{
						type: '',
						newsText: '',
					},
					{
						type: '',
						newsText: '',
					},
					{
						type: '',
						newsText: '',
					},
					{
						type: '',
						newsText: '',
					},
					{
						type: '',
						newsText: '',
					},
				],
				threedaily: {
					picText: {
						src: null,
						text:null,
					},
					seeponit: {
						pointText1: null,
						pointText2: null,
					},
					videoText : [
						{
							videotext:null,
							text: null,
						},
						{
							videotext:null,
							text: null,
						},
						{
							videotext:null,
							text: null,
						}
					]
				},
				topic_image: {
					video: "",
					"video_html": "",
					version: "",
					videoText : [{
					  videotext: "",
					  text:""
					},
					{
					  videotext: "",
					  text:""
					},
					{
					  videotext: "",
					  text:""
					},
					{
					  videotext: "",
					  text:""
					},
					{
					  videotext: "",
					  text:""
					},
					]
				}
			}
		},
		created() {
		  this.$axios.get("/topic").then((response) => {
			  let res = response.data.data;
			  this.dailyTopicH2 = res.dailyTopicH2;
			  for(let i=0; i<this.upNewList.length; i++){
				  this.upNewList[i].type = res.newsList[i].newType;
				  this.upNewList[i].newsText = res.newsList[i].newContent;
			  }
			  this.threedaily.picText.text = res.onlyThreeDay.video_html;
			  this.threedaily.picText.src = res.onlyThreeDay.video;
			  this.threedaily.seeponit.pointText1 = res.onlyThreeDay.video_text.seePontText1;
			  this.threedaily.seeponit.pointText2 = res.onlyThreeDay.video_text.seePontText2;
			  for(let i=0; i<this.threedaily.videoText.length; i++){
				 
				 this.threedaily.videoText[i].videotext = res.onlyThreeDay.videoText[i].videotext; 
				 this.threedaily.videoText[i].text = res.onlyThreeDay.videoText[i].text; 
			  }
			 this.topic_image.video = res.topic_image.video;
			  this.topic_image.video_html = res.topic_image.video_html;
			  this.topic_image.version = res.topic_image.version; 
			  
			  for(let i=0; i<this.topic_image.videoText.length; i++){
				    this.topic_image.videoText[i].videotext = res.topic_image.videoText[i].videotext;
					this.topic_image.videoText[i].text =res.topic_image.videoText[i].text;
			  }
			
			  
			  
		  })	
		},
		
	}
</script>

<style lang="scss" scoped>
	@import '../assets/global';
	.topic_daily {
	    section {
	    	.upH2 {
	    		font-size: 18px;
	    		font-weight: bold;
	    		color: #333;
	    		padding: 14px 0 7px;
	    	}
	    
	    	.topic_newsType {
	    		.newsType_item {
	    			display: flex;
	    			position: relative;
	    			line-height: 36px;
	    		  .newsType {
					  flex: 0 0 auto;
	    			  color: #253e6d;
	    			  font-weight: 800;
	    			  font-size: 16px; 
	    		  }
	    		}
	    	}
	    }
	}
.threedaily {
	width: 440px;
	.threedaily_top {
		height: 50px;
		background-position: 0 20px;
	   img {
		   height: 50px;
	   }	
	}
	
	.threedaily_main {
		margin-bottom: 7px;
		.icon {
		background-position: 0 -488px;
		flex: 0 0 auto;
		font-weight: bold;
		}
		.threedaily_bttom {
			display: flex;
			
		}
	}
}
.pngTopic {
	.pngTopic_top {
		background-position: 53px 20px;
	}
	.pub_pic_text {
		.version {
			position: absolute;
			bottom: 10px;
			right: 0;
			color:#64788c;
			font-size: 14px;
		}
	}
	.pngTopic_item {
		display: flex;
		.icon {
			background-position: 0 -540px;
			font-weight: bold;
			flex: 0 0 auto;
		}
		
	}
}	
</style>
