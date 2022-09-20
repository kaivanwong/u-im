<script>
/**
 * 导入融云IM V2 包装层，https://ext.dcloud.net.cn/plugin?id=9225
 */
import RCIMIWEngine from '@/uni_modules/RongCloud-IMWrapper-V2/js_sdk/RCIMEngine';

var engine = null;
RCIMIWEngine.create('n19jmcy5nbx49', {}).then(res => {
	// console.log('初始化引擎res---', JSON.stringify(res));
	engine = res;
});

export default {
	onLaunch() {},
	onShow() {},
	onHide() {}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
</style>
