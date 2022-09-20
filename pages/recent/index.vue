<template>
	<view class="">
		<u-navbar :height="navbarHeight" back-icon-name="" back-text="最新消息" :background="background" :back-text-style="backTextStyle">
			<view class="slot-wrap"><u-icon color="#fff" size="40" name="plus"></u-icon></view>
		</u-navbar>
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id" @click="click" @open="open" :btn-width="btnWidth" :options="options">
			<view class="item u-border-bottom">
				<u-avatar :src="item.avatar ? item.avatar : defaultAvatar" mode="square"></u-avatar>
				<view class="info">
					<view class="name">{{ item.name }}</view>
					<view class="message">{{ item.message }}</view>
				</view>
			</view>
		</u-swipe-action>
	</view>
</template>

<script>
import config from '@/config/app';
import RCIMIWEngine from '@/uni_modules/RongCloud-IMWrapper-V2/js_sdk/RCIMEngine';
import { RONGYUN_KEY } from '@/config/key';

var engine = null;

export default {
	data() {
		return {
			background: { backgroundColor: config.navbarBackgroundColor },
			backTextStyle: { color: config.navbarTextColor, fontSize: config.navbarTextSize },
			navbarHeight: config.navbarHeight,
			defaultAvatar: require('@/static/logo.png'),
			list: [
				{
					id: 1,
					name: '王五',
					message: '你在干啥',
					avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					show: false
				},
				{
					id: 2,
					name: '李四',
					message: '你在干啥',
					avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
					show: false
				},
				{
					id: 3,
					name: '张三',
					avatar: '',
					message: '你在干啥',
					show: false
				}
			],
			disabled: false,
			btnWidth: 140,
			show: false,
			options: [
				{
					text: '置顶',
					style: {
						backgroundColor: '#3C2DCB'
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			]
		};
	},
	onLoad() {
		/**
		 * 创建融云IM实例
		 */
		RCIMIWEngine.create(RONGYUN_KEY, {}).then(async res => {
			console.log('【融云IM】实例创建结果：' + JSON.stringify(res));
			engine = res;

			/**
			 * 创建融云连接监听
			 */
			engine.setOnConnectedListener(res => {
				console.log('【融云IM】连接结果：' + JSON.stringify(res));
			});

			/**
			 * 创建融云接收消息监听
			 */
			engine.setOnMessageReceivedListener(res => {
				console.log('【融云IM】收到消息：' + JSON.stringify(res));
			});

			/**
			 * 连接融云
			 */
			let code = await engine.connect(
				'uER4UIWKomr99CHcoNhWOw5YR8QIDH0+@5qxv.cn.rongnav.com;5qxv.cn.rongcfg.com',
				10
			);

			this.sendMessage();
		});
	},
	methods: {
		/**
		 * 发送消息
		 */
		async sendMessage() {
			let conversationType = RCIMIWConversationType.PRIVATE;
			let targetId = '1';
			let channelId = '1';
			let text = '一条文本消息';
			let message = await engine.createTextMessage(conversationType, targetId, channelId, text);
			let code = await engine.sendMessage(message);
		},
		click(index, index1) {
			if (index1 == 1) {
				this.list.splice(index, 1);
				this.$u.toast(`删除了第${index}个cell`);
			} else {
				this.list[index].show = false;
				this.$u.toast(`收藏成功`);
			}
		},
		// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
		open(index) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.list[index].show = true;
			this.list.map((val, idx) => {
				if (index != idx) this.list[idx].show = false;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.slot-wrap {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	padding-right: 24rpx;
	/* 如果您想让slot内容占满整个导航栏的宽度 */
	/* flex: 1; */
	/* 如果您想让slot内容与导航栏左右有空隙 */
	/* padding: 0 30rpx; */
}

.item {
	display: flex;
	padding: 24rpx;
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	.info {
		display: flex;
		align-content: space-between;
		flex-wrap: wrap;
		padding-left: 24rpx;
	}

	.name {
		width: 100%;
		text-align: left;
		font-size: 32rpx;
		color: $u-main-color;
	}
	.message {
		width: 100%;
		text-align: left;
		font-size: 26rpx;
		color: $u-content-color;
	}
}
</style>
