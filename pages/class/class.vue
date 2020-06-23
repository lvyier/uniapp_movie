<template>
	<view class="container">
		<scroll-view class="scroll" scroll-y="true"  @scrolltolower="scrolltolower">
			<view class="wrap" v-for="(item,index) in news" :key="index">
					  <view class="left">
						  <image mode="aspectFill" :src="item.images.small"/>
					  </view>
					  <view class="right">
						  <view class="title">{{item.title}}<text class="scro">5.8</text></view>
						  <view>{{item.title}}</view>
						  <view>评分: {{item.rating.average}}</view>
						  <view>时间: {{item.year}}</view>
					  </view>
			</view>
		</scroll-view>
		<view v-if="isShow" class="hidd" style="text-align: center;font-size: 20upx;background-color: #C8C7CC;">
			没有更多的数据了
		</view>
	</view>
	
</template>

<script>
	import	{getComingSoon, newMovies, _godetail} from '../../apis/index.js'
	export default {
		data() {
			return {
				MovieLists:['正在上映的电影-北京','即将上映的电影','豆瓣电影新片榜'],
				start: 0,
				typeNum: -1,
				news:[],
				isShow: false
			};
		},
		methods:{
			scrolltolower(){
				uni.showLoading({
					title:'加载中',
					mask: true
				})
				this.start+=10
				this.getClassData(this.typeNum)({
					apikey:"0df993c66c0c636e29ecbb5344252a4a",
					start: this.start,
					count: 10,
					city: this.$store.state.city
				}).then(res=>{
					let [error,data]=res;
					let subjects=data.data.subjects
					if(subjects.length!==0){
						console.log('isok')
						this.isShow=true
					}
					Array.prototype.push.bind(this.news, data.data.subjects);
					uni.hideLoading({
						mask: true
					})
					console.log(this.news)
				})
			},
			//获取新闻数据
			getClassData(state){
				let lists=[getComingSoon, newMovies, _godetail]
				return lists[state]
			}
		},
		onLoad(options){
			console.log(options)
			this.typeNum=this.MovieLists.indexOf(options.title)
			this.getClassData(this.typeNum)({
				apikey:"0df993c66c0c636e29ecbb5344252a4a",
				start: 0 ,
				count: 10,
				city: this.$store.state.city
			}).then(res=>{
				let [error,data]=res;
				this.news=data.data.subjects;
			})
		},
		onReady() {
			
		}
	}
</script>

<style lang="scss">
.container{
	overflow:hidden;
	.scroll{
		height: 667*2upx;
	}
	.wrap{
		display: flex;
		border-bottom: 1px solid #C8C7CC;
		padding:20upx 30upx;
		.left{
			width: 168upx;
			height:208upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.right{
			flex: 1;
			margin-left:20upx;
			.title{
				font-size:40upx;
				color:black;
			}
			view{
				font-size:30upx;
				color:#C0C0C0;
			}
			.scro{
				background:rgba(247, 76, 49,1);
				padding:2upx 6px;
				border-radius: 6px;
				color:#fff;
				float:right;
				font-size:25upx;
			}
		}
	}
}
</style>
