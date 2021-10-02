<template>
	<view class="container later-container">
		<view class="common-list">
			<view v-for="(item, index) in collectionList" :key="index" class="item">
				<text>{{ item.name }}</text>
				<button class="cu-btn round base-btn" @click="openColDrawer(index)">处理</button>
			</view>
		</view>
		<drawer ref="colDrawer">
			<view class="common-drawer">
				<view v-for="(item, index) in actionList" :key="index" class="item flex flex-center space-between">
					<text class="name">{{ item }}</text>
					<button class="cu-btn" @click="putInLater(index)">Later</button>
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
		openColDrawer(index) {
			this.curColIndex = index;
			this.$refs.colDrawer.openModal();
		},
		putInActionAll(){
			
		},
		putInLater(index){
			
		}
	}
};
</script>
<style lang="scss">
.later-container {
	height: 100vh;
	background-color: $bg-color-base;
}
</style>
