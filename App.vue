<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	// @import "uview-ui/index.scss";
</style>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		
		onLaunch() {
			// 热更新
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(res => {
					console.log('updateManager res:', res)
					if (res.hasUpdate) {
						updateManager.onUpdateReady(() => {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: res => {
									if (res.confirm) {
										updateManager.applyUpdate();
									}
								}
							});
						});
						updateManager.onUpdateFailed(() => {
							uni.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
							});
						});
					}
				});
			} else {
				uni.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				});
			}
			// console.log('App Launch');
		},
		onShow() {
			
		},
		onHide() {
			
		}
	};
</script>

<style>
	
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
