const baseURL="http://api.douban.com"
//正在上映电影api
export const getInTheaters=params=>(
	uni.request({
	    url: `${baseURL}/v2/movie/in_theaters`, //仅为示例，并非真实接口地址。
	    data: params,
	    header: {
	        "content-type": "json"//自定义请求头信息
	    }
	})
)
//即将上映电影api 
export const getComingSoon=params=>(
	uni.request({
		url:`${baseURL}/v2/movie/coming_soon`,
		data:params,
		header:{
			"content-type":"json"
		}
	})
)
//电影新片版
export const newMovies=params=>(
	uni.request({
		url:`${baseURL}/v2/movie/new_movies`,
		data:params,
		header:{
			"content-type":"json"
		}
	})
)
//详情页面api
export const _godetail=id=>(
	uni.request({
		url:`${baseURL}/v2/movie/subject/${id}?apikey=0df993c66c0c636e29ecbb5344252a4a`,
		header:{
			"content-type":"json"
		}
	})
)