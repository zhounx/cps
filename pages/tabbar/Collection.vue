<template>
	<view class="container collection-container">
		<button class="cu-btn add-col" @click="addCol">
			<text class="cuIcon-add"></text>
			添加创意
		</button>
		<view class="common-list">
			<view v-for="(item, index) in collectionList" :key="index" class="item">
				<text class="name">{{ item.name }}</text>
				<view class="flex flex-center">
					<button class="cu-btn base-btn" @click="openColDrawer(index)" style="margin-right: 20rpx;">处理</button>
					<button class="cu-btn" @click="deleteCol(index)"><text class="cuIcon-delete"></text></button>
				</view>
			</view>
		</view>
		<drawer ref="addDrawer">
			<view class="add-view">
				<textarea placeholder="请输入新想法" name="input" v-model="newColionInput" class="w-100"></textarea>
				<button class="cu-btn ok" @click="addSubmit">确认添加创意</button>
			</view>
		</drawer>
		<drawer ref="colDrawer">
			<view class="common-drawer">
				<view v-for="(item, actionIndex) in actionList" :key="actionIndex" class="item flex flex-center space-between">
					<text class="name">{{ item.name }}</text>
					<view class="flex flex-center">
						<button class="cu-btn" @click="putInLater(actionIndex)" style="margin-right: 20rpx;">Later</button>
						<button class="cu-btn" @click="handleRemoveAction(actionIndex)"><text class="cuIcon-delete"></text></button>
					</view>
				</view>
				<view class="item flex flex-center space-between">
					<input placeholder="请输入新行动" name="input" v-model="newActionInput" />
					<button class="cu-btn add" @click="handleAddAction()">
						<text class="cuIcon-add"></text>
						添加
					</button>
				</view>

				<button class="cu-btn ok" @click="dealAll">全部处理</button>
			</view>
		</drawer>
	</view>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	data() {
		return {
			curColIndex: 0,
			newActionInput: '',
			newColionInput: ''
		};
	},
	onLoad(options) {
		this.getList('collection');
	},
	onShow() {},
	computed: {
		...mapState(['collectionList']),
		actionList() {
			return this.collectionList[this.curColIndex] ? this.collectionList[this.curColIndex].actionList : [];
		}
	},
	methods: {
		...mapMutations(['addItem', 'removeItem', 'getList', 'setList', 'addAction', 'removeAction']),
		addCol() {
			this.$refs.addDrawer.openModal();
		},
		openColDrawer(index) {
			this.newActionInput = '';
			this.curColIndex = index;
			this.$refs.colDrawer.openModal();
		},
		putInActionAll() {},
		putInLater(index) {},
		deleteCol(index) {
			uni.showModal({
				title: '提示',
				content: '确定要删除吗？',
				confirmColor: '#409be8',
				success: res => {
					if (res.confirm) {
						this.removeItem({
							name: 'collection',
							index
						});
						uni.showToast({
							title: '删除成功!'
						})
					}
				}
			});
		},
		handleRemoveAction(actionIndex) {
			uni.showModal({
				title: '提示',
				content: '确定要删除吗？',
				confirmColor: '#409be8',
				success: res => {
					if (res.confirm) {
						this.removeAction({
							colIndex: this.curColIndex,
							actionIndex
						})
						uni.showToast({
							title: '删除成功！'
						})
					}
				}
			});
			
		},
		handleAddAction() {
			if(!this.newActionInput){
				uni.showToast({
					title: '请输入新行动',
					icon: 'none'
				})
				return
			}
			this.addAction({
				colIndex: this.curColIndex,
				action: {
					name: this.newActionInput,
					execStartTime: 0,
					execEndTime: 0
				}
			});
			this.newActionInput = ''
			uni.showToast({
				title: '添加成功！'
			})
		},
		dealAll() {
			let index = this.curColIndex;
			let col = this.collectionList[index];
			if (col.actionList.length) {
			} else {
				uni.showToast({
					title: '请至少添加一个行动',
					icon: 'none'
				});
			}
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
.collection-container {
	height: 100vh;
	padding-top: 30upx;
	background-color: $bg-color-base;
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
}
</style>
