import Vue from 'vue'
import Vuex from 'vuex'
import QQMapWX  from '../static/js/qqmap-wx-jssdk.min.js'
import {getInTheaters} from '../apis/index.js'

Vue.use(Vuex)

 export default new Vuex.Store({
	 state:{
		 city:'深圳市',
		 playingList:{}
	 },
	 mutations:{},
	 actions:{
		 getCity(context){
			 //加载提示
			 uni.showLoading({
			     title: '加载中'
			 });
			 //检测用户是否授权
			 uni.authorize({
				 scope: 'scope.userLocation',
				 success(){
					 //引入腾讯地图api
					 let qqmapsdk=new QQMapWX({
                         key: 'LB5BZ-YYRCX-WDQ4W-7ONZ7-DTIL6-IKBAB'
                    });
					uni.getLocation({
					    type: 'gcj02 ',
					    success: function (res) {
					        // console.log('当前位置的经度：' + res.longitude);
					        // console.log('当前位置的纬度：' + res.latitude);
							//逆地址解析
							qqmapsdk.reverseGeocoder({
								location: {
								          latitude: res.latitude,
								          longitude: res.longitude,
								        },
								success(res){
									context.state.city=res.result.address_component.city
									//发送请求获取正在上映的电影数据
									getInTheaters({
										apikey:"0df993c66c0c636e29ecbb5344252a4a",
										start:"0",
										count: "8",
										city:context.state.city
									}).then(res=>{
										let [error,data]=res
										context.state.playingList=data.data
										uni.hideLoading()
									})
								}
							})
					    },
						fail(res){
							uni.showToast({
								icon:'none',
							    title: '需要获取你的位置，否则部分功能不是使用',
							    duration: 2000
							});
						}
					});
				 }
			 })
		 }
	 }
 })