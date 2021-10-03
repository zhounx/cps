<template>
	<view class="container later-container">
		
		<view class="common-list">
			<view v-for="(item, index) in laterList" :key="index" class="item">
				<text class="name">{{ item.name }}</text>
				<view class="flex flex-center">
					<button class="cu-btn base-btn" @click="backAction(index)" style="margin-right: 20rpx;">还原</button>
					<button class="cu-btn" @click="deleteCol(index)"><text class="cuIcon-delete"></text></button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	data() {
		return {
			curLaterIndex: 0,
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
		...mapMutations(['addItem', 'removeItem', 'getList', 'setList', 'addAction', 'removeAction']),
		deleteCol(index) {
			uni.showModal({
				title: '提示',
				content: '确定要删除吗？',
				confirmColor: '#409be8',
				success: res => {
					if (res.confirm) {
						this.removeItem({
							name: 'later',
							index
						});
						uni.showToast({
							title: '删除成功!'
						})
					}
				}
			});
		},
		backAction(index){
			let action = this.laterList[index]
			uni.showModal({
				title: '提示',
				content: '确定将行动还原至行动区吗？',
				confirmColor: '#409be8',
				success: res => {
					if (res.confirm) {
						this.addItem({
							name: 'action',
							index: 0,
							item: this.laterList[index]
						})
						
						this.removeItem({
							name: 'later',
							index: index
						})
						uni.showToast({
							title: '还原成功！'
						})
					}
				}
			});
		},
		handleAddAction() {
			this.handleDealCol('action')
		},
		handleAddLater(){
			this.handleDealCol('later')
		},
		addSubmit() {
			let input = this.newColionInput;
			if (!input) {
				uni.showToast({
					title: '请输入内容',
					icon: 'none'
				});
				return;
			}
			this.addItem({
				name: 'collection',
				index: 0,
				item: {
					name: input,
					actionList: []
				}
			});

			uni.showToast({
				title: '添加成功!'
			});
			this.$refs.addDrawer.closeModal();
			this.newColionInput = '';
		}
	}
};
</script>
<style lang="scss">
.later-container {
	height: 100vh;
	background-color: $bg-color-base;
	.common-list{
		height: 90vh;
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
