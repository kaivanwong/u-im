// 基础模块api
import {
	useBaseModles
} from './modules/base.js'

// 融云模块
import {
	useRongyunModles
} from './modules/rongyun.js'



// 导出api全局安装方法
export const installApiModules = (Vue, vm) => {
	vm.$u.api = Object.assign(useBaseModles(Vue, vm), useRongyunModles(Vue, vm))
}
