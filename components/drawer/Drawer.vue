<!-- 下方弹出抽屉组件（官方的抽屉组件兼容性不好） -->
<template>
	<view class="drawer-wrap" v-show="open">
		<view class="drawer-modal" @click="tapMask()" @touchmove.prevent></view>
		<view class="popup-box show-box">
			<view class="closeIcon" @click="closeModal()" v-if="withCloseIcon">&times;</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'drawer',
	computed: {
	},
	props: {
		title: String,
		timer:Number,
		tapMaskClose:{
			type: Boolean,
			default: true
		},
		withCloseIcon:{
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			open: false,
			hideBox: false
		};
	},
	methods: {
		openModal() {
			this.open = true;
			this.hideBox = false;
		},
		tapMask(){
			if(this.tapMaskClose){
				this.closeModal()
			}
		},
		closeModal(ok) {
			this.hideBox = true;
			this.open = false;
			if(!ok){
				this.$emit('cancel')
			}
			this.$emit('spadeClick')
		}
	}
};
</script>

<style lang="scss">
.drawer-wrap {
	height: 100%;
	position: fixed;
	z-index: 999;
	.drawer-modal {
		background-color: rgba(0, 0, 0, 0.5);
		height: 100%;
		width: 100%;
		z-index: 999;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
	}
	.popup-box {
		position: fixed;
		z-index: 1000;
		width: 100%;
		// height: 60%;
		left: 0;
		background: #fff;
		left: 0;
		background: #fff;
		padding: 30upx;
		display: flex;
		flex-direction: column;
		border-top-left-radius: 18upx;
		border-top-right-radius: 18upx;
		.closeIcon {
			color: #878787;
			font-size: 60upx;
			width: 60upx;
			height: 50upx;
			line-height: 40upx;
			position: absolute;
			right: 30upx;
			top: 20upx;
			text-align: center;
			z-index:1;
		}
		
	}
	.show-box {
		bottom: 0;
		animation: mymove 0.3s 1;
	}
	
	@keyframes mymove {
		from {
			bottom: -60%;
		}
	
		to {
			bottom: 0;
		}
	}
}
</style>
