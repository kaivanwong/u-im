<template>
	<view class=""><u-navbar :height="navbarHeight" back-icon-name="" back-text="最新消息" :background="background" :back-text-style="backTextStyle"></u-navbar></view>
</template>

<script>
import config from '@/config/app';
export default {
	data() {
		return {
			background: { backgroundColor: config.navbarBackgroundColor },
			backTextStyle: { color: config.navbarTextColor, fontSize: config.navbarTextSize },
			navbarHeight: config.navbarHeight
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style></style>
