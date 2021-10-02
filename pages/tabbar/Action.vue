<template>
	<view class="container action-container">
		<view class="common-list">
			<view v-for="(item, index) in collectionList" :key="index" class="item">
				<text class="name">{{ item.name }}</text>
				<view class="flex flex-center">
					<button class="cu-btn base-btn" @click="openColDrawer(index)" style="margin-right: 20rpx;">处理</button>
					<button class="cu-btn" @click="deleteCol(index)"><text class="cuIcon-delete"></text></button>
				</view>
			</view>
		</view>
		<drawer ref="colDrawer">
			<view class="common-drawer">
				<view v-for="(item, index) in actionList" :key="index" class="item flex flex-center space-between">
					<text class="name">{{ item }}</text>
					<view class="flex flex-center">
						<button class="cu-btn" @click="putInLater(index)" style="margin-right: 20rpx;">Later</button>
						<button class="cu-btn" @click="deleteSubCol(index)"><text class="cuIcon-delete"></text></button>
					</view>
					
				</view>
				<view class="item flex flex-center space-between">
					<input placeholder="请输入新行动" name="input" v-model="newActionInput"></input>
					<button class="cu-btn add" @click="putInLater(index)"><text class="cuIcon-add"></text>添加</button>
					
				</view>
				
				<button class="cu-btn ok">全部处理</button>
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
			newActionInput: ''
		};
	},
	onLoad(options) {},
	onShow() {},
	computed: {
		...mapState(['collectionList']),
		actionList() {
			return this.collectionList[this.curColIndex] ? this.collectionList[this.curColIndex].actionList : [];
		}
	},
	methods: {
		addCol(){
			
		},
		openColDrawer(index) {
			this.curColIndex = index;
			this.$refs.colDrawer.openModal();
		},
		putInActionAll(){
			
		},
		putInLater(index){
			
		},
		deleteCol(index){
			
		},
		deleteSubCol(index){
			
		}
	}
};
</script>
<style lang="scss">
.action-container {
	height: 100vh;
	background-color: $bg-color-base;
	.add-col{
		width: 690upx;
		height: 80upx;
		background-color: $base-color;
		color: #fff;
	}
}
</style>
