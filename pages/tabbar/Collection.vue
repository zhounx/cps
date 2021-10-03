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
				<view class="action-list flex flex-center flex-col justify-center">
					<view v-for="(item, actionIndex) in actionList" :key="actionIndex" class="item flex flex-center space-between">
						<text class="name">{{ item.name }}</text>
						<view class="flex flex-center">
							<!-- <button class="cu-btn" @click="putInLater(actionIndex)" style="margin-right: 20rpx;">Later</button> -->
							<button class="cu-btn" @click="handleRemoveAction(actionIndex)"><text class="cuIcon-delete"></text></button>
						</view>
					</view>
				</view>
				
				<view class="item flex flex-center space-between">
					<input placeholder="请输入新行动" name="input" v-model="newActionInput" />
					<button class="cu-btn add" @click="addSingleAction()">
						<text class="cuIcon-add"></text>
						添加
					</button>
				</view>
				<view class="btns flex flex-center space-between">
					<button class="cu-btn ok" @click="handleAddAction">放入行动区</button>
					<button class="cu-btn ok later" @click="handleAddLater">放入以后行动区</button>
				</view>
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
		this.getList('action');
		this.getList('todo');
		this.getList('later');
		
		let flag = uni.getStorageSync('newUser')
		if(!flag){
			uni.showModal({
				title: '欢迎',
				content: '新用户你好，需要跳转至帮助页面了解产品吗？',
				confirmColor: '#409be8',
				success: res => {
					if (res.confirm) {
						uni.switchTab({
							url: './Help'
						})
					}
				}
			});
		}
	},
	onShow() {},
	computed: {
		...mapState(['collectionList', 'actionList', 'laterList']),
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
		addSingleAction() {
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
					name: this.newActionInput
				}
			});
			this.newActionInput = ''
			uni.showToast({
				title: '添加成功！'
			})
		},
		handleDealCol(type){
			let msg = `放入${type==='action'?'':'以后'}行动区`
			let col = this.collectionList[this.curColIndex];
			if (col.actionList.length) {
				uni.showModal({
					title: '提示',
					content: `确定${msg}吗？`,
					confirmColor: '#409be8',
					success: res => {
						if (res.confirm) {
							col.actionList.forEach(item=>{
								this.addItem({
									name: type,
									index: this[`${type}List`].length,
									item
								})
							})
							this.removeItem({
								name: 'collection',
								index: this.curColIndex
							})
							uni.showToast({
								title: '放入成功！'
							})
							this.$refs.colDrawer.closeModal()
						}
					}
				});
			} else {
				uni.showToast({
					title: '请至少添加一个行动',
					icon: 'none'
				});
			}
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
.collection-container {
	height: 100vh;
	padding-top: 30upx;
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
