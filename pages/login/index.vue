<template>
	<view class="page">
		<u-navbar :height="navbarHeight" back-icon-name="" back-text="登录" :background="background" :back-text-style="backTextStyle"></u-navbar>
		<view class="logo-wrap">
			<image class="logo" src="../../static/logo.png"></image>
			<view class="app-name">uIM 即时聊天</view>
		</view>
		<view class="loginSmsCode">
			<u-form :model="form">
				<u-form-item :border-bottom="true"><u-input v-model="form.name" placeholder="请输入昵称" placeholder-style="color:#ccc;fontSize:30rpx" /></u-form-item>
			</u-form>
			<view style="padding-top:64rpx"><u-button :custom-style="buttonStyle" type="primary" shape="circle" @click="login()">临时登录</u-button></view>
		</view>
	</view>
</template>

<script>
import config from '@/config/app';
export default {
	data() {
		return {
			background: { backgroundColor: config.navbarBackgroundColor },
			backTextStyle: { color: config.navbarTextColor, fontSize: config.navbarTextSize },
			navbarHeight: config.navbarHeight,
			buttonStyle: {
				height: '88rpx'
			},
			form: {
				name: null
			}
		};
	},
	onLoad() {},
	methods: {
		login() {
			if (!this.form.name) {
				uni.showToast({
					title: '请输入昵称',
					icon: 'none'
				});
				return;
			}
			uni.setStorageSync('IS_LOGIN', true);
			uni.reLaunch({
				url: '/pages/recent/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	padding: 0 40rpx;
	background-color: #fff;
}

.logo-wrap {
	display: flex;
	justify-content: center;
	padding-top: 200rpx;
	padding-bottom: 160rpx;
	flex-wrap: wrap;
	.logo {
		height: 160rpx;
		width: 160rpx;
	}
	.app-name {
		width: 100%;
		padding-top: 40rpx;
		text-align: center;
		font-size: 38rpx;
		font-weight: 500;
		color: #333;
	}
}

.login {
	text-align: center;
	font-size: 32rpx;
	font-weight: 400;
	color: #3c2dcb;
	line-height: 32rpx;
	margin-top: 48rpx;
}

.loginSmsCode {
	width: 100%;
	padding: 20rpx;
}
</style>
