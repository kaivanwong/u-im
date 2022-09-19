import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// 引入全局uview-ui
import uView from 'uview-ui';
Vue.use(uView);

// 引入vuex
import store from './store/index.js'
Vue.prototype.$store = store

// 挂载 app 实例
const app = new Vue({
	...store,
	...App
})
app.$mount()
