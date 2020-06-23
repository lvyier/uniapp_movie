<template>
	<view class="container">
		<view class="bannerList">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="1500">
				<swiper-item v-for="(item,index) in playingList.subjects" :key="index">
					<image mode="widthFix" class="slider" :src="item.images.small" @click="godetail(item.id)" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 最新上映电影 -->
		<view class="list">
			<view class="title"><text>{{playingList.title}}</text><text style="float: right;" class="icon" @click="toClass(playingList.title)">></text></view>
			<scroll-view scroll-x="true" style="border:1px solid red;white-space: nowrap;">
			  <view class="slider" v-for="(item,index) in playingList.subjects" :key="index" style="background:red;width: 180upx;height:100px;display: inline-block;">
				  <image mode="aspectFill" :src="item.images.small" @click="godetail(item.id)"/>
				  <view class="name">{{item.title}}</view>
			  </view>
			</scroll-view>
		</view>
		<!-- 即将上映电影 -->
		<view class="list">
			<view class="title">{{comingSoon.title}}<text class="icon" @click="toClass(comingSoon.title)">></text></view>
			<scroll-view scroll-x="true" style="border:1px solid red;white-space: nowrap;">
			  <view class="slider" v-for="(item,index) in comingSoon.subjects" :key="index" style="background:red;width: 180upx;height:100px;display: inline-block;">
				  <image mode="aspectFill" :src="item.images.small" @click="godetail(item.id)"/>
				  <view class="name">{{item.title}}</view>
			  </view>
			</scroll-view>
		</view>
		<!-- 电影新片版 -->
		<view class="list">
			<view class="title">{{newMovies.title}}<text class="icon" @click="toClass(newMovies.title)">></text></view>
			<scroll-view scroll-x="true" style="border:1px solid red;white-space: nowrap;">
			  <view class="slider" v-for="(item,index) in newMovies.subjects" :key="index" style="background:red;width: 180upx;height:100px;display: inline-block;">
				  <image mode="aspectFill" :src="item.images.small" @click="godetail(item.id)"/>
				  <view class="name">{{item.title}}</view>
			  </view>
			</scroll-view>
		</view>
		
		
		
	</view>
</template>

<script>
 import	{getComingSoon, newMovies} from '../../apis/index.js'
	export default {
		data() {
			return {
				comingSoon:{},
				newMovies:{}
			}
		},
		methods: {
			//跳转到详情页面
			godetail(id){
				uni.navigateTo({
				    url: '../dtails/dtails?id='+id
				});
			},
			//跳转到分类页面
			toClass(title){
				uni.navigateTo({
					url:'../class/class?title='+title
				})
			}
		},
		computed:{
			playingList(){
				return this.$store.state.playingList
			}
		},
		onReady() {
			this.$store.dispatch('getCity'),
			//即将上映电影接口
			getComingSoon({
				apikey:"0df993c66c0c636e29ecbb5344252a4a",
				start:"0",
				count: "8",
				city: this.$store.state.city
			}).then(res=>{
				let [error,data] =res;
				this.comingSoon=data.data
			}),
			//最新电影接口
			newMovies({
				apikey:"0df993c66c0c636e29ecbb5344252a4a",
				start:"0",
				count: "8",
				city: this.$store.state.city
			}).then(res=>{
				let [error,data]=res;
				console.log(data)
				this.newMovies=data.data
			})
		}
	}
</script>

<style scoped lang="scss">
.container{
	background:#2C405A;
	.bannerList{
		.swiper{
			height:400upx;
			.slider{
					width:100%;
				   }
		}
	}
	.list{
		margin-top:40upx;
		background:#2e4461;
		.title{
			color: #fff;
			margin-left :20upx;
			padding:10upx 0;
			display: flex;
			justify-content: space-between;
			.icon{
				padding: 0 20upx;
			}
		}
		.slider{
			height:300upx;
			margin-left:20upx;
			image{
				width: 100%;
				height:100%;
			}
			.name{
				width: 150upx;
				text-align: center;
				color:#fff;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
}
</style>
