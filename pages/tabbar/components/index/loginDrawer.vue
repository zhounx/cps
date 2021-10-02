<!-- 下方弹出抽屉组件（官方的抽屉组件兼容性不好） -->
<template>
	<drawer ref="drawer">
		<view class="wrapper flex flex-center flex-col">
			<image src="/static/logo.png" class="logo"></image>
			<text class="text">欢迎登录，逸书云笔记</text>
			<view class="large-btn" @click="wechatLogin">登录</view>
			<!-- <view class="large-btn phone">手机验证码登录</view> -->
		</view>
	</drawer>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
	name: 'loginDrawer',
	computed: {
		...mapState('user', ['userInfo', '$sourcePath']),
	},
	data() {
		return {
			
		};
	},
	methods: {
		...mapActions('user',['login']),
		...mapActions('live',['initWebSocket']),
		...mapMutations('user',{
			setUserProfileData: 'SET_USER_PROFILE_DATA'
		}),
		openModal() {
			this.$refs.drawer.openModal();
		},

		closeModal() {
			this.$refs.drawer.closeModal();
		},
		wechatLogin(){
			wx.getUserProfile({
				desc: '获取你的昵称和头像',
				success: res => {
					console.log('授权成功', res)
					this.setUserProfileData(res)
					this.$emit('wechatLogin')
				},
				fail: err => {
					console.log(err)
				}
			});
			// this.$emit('wechatLogin')
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	padding-top: 50upx;
	.logo{
		width: 130upx;
		height: 130upx;
		margin-bottom: 30upx;
	}
	.text{
		margin-bottom: 110upx;
		font-size: 36upx;
	}
	.large-btn{
		@include red-btn(690upx, 84upx, 30upx)
	}
}
</style>
