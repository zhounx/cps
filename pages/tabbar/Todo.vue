<template>
	<view class="container todo-container">
		<view class="common-list">
			<view v-for="(item, index) in todoList" :key="index" class="item">
				<view>
					<view class="name">{{ item.name }}</view>
					<view class="time">开始时间：{{item.time}}</view>
				</view>
				
				<view class="flex flex-center">
					<button class="cu-btn base-btn" @click="done(index)">完成</button>
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
		...mapState(['todoList']),
	},
	methods: {
		...mapMutations(['addItem', 'removeItem', 'getList', 'setList', 'setActionTime']),
		done(index){
			uni.showModal({
				title: '提示',
				content: '确定完成任务吗？',
				confirmColor: '#409be8',
				success: res => {
					if (res.confirm) {
						this.removeItem({
							name: 'todo',
							index
						});
						uni.showToast({
							title: '任务完成!'
						})
					}
					
					
				}
			});
		},
		
	}
};
</script>
<style lang="scss">
.todo-container {
	height: 100vh;
	background-color: $bg-color-base;
	.common-list{
		.time{
			margin-top: 10upx;
			color: #999;
		}
	}
}
</style>
