<template>
	<view class="container action-container">
		<view class="common-list">
			<view v-for="(item, index) in actionList" :key="index" class="item">
				<text class="name">{{ item.name }}</text>
				<view class="flex flex-center">
					<picker mode="time" :value="time"  @change="changeTime">
						<button class="cu-btn base-btn" @click="todo(index)" style="margin-right: 20rpx;">安排</button>
					</picker>
					
					<button class="cu-btn" @click="deleteAction(index)"><text class="cuIcon-delete"></text></button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import util from '@/common/util.js'
export default {
	data() {
		return {
			curActionIndex: 0,
			time: util.dateFormat(new Date(), 'HH:mm'),
			curStartTime: 0,
			curEndTime: 0
		};
	},
	onLoad(options) {
		// this.getList('collection');
		// this.getList('action');
		// this.getList('todo');
		// this.getList('later');
	},
	onShow() {},
	computed: {
		...mapState(['collectionList', 'actionList', 'laterList']),
	},
	methods: {
		...mapMutations(['addItem', 'removeItem', 'getList', 'setList', 'setActionTime']),
		changeTime(e){
			let time = e.detail.value
			this.setActionTime({
				actionIndex: this.curActionIndex,
				time
			})
		},
		todo(index){
			this.curActionIndex = index
		},
		deleteAction(index) {
			uni.showModal({
				title: '提示',
				content: '确定要删除吗？',
				confirmColor: '#409be8',
				success: res => {
					if (res.confirm) {
						this.removeItem({
							name: 'action',
							index
						});
						uni.showToast({
							title: '删除成功!'
						})
					}
					
					
				}
			});
		},
	}
};
</script>
<style lang="scss">
.action-container {
	height: 100vh;
	background-color: $bg-color-base;
	.common-list{
		height: 100vh;
		overflow: auto;
	}
	.add-col {
		width: 690upx;
		height: 80upx;
		background-color: $base-color;
		color: #fff;
	}
	.add-view {
		height: 415;
		textarea {
			height: 300upx;
		}
		.ok {
			width: 100%;
			height: 80upx;
			margin-top: 30upx;
			font-size: 30upx;
			color: #fff;
			border-radius: 15upx;
			background-color: $base-color;
		}
	}
	.common-drawer{
		
		.action-list{
			width: 100%;
			max-height: 55vh;
			overflow: auto;
		}
		.btns{
			width: 95%;
			.ok{
				width: 45%;
				height: 80upx;
				font-size: 30upx;
				color: #FFF;
				border-radius: 15upx;
				background-color: $base-color;
			}
			.later{
				background-color: #F0F0F0;
				color: #000;
			}
		}
		
	}
}
</style>
