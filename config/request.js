// 融云请求域名
export const RONGYUN_URL = 'http://api-cn.ronghub.com'

// api 前缀
export const RONGYUN_URL_PREFIX = '/'

// 基于 uview-ui 的 http 配置
export const UVIEWUI_HTTP_CONFIG = {
	// 地址
	baseUrl: RONGYUN_URL + RONGYUN_URL_PREFIX,
	// 请求方式
	method: 'GET',
	// 参数类型
	dataType: 'json',
	// 是否显示请求中的loading
	showLoading: true,
	// 请求loading中的文字提示
	loadingText: '请求中...',
	// 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
	loadingTime: 800,
	// 是否在拦截器中返回服务端的原始数据
	originalData: false,
	// 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	loadingMask: true,
	// 配置请求头信息
	header: {
		'content-type': 'application/json;charset=UTF-8',
	},
}

// 此处配置请求拦截器
export const httpRequest = (config) => {
	return config;
}

// 此处配置响应拦截器
export const httpResponse = (res) => {
	if (res.status == 0 || 200) {
		return res
	}
}

// http安装方法
export const installHttpConfig = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig(UVIEWUI_HTTP_CONFIG);
	Vue.prototype.$u.http.interceptor.request = httpRequest
	Vue.prototype.$u.http.interceptor.response = httpResponse
}
