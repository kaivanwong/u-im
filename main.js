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


// 以下内容需要在 new Vue() 之后引入注册，因为外部JS文件需要引用vue的实例，即this对象

// 基于uview-ui的http配置
import {
	installHttpConfig
} from '@/config/request.js';
Vue.use(installHttpConfig, app);

// http接口API全局
import {
	installApiModules
} from '@/api';
Vue.use(installApiModules, app);

app.$mount()
